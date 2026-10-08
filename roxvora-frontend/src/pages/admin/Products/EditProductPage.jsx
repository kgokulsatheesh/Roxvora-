import { useEffect, useState } from 'react';
import ProductForm from '../../../components/admin/products/ProductForm';
import ProductImageUpload from '../../../components/admin/products/ProductImageUpload';

const EditProductPage = ({ params }) => {
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const mockProduct = {
      id: params.id,
      name: 'Classic White T-Shirt',
      slug: 'classic-white-t-shirt',
      description: 'A comfortable classic white t-shirt made from 100% organic cotton.',
      shortDescription: 'Classic white t-shirt',
      price: 29.99,
      originalPrice: 39.99,
      category: 'tshirts',
      brand: 'roxvora',
      sku: 'TSH-001',
      stock: 150,
      weight: 0.2,
      taxClass: 'standard',
      isActive: true,
      isFeatured: false,
      isNew: true,
      isSale: true,
      tags: 'cotton, basic, white',
    };
    setProduct(mockProduct);
    setImages([
      { id: '1', url: '/images/products/tshirt-1.jpg', preview: '/images/products/tshirt-1.jpg' },
      { id: '2', url: '/images/products/tshirt-2.jpg', preview: '/images/products/tshirt-2.jpg' },
    ]);
  }, [params.id]);

  const handleSubmit = (data) => {
    console.log('Update product:', { ...data, images, id: params.id });
  };

  if (!product) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-secondary font-bold text-primary">Edit Product</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-w-0">
          <ProductForm
            onSubmit={handleSubmit}
            defaultValues={product}
            categories={[
              { id: 'tshirts', name: 'T-Shirts' },
              { id: 'jeans', name: 'Jeans' },
              { id: 'jackets', name: 'Jackets' },
            ]}
            brands={[
              { id: 'roxvora', name: 'ROXVORA' },
              { id: 'nike', name: 'Nike' },
            ]}
          />
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
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;