import { useState } from 'react';

const DEFAULT_CATEGORIES = [
    { id: 'women', name: 'Women' },
    { id: 'men', name: 'Men' },
    { id: 'kids', name: 'Kids' },
    { id: 'accessories', name: 'Accessories' },
];

/**
 * ProductForm — create / edit product form for admin.
 *
 * Props:
 *   onSubmit      {function} — called with form data
 *   defaultValues {object}   — pre-populate fields for editing
 *   categories    {Array}    — category options
 *   brands        {Array}    — brand options
 */
const ProductForm = ({
    onSubmit,
    defaultValues = {},
    categories = DEFAULT_CATEGORIES,
    brands = [],
}) => {
    const [values, setValues] = useState({
        name: defaultValues.name ?? '',
        slug: defaultValues.slug ?? '',
        description: defaultValues.description ?? '',
        shortDescription: defaultValues.shortDescription ?? '',
        price: defaultValues.price ?? '',
        originalPrice: defaultValues.originalPrice ?? '',
        category: defaultValues.category ?? '',
        brand: defaultValues.brand ?? '',
        sku: defaultValues.sku ?? '',
        stock: defaultValues.stock ?? '',
        weight: defaultValues.weight ?? '',
        taxClass: defaultValues.taxClass ?? 'standard',
        isActive: defaultValues.isActive ?? true,
        isFeatured: defaultValues.isFeatured ?? false,
        isNew: defaultValues.isNew ?? false,
        isSale: defaultValues.isSale ?? false,
        tags: defaultValues.tags ?? '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(values);
    };

    const field = (id, label, type = 'text', extra = {}) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-primary mb-1.5">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                value={values[id]}
                onChange={handleChange}
                className="input-field w-full"
                {...extra}
            />
        </div>
    );

    return (
        <form id="product-form" onSubmit={handleSubmit} noValidate className="card p-6 space-y-5">
            <h2 className="font-semibold text-primary text-lg">Product Details</h2>

            {field('name', 'Product Name', 'text', { required: true, placeholder: 'e.g. Classic White T-Shirt' })}

            {field('slug', 'Slug', 'text', { placeholder: 'auto-generated from name' })}

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-primary mb-1.5">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    rows={4}
                    className="input-field w-full resize-y"
                    placeholder="Full product description"
                />
            </div>

            <div>
                <label htmlFor="shortDescription" className="block text-sm font-medium text-primary mb-1.5">
                    Short Description
                </label>
                <textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={values.shortDescription}
                    onChange={handleChange}
                    rows={2}
                    className="input-field w-full resize-y"
                    placeholder="Brief summary (shown in search results)"
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {field('price', 'Price (₹)', 'number', { min: 0, step: 1, required: true })}
                {field('originalPrice', 'Original Price (₹)', 'number', { min: 0, step: 1 })}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-primary mb-1.5">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        className="input-field w-full"
                    >
                        <option value="">Select category</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {brands.length > 0 && (
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-primary mb-1.5">
                            Brand
                        </label>
                        <select
                            id="brand"
                            name="brand"
                            value={values.brand}
                            onChange={handleChange}
                            className="input-field w-full"
                        >
                            <option value="">Select brand</option>
                            {brands.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
                {field('sku', 'SKU', 'text', { placeholder: 'TSH-001' })}
                {field('stock', 'Stock', 'number', { min: 0, step: 1 })}
                {field('weight', 'Weight (kg)', 'number', { min: 0, step: 0.01 })}
            </div>

            {field('tags', 'Tags', 'text', { placeholder: 'comma-separated: cotton, basic, sale' })}

            <div className="flex flex-wrap gap-5 pt-2">
                {[
                    { name: 'isActive', label: 'Active' },
                    { name: 'isFeatured', label: 'Featured' },
                    { name: 'isNew', label: 'New Arrival' },
                    { name: 'isSale', label: 'On Sale' },
                ].map(({ name, label }) => (
                    <label key={name} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name={name}
                            checked={values[name]}
                            onChange={handleChange}
                            className="w-4 h-4 rounded text-secondary focus:ring-secondary"
                        />
                        <span className="text-sm text-primary">{label}</span>
                    </label>
                ))}
            </div>

            <div className="pt-4 flex gap-3">
                <button type="submit" className="btn btn-primary btn-md">
                    Save Product
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
