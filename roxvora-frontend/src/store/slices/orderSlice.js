import { createSlice, nanoid } from '@reduxjs/toolkit';

// Orders the user places in this session. The seeded account orders in
// accountOrdersData.js remain the history shown alongside these until the
// orders API exists.
const initialState = {
  orders: [],
  lastPlacedOrderId: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: {
      reducer: (state, action) => {
        state.orders.unshift(action.payload);
        state.lastPlacedOrderId = action.payload.id;
      },
      prepare: ({
        items = [],
        subtotal = 0,
        discount = 0,
        shipping = 0,
        total = 0,
        shippingMethod = 'Standard Shipping',
        paymentMethod = 'UPI',
        customer = {},
        shippingAddress = {},
      }) => {
        const now = new Date().toISOString();
        const orderNumber = `RV-${String(Date.now()).slice(-6)}`;

        return {
          payload: {
            id: `ord_${nanoid(8)}`,
            orderNumber,
            createdAt: now,
            status: 'confirmed',
            itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal,
            discount,
            shipping,
            total,
            shippingMethod,
            paymentMethod,
            customer,
            shippingAddress,
            items: items.map((item) => ({
              id: item.variantId ? `${item.id}-${item.variantId}` : item.id,
              productId: item.id,
              name: item.name,
              slug: item.slug,
              variantId: item.variantId ?? null,
              size: item.size ?? null,
              color: item.color ?? null,
              quantity: item.quantity,
              price: item.price,
              image: item.image || item.images?.[0] || '',
            })),
            timeline: [
              { status: 'pending', date: now, description: 'We received your order.' },
              { status: 'confirmed', date: now, description: 'Payment confirmed.' },
            ],
            canCancel: true,
          },
        };
      },
    },
    cancelOrder: (state, action) => {
      const order = state.orders.find((o) => o.id === action.payload);
      if (order && order.canCancel) {
        order.status = 'cancelled';
        order.canCancel = false;
        order.timeline.push({
          status: 'cancelled',
          date: new Date().toISOString(),
          description: 'Order cancelled by you.',
        });
      }
    },
  },
});

export const { placeOrder, cancelOrder } = orderSlice.actions;

const EMPTY_ORDERS = [];

export const selectOrders = (state) => state.order?.orders || EMPTY_ORDERS;
export const selectOrderById = (orderId) => (state) =>
  state.order?.orders.find((o) => o.id === orderId) || null;
export const selectOrderCount = (state) => state.order?.orders.length || 0;
export const selectLastPlacedOrderId = (state) => state.order?.lastPlacedOrderId || null;

export default orderSlice.reducer;
