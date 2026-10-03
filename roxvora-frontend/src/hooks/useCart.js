import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, selectCartItemCount, selectCartCoupon } from '@store/slices/cartSlice';
import { addToCart, updateQuantity, removeFromCart, clearCart, setCoupon, removeCoupon } from '@store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  const coupon = useSelector(selectCartCoupon);

  const addItem = (item) => dispatch(addToCart(item));
  const updateItemQuantity = (itemId, variantId, quantity) => dispatch(updateQuantity({ itemId, variantId, quantity }));
  const removeItem = (itemId, variantId) => dispatch(removeFromCart({ itemId, variantId }));
  const clear = () => dispatch(clearCart());
  const applyCoupon = (code) => dispatch(setCoupon(code));
  const removeAppliedCoupon = () => dispatch(removeCoupon());

  return {
    items,
    total,
    itemCount,
    coupon,
    addItem,
    updateItemQuantity,
    removeItem,
    clear,
    applyCoupon,
    removeAppliedCoupon,
  };
};