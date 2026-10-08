import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';
import { formatCurrency } from '../../../utils/formatCurrency';

/**
 * ProductTable — data table for the admin products list.
 *
 * Props:
 *   products  {Array}    — array of product objects
 *   onEdit    {function} — called with product when Edit is clicked
 *   onDelete  {function} — called with product.id when Delete is clicked
 *   onView    {function} — called with product when View is clicked
 */
const ProductTable = ({ products = [], onEdit, onDelete, onView }) => {
    if (products.length === 0) {
        return (
            <div className="p-12 text-center text-secondary">
                <p>No products found.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Products">
                <thead>
                    <tr className="text-left text-secondary border-b">
                        <th className="px-4 py-3 font-medium">Product</th>
                        <th className="px-4 py-3 font-medium">SKU</th>
                        <th className="px-4 py-3 font-medium">Category</th>
                        <th className="px-4 py-3 font-medium">Price</th>
                        <th className="px-4 py-3 font-medium">Stock</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="px-4 py-3">
                                <span className="font-medium text-primary">{product.name}</span>
                            </td>
                            <td className="px-4 py-3 text-secondary font-mono text-xs">{product.sku}</td>
                            <td className="px-4 py-3 text-secondary">{product.category}</td>
                            <td className="px-4 py-3 font-medium text-primary">
                                {formatCurrency(product.price)}
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`font-medium ${product.stock === 0
                                            ? 'text-red-600'
                                            : product.stock <= 5
                                                ? 'text-yellow-600'
                                                : 'text-green-600'
                                        }`}
                                >
                                    {product.stock}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`badge badge-sm ${product.isActive ? 'badge-success' : 'badge-default'
                                        }`}
                                >
                                    {product.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-end gap-1">
                                    {onView && (
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-icon-sm"
                                            onClick={() => onView(product)}
                                            aria-label={`View ${product.name}`}
                                        >
                                            <FiEye className="w-4 h-4" aria-hidden="true" />
                                        </button>
                                    )}
                                    {onEdit && (
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-icon-sm"
                                            onClick={() => onEdit(product)}
                                            aria-label={`Edit ${product.name}`}
                                        >
                                            <FiEdit2 className="w-4 h-4" aria-hidden="true" />
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-icon-sm text-error hover:text-error"
                                            onClick={() => onDelete(product.id)}
                                            aria-label={`Delete ${product.name}`}
                                        >
                                            <FiTrash2 className="w-4 h-4" aria-hidden="true" />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
