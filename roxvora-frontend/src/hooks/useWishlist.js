import { useDispatch, useSelector } from 'react-redux';
import {
    selectWishlistItems,
    selectWishlistCount,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    moveToCart,
} from '../store/slices/wishlistSlice';

export const useWishlist = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectWishlistItems);
    const count = useSelector(selectWishlistCount);

    const addItem = (product) => dispatch(addToWishlist(product));
    const removeItem = (productId) => dispatch(removeFromWishlist(productId));
    const clear = () => dispatch(clearWishlist());
    const transferToCart = (productId) => dispatch(moveToCart(productId));
    const isWishlisted = (productId) => items.some((item) => item.id === productId);

    return {
        items,
        count,
        addItem,
        removeItem,
        clear,
        transferToCart,
        isWishlisted,
    };
};
