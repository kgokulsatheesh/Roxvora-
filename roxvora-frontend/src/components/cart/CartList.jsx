import CartItem from './CartItem';

const CartList = ({ items = [] }) => (
    <ul role="list" aria-label="Cart items">
        {items.map((item) => (
            <CartItem key={`${item.id}-${item.variantId}`} item={item} />
        ))}
    </ul>
);

export default CartList;
