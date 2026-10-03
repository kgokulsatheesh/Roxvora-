import { useState } from 'react';
import ProductForm from '@components/admin/products/ProductForm';
import ProductImageUpload from '@components/admin/products/ProductImageUpload';
import Button from '@components/common/Button/Button';

const AddProductPage = () => {
  const [images, setImages] = useState([]);

  const handleSubmit = async (data) => {
    console.log('Submit product:', { ...data, images });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-secondary font-bold text-primary">Add Product</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-w-0">
          <ProductForm onSubmit={handleSubmit} />
        </div>

        <div className="min-w-0">
          <div className="card p-6 sticky top-24">
            <h3 className="font-semibold text-primary mb-4">Product Images</h3>
            <ProductImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={10}
            />
          </div>

          <div className="card p-6 mt-4 sticky top-24" style={{ top: '400px' }}>
            <h3 className="font-semibold text-primary mb-4">Publishing</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2" defaultChecked />
                <span className="text-sm text-secondary">Active</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary focus:ring-2" />
                <span className="text-sm text-secondary">Featured</span>
              </label>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="secondary" className="flex-1">Save as Draft</Button>
              <Button variant="primary" className="flex-1" type="submit" form="product-form">
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;