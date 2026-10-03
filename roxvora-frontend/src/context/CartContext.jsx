import React, { createContext, useContext, useReducer, useEffect } from "react";

/* =========================================================
   ROXVORA CART CONTEXT
   ─────────────────────────────────────────────────────────
   Global cart state for the entire application.
   Persists to localStorage so cart survives page refresh.

   Exported:
     CartProvider  — wrap around <App /> in main.jsx
     useCart       — hook to consume cart state + actions
========================================================= */

/* ── Storage key ─────────────────────────────────────── */
const STORAGE_KEY = "roxvora_cart";

/* ── Initial state ───────────────────────────────────── */
function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore parse errors */
  }
  return { items: [] };
}

/* ── Reducer ─────────────────────────────────────────── */
function cartReducer(state, action) {
  switch (action.type) {
    /* ─── ADD ───────────────────────────────────────────
       If the exact same product+size+color combination
       already exists in the cart, increment its quantity.
       Otherwise push a new line item.
    ─────────────────────────────────────────────────── */
    case "ADD_ITEM": {
      const { product, size, color, quantity = 1 } = action.payload;

      const existingIdx = state.items.findIndex(
        (i) =>
          i.id === product.id &&
          i.selectedSize === size &&
          i.selectedColor === color
      );

      if (existingIdx !== -1) {
        const updated = state.items.map((item, idx) =>
          idx === existingIdx
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { ...state, items: updated };
      }

      const newItem = {
        /* product fields */
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] ?? product.image,
        /* selection */
        selectedSize: size,
        selectedColor: color,
        quantity,
        /* unique line key so React keys stay stable */
        lineKey: `${product.id}-${size}-${color}-${Date.now()}`,
      };

      return { ...state, items: [...state.items, newItem] };
    }

    /* ─── UPDATE QUANTITY ───────────────────────────────
       If new quantity <= 0 the item is removed.
    ─────────────────────────────────────────────────── */
    case "UPDATE_QUANTITY": {
      const { lineKey, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.lineKey !== lineKey),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.lineKey === lineKey ? { ...item, quantity } : item
        ),
      };
    }

    /* ─── REMOVE ─────────────────────────────────────── */
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((i) => i.lineKey !== action.payload.lineKey),
      };
    }

    /* ─── CLEAR ──────────────────────────────────────── */
    case "CLEAR_CART": {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

/* ── Context ─────────────────────────────────────────── */
const CartContext = createContext(null);

/* ── Provider ────────────────────────────────────────── */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  /* Persist to localStorage whenever items change */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* quota exceeded — silently ignore */
    }
  }, [state]);

  /* ── Derived values ─────────────────────────────────── */
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  /* ── Action creators ─────────────────────────────────── */
  const addItem = (product, size, color, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, size, color, quantity } });
  };

  const updateQuantity = (lineKey, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { lineKey, quantity } });
  };

  const removeItem = (lineKey) => {
    dispatch({ type: "REMOVE_ITEM", payload: { lineKey } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value = {
    items: state.items,
    totalItems,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ── Hook ────────────────────────────────────────────── */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

export default CartContext;
