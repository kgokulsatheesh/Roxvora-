import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@store/slices/cartSlice';
import { removeFromCart, updateQuantity } from '@store/slices/cartSlice';
import { formatCurrency } from '@utils/formatCurrency';

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 99;

const CartIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleQuantityChange = (itemId, variantId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart({ itemId, variantId }));
    } else {
      dispatch(updateQuantity({ itemId, variantId, quantity: newQuantity }));
    }
  };

  const handleRemove = (itemId, variantId) => {
    dispatch(removeFromCart({ itemId, variantId }));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="relative btn btn-ghost btn-icon-lg p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Shopping cart${itemCount > 0 ? ` with ${itemCount} items` : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="cart-dropdown"
      >
        <FiShoppingBag className="w-6 h-6 text-primary" aria-hidden="true" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-secondary rounded-full">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          id="cart-dropdown"
          className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-50 animate-slide-down"
          role="menu"
          aria-label="Shopping cart"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="font-semibold text-primary">Shopping Cart</h3>
            <span className="text-sm text-secondary">{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
          </div>

          {items.length === 0 ? (
            <div className="p-8 text-center">
              <FiShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-3" aria-hidden="true" />
              <p className="text-secondary">Your cart is empty</p>
              <Link to="/shop" className="btn btn-primary btn-sm mt-4" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <ul className="divide-y divide-neutral-100" role="list">
                {items.map((item) => (
                  <li key={`${item.id}-${item.variantId}`} className="p-4" role="menuitem">
                    <div className="flex gap-3">
                      <Link to={`/product/${item.slug}`} className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden" aria-hidden="true">
                        <img
                          src={item.image || '/images/placeholders/product.jpg'}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.slug}`} className="font-medium text-primary truncate block" onClick={() => setIsOpen(false)}>
                          {item.name}
                        </Link>
                        <p className="text-sm text-secondary mt-1">${item.price.toFixed(2)}</p>
                        {item.variant && (
                          <p className="text-xs text-neutral-500 mt-1">{item.variant}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            className="btn btn-ghost btn-icon-sm btn-icon"
                            onClick={() => handleQuantityChange(item.id, item.variantId, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            className="btn btn-ghost btn-icon-sm btn-icon"
                            onClick={() => handleQuantityChange(item.id, item.variantId, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-icon-sm btn-icon ml-auto text-error hover:text-error"
                            onClick={() => handleRemove(item.id, item.variantId)}
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-4 border-t space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Subtotal</span>
              <span className="font-medium text-primary">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Shipping</span>
              <span className="font-medium text-primary">
                {total >= FREE_SHIPPING_THRESHOLD ? 'Free' : formatCurrency(SHIPPING_FEE)}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold text-primary border-t pt-3">
              <span>Total</span>
              <span>{formatCurrency(total >= FREE_SHIPPING_THRESHOLD ? total : total + SHIPPING_FEE)}</span>
            </div>
            <div className="flex gap-2">
              <Link
                to="/cart"
                className="btn btn-secondary btn-flex-1 btn-md"
                onClick={() => setIsOpen(false)}
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                className="btn btn-primary btn-flex-1 btn-md"
                onClick={() => setIsOpen(false)}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIcon;