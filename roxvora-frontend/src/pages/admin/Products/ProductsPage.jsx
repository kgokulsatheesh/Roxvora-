import { useState } from 'react';
import ProductTable from '@components/admin/products/ProductTable';
import Button from '@components/common/Button/Button';
import { FiPlus, FiFilter } from 'react-icons/fi';

import Input from '@components/common/Input/Input';

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const mockProducts = [
    { id: '1', name: 'Classic White T-Shirt', sku: 'TSH-001', category: 'T-Shirts', price: 29.99, stock: 150, isActive: true },
    { id: '2', name: 'Slim Fit Jeans', sku: 'JNS-002', category: 'Jeans', price: 79.99, stock: 45, isActive: true },
    { id: '3', name: 'Leather Jacket', sku: 'JKT-003', category: 'Jackets', price: 299.99, stock: 12, isActive: true },
    { id: '4', name: 'Running Shoes', sku: 'SHO-004', category: 'Shoes', price: 129.99, stock: 8, isActive: true },
    { id: '5', name: 'Wool Sweater', sku: 'SWT-005', category: 'Sweaters', price: 89.99, stock: 3, isActive: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-secondary font-bold text-primary">Products</h1>
        <div className="flex gap-3">
          <button type="button" className="btn btn-ghost btn-icon-sm">
            <FiFilter className="w-5 h-5" />
          </button>
          <Button variant="primary">
            <FiPlus className="w-5 h-5" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 max-w-md"
            size="sm"
          />
        </div>
        <ProductTable
          products={mockProducts}
          onEdit={(product) => console.log('Edit:', product)}
          onDelete={(id) => console.log('Delete:', id)}
          onView={(product) => console.log('View:', product)}
        />
      </div>
    </div>
  );
};

export default ProductsPage;