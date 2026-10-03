import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiChevronRight, FiTruck, FiRotateCcw, FiShield } from 'react-icons/fi';

import ProductGrid from '@components/product/ProductGrid';
import ProductGallery from '@components/product/ProductGallery';
import ProductInfo from '@components/product/ProductInfo';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { selectProductBySlug, selectProducts } from '@store/slices/productSlice';
import { addToCart } from '@store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@store/slices/wishlistSlice';
import { appConfig } from '@config/appConfig';

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useSelector((state) => selectProductBySlug(state, slug));
  const allProducts = useSelector(selectProducts);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const isInWishlist = product ? wishlistItems.some((i) => i.id === product.id) : false;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          p.category &&
          product.category &&
          p.category.toLowerCase() === product.category.toLowerCase()
      )
      .slice(0, 4);
  }, [allProducts, product]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-primary mb-2">Product not found</h1>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    setIsAddingToCart(true);
    dispatch(addToCart({ ...product, size: selectedSize, color: selectedColor, quantity }));
    toast.success(`${product.name} added to cart`);
    setIsAddingToCart(false);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    dispatch(addToCart({ ...product, size: selectedSize, color: selectedColor, quantity }));
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    dispatch(isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product));
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white border-b" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <ol className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm overflow-x-auto whitespace-nowrap" role="list">
            <li className="shrink-0"><Link to="/" className="text-secondary hover:text-primary">Home</Link></li>
            <li className="shrink-0"><FiChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" aria-hidden="true" /></li>
            <li className="shrink-0"><Link to="/shop" className="text-secondary hover:text-primary">Shop</Link></li>
            <li className="shrink-0"><FiChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" aria-hidden="true" /></li>
            <li className="shrink-0"><Link to={`/shop/${product.category.toLowerCase()}`} className="text-secondary hover:text-primary">{product.category}</Link></li>
            <li className="shrink-0"><FiChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" aria-hidden="true" /></li>
            <li className="min-w-0"><span className="block truncate max-w-[120px] sm:max-w-[240px] text-primary font-medium">{product.name}</span></li>
          </ol>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="lg:sticky lg:top-32 min-w-0">
            <ProductGallery
              images={product.images?.map((img, i) => ({ url: img, alt: `${product.name} - Image ${i + 1}` })) || []}
              mainImageIndex={selectedImage}
              onImageChange={setSelectedImage}
            />
          </div>

          <div className="min-w-0">
            <ProductInfo
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              quantity={quantity}
              onSizeChange={setSelectedSize}
              onColorChange={setSelectedColor}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onWishlistToggle={handleWishlistToggle}
              isLoading={isAddingToCart}
            />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Product Details</h3>
            <dl className="space-y-3">
              <div className="flex items-baseline justify-between gap-4 border-b border-neutral-100 pb-3">
                <dt className="text-sm text-ink-soft">SKU</dt>
                <dd className="font-mono text-sm font-medium text-primary">{product.sku}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-neutral-100 pb-3">
                <dt className="text-sm text-ink-soft">Category</dt>
                <dd className="text-sm font-medium text-primary">{product.category}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-neutral-100 pb-3">
                <dt className="text-sm text-ink-soft">Brand</dt>
                <dd className="text-sm font-medium text-primary">{product.brand || 'ROXVORA'}</dd>
              </div>
              {product.weight && (
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-ink-soft">Weight</dt>
                  <dd className="text-sm font-medium text-primary">{product.weight} kg</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-primary mb-4">Shipping & Returns</h3>
            <div className="space-y-3 text-sm text-ink-soft">
              <div className="flex items-center gap-2">
                <FiTruck className="w-5 h-5 flex-shrink-0 text-secondary" aria-hidden="true" /> Free shipping on
                orders over &#8377;{appConfig.cart.freeShippingThreshold.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-2">
                <FiRotateCcw className="w-5 h-5 flex-shrink-0 text-secondary" aria-hidden="true" /> 30-day easy returns
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="w-5 h-5 flex-shrink-0 text-secondary" aria-hidden="true" /> Secure checkout
              </div>
            </div>
          </div>
        </div>

          {relatedProducts.length > 0 && (
            <section className="mt-16 md:mt-20" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-2xl md:text-3xl font-secondary font-semibold text-primary mb-8"
              >
                You May Also Like
              </h2>
              <ProductGrid products={relatedProducts} />
            </section>
          )}
      </main>
    </div>
  );
};

export default ProductDetailsPage;