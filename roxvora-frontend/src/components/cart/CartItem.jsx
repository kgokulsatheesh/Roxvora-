import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleQtyChange = (delta) => {
        const newQty = item.quantity + delta;
        if (newQty < 1) {
            dispatch(removeFromCart({ itemId: item.id, variantId: item.variantId }));
        } else {
            dispatch(updateQuantity({ itemId: item.id, variantId: item.variantId, quantity: newQty }));
        }
    };

    const handleRemove = () => {
        dispatch(removeFromCart({ itemId: item.id, variantId: item.variantId }));
    };

    return (
        <li className="flex gap-4 py-5 px-6 border-b border-neutral-100 last:border-0">
            <Link to={`/product/${item.slug}`} className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100" aria-hidden="true">
                <img src={item.image || item.images?.[0] || '/images/placeholders/product.jpg'} alt="" className="w-full h-full object-cover" loading="lazy" />
            </Link>

            <div className="flex-1 min-w-0">
                <Link to={`/product/${item.slug}`} className="font-medium text-primary hover:text-secondary transition-colors block truncate">
                    {item.name}
                </Link>
                {(item.size || item.color) && (
                    <p className="text-sm text-secondary mt-0.5">
                        {[item.size, item.color].filter(Boolean).join(' · ')}
                    </p>
                )}
                <p className="text-sm font-semibold text-primary mt-1">{formatCurrency(item.price)}</p>

                <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                        <button type="button" className="p-2 hover:bg-neutral-50 transition-colors" onClick={() => handleQtyChange(-1)} aria-label="Decrease quantity">
                            <FiMinus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button type="button" className="p-2 hover:bg-neutral-50 transition-colors" onClick={() => handleQtyChange(1)} aria-label="Increase quantity">
                            <FiPlus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                    </div>

                    <button type="button" className="btn btn-ghost btn-icon-sm text-error hover:text-error ml-auto" onClick={handleRemove} aria-label={`Remove ${item.name} from cart`}>
                        <FiTrash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                </div>
            </div>

            <div className="flex-shrink-0 text-right">
                <p className="font-semibold text-primary">{formatCurrency(item.price * item.quantity)}</p>
            </div>
        </li>
    );
};

export default CartItem;
