import { useDispatch, useSelector } from 'react-redux';
import {
    selectOrders,
    selectOrderById,
    selectOrderCount,
    selectLastPlacedOrderId,
    placeOrder,
    cancelOrder,
} from '../store/slices/orderSlice';

export const useOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const orderCount = useSelector(selectOrderCount);
    const lastPlacedOrderId = useSelector(selectLastPlacedOrderId);

    const place = (orderData) => dispatch(placeOrder(orderData));
    const cancel = (orderId) => dispatch(cancelOrder(orderId));

    return {
        orders,
        orderCount,
        lastPlacedOrderId,
        place,
        cancel,
        selectOrderById,
    };
};
