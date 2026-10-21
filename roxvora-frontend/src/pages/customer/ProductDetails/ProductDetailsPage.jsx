import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiHeart, FiShoppingBag, FiTruck, FiRotateCcw, FiShield, 
  FiStar, FiChevronRight, FiCheck, FiShare2, FiInfo 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Mock database for products with multiple color variants, sizes, and specs
const PRODUCT_DATABASE = {
  1: {
    id: 1,
    name: 'Silk Blend Evening Botanical Dress',
    category: 'Dresses',
    basePrice: 280,
    originalPrice: 350,
    rating: 4.8,
    reviewCount: 142,
    description: 'Crafted from a luminous Italian silk blend, this architectural evening dress features a hand-stitched botanical silhouette, asymmetrical drape, and a concealed rear zip closure.',
    highlights: [
      '100% Luminous Italian Silk & Cupro Lining',
      'Hand-finished structural pleats along the waistline',
      'Concealed champagne gold back zipper fastening',
      'Dry clean only by an accredited luxury specialist'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne Gold', hex: '#D4AF37', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1200&q=80' },
      { name: 'Midnight Obsidian', hex: '#1A1816', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80' },
      { name: 'Ivory Cream', hex: '#FAF7F2', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80' }
    ]
  },
  2: {
    id: 2,
    name: 'Italian Wool Executive Suit',
    category: 'Tailored',
    basePrice: 450,
    originalPrice: 560,
    rating: 4.9,
    reviewCount: 98,
    description: 'Immaculately tailored from virgin wool, this executive suit pairs structured padded shoulders with a modern slim-leg silhouette for commanding boardroom elegance.',
    highlights: [
      '100% Virgin Australian Wool (Super 130s)',
      'Structured canvas chest piece for natural contouring',
      'Double-vented back hem and horn button closures',
      'Matching mid-rise tailored trousers included'
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    colors: [
      { name: 'Espresso Brown', hex: '#3E2723', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80' },
      { name: 'Midnight Navy', hex: '#000080', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80' }
    ]
  }
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fallback to product id 1 if not found in database
  const product = PRODUCT_DATABASE[id] || PRODUCT_DATABASE[1];

  // State management for variants
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]); // Default to second size (e.g., 'S' or 'M')
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Handle Pincode check simulator
  const handleCheckDelivery = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryStatus('Express Delivery by Tomorrow, 8:00 PM (Free)');
    } else {
      setDeliveryStatus('Please enter a valid 6-digit postal code.');
    }
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-neutral-950 py-10 px-4 sm:px-8 lg:px-16 selection:bg-[#D4AF37] selection:text-white">
      
      {/* Breadcrumb Navigation */}
      <nav className="max-w-[1536px] mx-auto mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
        <Link to="/" className="hover:text-neutral-900 transition-colors">Home</Link>
        <FiChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-neutral-900 transition-colors">Catalog</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-[#9A7B2C] truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Grid Container */}
      <div className="max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
        
        {/* Left Column: Dynamic Image Showcase */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-white shadow-xl border border-neutral-200/60">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedColor.name}
                src={selectedColor.image}
                alt={`${product.name} - ${selectedColor.name}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            {/* Wishlist Floating Button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`absolute top-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${
                isLiked ? 'bg-[#9A7B2C] text-white' : 'bg-white/80 text-neutral-800 hover:bg-white'
              }`}
            >
              <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            {/* Live Color Badge Overlay */}
            <div className="absolute bottom-6 left-6 z-20">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-neutral-900 shadow-md border border-white/40">
                Finish: {selectedColor.name}
              </span>
            </div>
          </div>

          {/* Thumbnail Selector Gallery */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.colors.map((col) => (
              <button
                key={col.name}
                onClick={() => setSelectedColor(col)}
                className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 shadow-sm ${
                  selectedColor.name === col.name ? 'border-[#9A7B2C] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Specs, Variants, Cart & Delivery */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          
          {/* Category & Ratings */}
          <div className="flex items-center justify-between mb-3">
            <span className="px-3.5 py-1 bg-neutral-200/70 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-[#9A7B2C]">
              {product.category}
            </span>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-neutral-200 shadow-sm">
              <FiStar className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span className="text-xs font-bold text-neutral-900">{product.rating}</span>
              <span className="text-[11px] text-neutral-400">({product.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Product Title */}
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Pricing Block */}
          <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-neutral-300/60">
            <span className="text-3xl font-serif font-bold text-neutral-950">
              ${product.basePrice}
            </span>
            <span className="text-base text-neutral-400 line-through">
              ${product.originalPrice}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              In Stock & Ready
            </span>
          </div>

          {/* Color Switcher */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">
              Select Finish: <span className="text-neutral-950 font-semibold">{selectedColor.name}</span>
            </label>
            <div className="flex items-center gap-3">
              {product.colors.map((col) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col)}
                  className={`relative w-9 h-9 rounded-full transition-all flex items-center justify-center ${
                    selectedColor.name === col.name ? 'ring-2 ring-offset-2 ring-[#9A7B2C] scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Select Size: <span className="text-neutral-950 font-semibold">{selectedSize}</span>
              </label>
              <button className="text-[11px] font-semibold uppercase tracking-wider text-[#9A7B2C] underline">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] h-12 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                    selectedSize === size
                      ? 'bg-neutral-950 text-white shadow-md ring-2 ring-[#9A7B2C]/50'
                      : 'bg-white text-neutral-800 border border-neutral-300 hover:border-neutral-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag & Buy Now Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
                addedToCart ? 'bg-emerald-600 text-white' : 'bg-neutral-950 hover:bg-[#9A7B2C] text-white hover:text-black'
              }`}
            >
              {addedToCart ? <FiCheck className="w-4 h-4" /> : <FiShoppingBag className="w-4 h-4" />}
              <span>{addedToCart ? 'Added to Bag Successfully' : 'Add to Shopping Bag'}</span>
            </button>
          </div>

          {/* Dummy Delivery & Pincode Checker */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-neutral-200 shadow-sm mb-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-800">
              <FiTruck className="w-4 h-4 text-[#9A7B2C]" />
              <span>Check Delivery Availability</span>
            </div>
            <form onSubmit={handleCheckDelivery} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit Pincode"
                maxLength="6"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs font-medium focus:outline-none focus:border-[#9A7B2C]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#9A7B2C] hover:text-black transition-colors"
              >
                Verify
              </button>
            </form>
            {deliveryStatus && (
              <p className={`text-xs font-medium ${pincode.length === 6 ? 'text-emerald-600' : 'text-red-500'}`}>
                {deliveryStatus}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
              <div className="flex items-center gap-2">
                <FiShield className="w-3.5 h-3.5 text-[#9A7B2C]" />
                <span>100% Original Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <FiRotateCcw className="w-3.5 h-3.5 text-[#9A7B2C]" />
                <span>14-Day Concierge Returns</span>
              </div>
            </div>
          </div>

          {/* Product Highlights Accordion Box */}
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <FiInfo className="w-3.5 h-3.5 text-[#9A7B2C]" /> Product Highlights & Specifications
            </h3>
            <p className="text-sm font-light text-neutral-600 leading-relaxed mb-3">
              {product.description}
            </p>
            <ul className="space-y-2">
              {product.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9A7B2C] mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;