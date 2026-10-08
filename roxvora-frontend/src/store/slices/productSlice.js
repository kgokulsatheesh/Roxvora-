import { createSlice, createSelector } from '@reduxjs/toolkit';
// import { helpers } from 'utils/helpers';
import { helpers } from "../../utils/helpers"

const initialState = {
  products: [
    {
      id: 1,
      slug: 'floral-midi-dress',
      name: 'Floral Midi Dress',
      category: 'Dresses',
      price: 7499,
      originalPrice: 9999,
      images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80'],
      isNew: true,
      isSale: true,
      isBestseller: false,
      discountPercent: 25,
      rating: 4.5,
      reviewCount: 128,
      description: 'Beautiful floral midi dress perfect for spring occasions. Made from lightweight, breathable fabric with a flattering fit.',
      sku: 'DRS-001',
      stock: 45,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ value: '#FF6B6B', name: 'Coral' }, { value: '#4ECDC4', name: 'Mint' }, { value: '#FFFFFF', name: 'White' }],
    },
    {
      id: 2,
      slug: 'classic-white-sneakers',
      name: 'Classic White Sneakers',
      category: 'Shoes',
      price: 10799,
      originalPrice: 13299,
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80'],
      isNew: false,
      isSale: true,
      isBestseller: true,
      discountPercent: 19,
      rating: 4.8,
      reviewCount: 342,
      description: 'Timeless white sneakers crafted from premium leather. Comfortable for all-day wear with a classic silhouette.',
      sku: 'SHO-001',
      stock: 67,
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: [{ value: '#FFFFFF', name: 'White' }],
    },
    {
      id: 3,
      slug: 'denim-jacket',
      name: 'Classic Denim Jacket',
      category: 'Outerwear',
      price: 12499,
      originalPrice: 15799,
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'],
      isNew: true,
      isSale: true,
      isBestseller: false,
      discountPercent: 21,
      rating: 4.6,
      reviewCount: 89,
      description: 'Classic denim jacket with a modern fit. Made from premium cotton denim that gets better with age.',
      sku: 'JKT-001',
      stock: 34,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ value: '#1A3C6E', name: 'Classic Blue' }, { value: '#000000', name: 'Black' }],
    },
    {
      id: 4,
      slug: 'silk-blouse',
      name: 'Silk Blouse',
      category: 'Tops',
      price: 6699,
      originalPrice: 8399,
      images: ['https://images.unsplash.com/photo-1564257677-065b9c2c2b6e?w=800&q=80'],
      isNew: false,
      isSale: true,
      isBestseller: true,
      discountPercent: 20,
      rating: 4.7,
      reviewCount: 156,
      description: 'Luxurious silk blouse with a relaxed fit. Perfect for both office and evening wear.',
      sku: 'TOP-001',
      stock: 52,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ value: '#F5F5F5', name: 'Ivory' }, { value: '#000000', name: 'Black' }, { value: '#8B4513', name: 'Sand' }],
    },
    {
      id: 5,
      slug: 'leather-tote-bag',
      name: 'Leather Tote Bag',
      category: 'Accessories',
      price: 20799,
      originalPrice: 24999,
      images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80'],
      isNew: false,
      isSale: true,
      isBestseller: false,
      discountPercent: 17,
      rating: 4.9,
      reviewCount: 78,
      description: 'Spacious leather tote bag crafted from premium Italian leather. Features multiple compartments and laptop sleeve.',
      sku: 'BAG-001',
      stock: 23,
      sizes: ['One Size'],
      colors: [{ value: '#8B4513', name: 'Cognac' }, { value: '#000000', name: 'Black' }, { value: '#8B4513', name: 'Tan' }],
    },
    {
      id: 6,
      slug: 'high-waisted-jeans',
      name: 'High-Waisted Jeans',
      category: 'Bottoms',
      price: 7499,
      originalPrice: 9999,
      images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80'],
      isNew: true,
      isSale: true,
      isBestseller: true,
      discountPercent: 25,
      rating: 4.4,
      reviewCount: 234,
      description: 'Flattering high-waisted jeans with a comfortable stretch. Classic five-pocket styling with a modern fit.',
      sku: 'JNS-001',
      stock: 78,
      sizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32'],
      colors: [{ value: '#1A3C6E', name: 'Dark Wash' }, { value: '#4A90D9', name: 'Light Wash' }, { value: '#000000', name: 'Black' }],
    },
    {
      id: 7,
      slug: 'cashmere-sweater',
      name: 'Cashmere Sweater',
      category: 'Knitwear',
      price: 15799,
      originalPrice: 20799,
      images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'],
      isNew: false,
      isSale: true,
      isBestseller: false,
      discountPercent: 24,
      rating: 4.8,
      reviewCount: 112,
      description: 'Ultra-soft cashmere sweater in a relaxed fit. Timeless piece that will last for years.',
      sku: 'KNT-001',
      stock: 41,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ value: '#F5F5F5', name: 'Cream' }, { value: '#8B4513', name: 'Camel' }, { value: '#1A3C6E', name: 'Navy' }, { value: '#000000', name: 'Black' }],
    },
    {
      id: 8,
      slug: 'leather-ankle-boots',
      name: 'Leather Ankle Boots',
      category: 'Shoes',
      price: 16599,
      originalPrice: 20799,
      images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80'],
      isNew: false,
      isSale: true,
      isBestseller: false,
      discountPercent: 20,
      rating: 4.5,
      reviewCount: 91,
      description: 'Sleek leather ankle boots with a comfortable block heel. Versatile enough for day to night.',
      sku: 'BTS-001',
      stock: 29,
      sizes: ['6', '7', '8', '9', '10', '11'],
      colors: [{ value: '#000000', name: 'Black' }, { value: '#8B4513', name: 'Brown' }],
    },
    {
      id: 9,
      slug: 'kids-denim-jacket',
      name: 'Kids Denim Jacket',
      category: 'Boys',
      price: 3499,
      originalPrice: 4499,
      images: ['https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80'],
      isNew: true,
      isSale: false,
      isBestseller: false,
      discountPercent: 22,
      rating: 4.6,
      reviewCount: 74,
      description: 'Durable denim jacket for everyday adventures. Soft cotton twill with comfortable stretch for growing kids.',
      sku: 'KID-001',
      stock: 58,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
      colors: [{ value: '#1A3C6E', name: 'Classic Blue' }, { value: '#000000', name: 'Black' }],
    },
    {
      id: 10,
      slug: 'girls-party-dress',
      name: "Girls' Party Dress",
      category: 'Girls',
      price: 2799,
      originalPrice: 3499,
      images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80'],
      isNew: true,
      isSale: false,
      isBestseller: false,
      discountPercent: 20,
      rating: 4.7,
      reviewCount: 63,
      description: 'Twirl-ready party dress with soft tulle skirt and satin bow. Machine washable and delightfully comfortable.',
      sku: 'KID-002',
      stock: 41,
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
      colors: [{ value: '#FFB6C1', name: 'Blush' }, { value: '#FFFFFF', name: 'White' }],
    },
    {
      id: 11,
      slug: 'baby-onesies-set',
      name: 'Baby Organic Cotton Onesie Set',
      category: 'Baby',
      price: 1899,
      originalPrice: 2499,
      images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80'],
      isNew: true,
      isSale: false,
      isBestseller: true,
      discountPercent: 24,
      rating: 4.8,
      reviewCount: 187,
      description: 'Buttery-soft organic cotton onesies in a 3-pack. Snaps make nappy changes quick and effortless.',
      sku: 'KID-003',
      stock: 92,
      sizes: ['0-3M', '3-6M', '6-9M', '9-12M'],
      colors: [{ value: '#F5F5F5', name: 'Cream' }, { value: '#FFB6C1', name: 'Blush' }, { value: '#B0E0E6', name: 'Sky' }],
    },
    {
      id: 12,
      slug: 'wooden-toy-blocks',
      name: 'Wooden Building Blocks',
      category: 'Toys',
      price: 1599,
      originalPrice: 1999,
      images: ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80'],
      isNew: false,
      isSale: true,
      isBestseller: false,
      discountPercent: 20,
      rating: 4.9,
      reviewCount: 142,
      description: 'Smooth, splinter-free wooden blocks in bright non-toxic colours. Encourages creativity and fine motor skills.',
      sku: 'TOY-001',
      stock: 73,
      sizes: ['One Size'],
      colors: [{ value: '#FF6B6B', name: 'Multi' }],
    },
    {
      id: 13,
      slug: 'aviator-sunglasses',
      name: 'Classic Aviator Sunglasses',
      category: 'Accessories',
      price: 3999,
      originalPrice: 4999,
      images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'],
      isNew: false,
      isSale: true,
      isBestseller: true,
      discountPercent: 20,
      rating: 4.5,
      reviewCount: 203,
      description: 'Timeless aviator silhouette with UV400 protection and lightweight metal frame. Includes a hard case.',
      sku: 'ACC-001',
      stock: 65,
      sizes: ['One Size'],
      colors: [{ value: '#CC7722', name: 'Gold' }, { value: '#000000', name: 'Black' }],
    },
    {
      id: 14,
      slug: 'leather-watch',
      name: 'Minimalist Leather Watch',
      category: 'Accessories',
      price: 6499,
      originalPrice: 7999,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'],
      isNew: false,
      isSale: true,
      isBestseller: false,
      discountPercent: 19,
      rating: 4.6,
      reviewCount: 118,
      description: 'Clean dial with genuine leather strap and Japanese movement. Water resistant for everyday wear.',
      sku: 'ACC-002',
      stock: 38,
      sizes: ['One Size'],
      colors: [{ value: '#000000', name: 'Black' }, { value: '#8B4513', name: 'Tan' }],
    },
    {
      id: 15,
      slug: 'canvas-backpack',
      name: 'Urban Canvas Backpack',
      category: 'Bags',
      price: 4499,
      originalPrice: 5699,
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'],
      isNew: true,
      isSale: false,
      isBestseller: false,
      discountPercent: 21,
      rating: 4.7,
      reviewCount: 96,
      description: 'Water-resistant canvas backpack with padded laptop sleeve and hidden back pocket. Built for daily commutes.',
      sku: 'BAG-002',
      stock: 51,
      sizes: ['One Size'],
      colors: [{ value: '#000000', name: 'Black' }, { value: '#8B4513', name: 'Khaki' }],
    },
  ],
  categories: [],
  featuredProducts: [],
  newArrivals: [],
  bestSellers: [],
  currentProduct: null,
  filters: {
    category: '',
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    availability: [],
    sortBy: 'featured',
    searchQuery: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    perPage: 20,
  },
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products || action.payload;
      state.pagination = action.payload.pagination || state.pagination;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    setNewArrivals: (state, action) => {
      state.newArrivals = action.payload;
    },
    setBestSellers: (state, action) => {
      state.bestSellers = action.payload;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  setCategories,
  setFeaturedProducts,
  setNewArrivals,
  setBestSellers,
  setCurrentProduct,
  setFilters,
  clearFilters,
  setPagination,
  setLoading: setProductLoading,
  setError: setProductError,
} = productSlice.actions;

export const selectProducts = (state) => state.product.products;

// Categories are derived from the loaded products so the filter UI, category
// grids and category pages always agree, even before setCategories is dispatched.
export const selectCategories = createSelector(
  [(state) => state.product.products, (state) => state.product.categories],
  (products, stored) => {
    const grouped = new Map();

    products.forEach((product) => {
      const name = product.category;
      if (!name) return;
      if (!grouped.has(name)) {
        grouped.set(name, {
          id: helpers.slugify(name),
          name,
          slug: helpers.slugify(name),
          href: `/shop/${helpers.slugify(name)}`,
          count: 0,
          image: product.images?.[0] || product.image || '',
        });
      }
      grouped.get(name).count += 1;
    });

    const derived = Array.from(grouped.values()).sort((a, b) => a.name.localeCompare(b.name));

    // Preserve any richer entries that were pushed via setCategories.
    if (stored?.length) {
      const known = new Set(derived.map((c) => c.slug));
      const extra = stored
        .map((c) => ({ ...c, slug: c.slug || helpers.slugify(c.name || ''), href: c.href || `/shop/${c.slug || helpers.slugify(c.name || '')}` }))
        .filter((c) => !known.has(c.slug));
      return [...derived, ...extra];
    }

    return derived;
  }
);
export const selectFeaturedProducts = (state) => state.product.featuredProducts;
export const selectNewArrivals = (state) => state.product.newArrivals;
export const selectBestSellers = (state) => state.product.bestSellers;
export const selectCurrentProduct = (state) => state.product.currentProduct;
export const selectProductFilters = (state) => state.product.filters;
export const selectProductPagination = (state) => state.product.pagination;
export const selectProductLoading = (state) => state.product.isLoading;
export const selectProductError = (state) => state.product.error;
export const selectProductBySlug = (state, slug) =>
  state.product.products.find((p) => p.slug === slug) || state.product.currentProduct;
export const selectActiveFilters = (state) =>
  Object.values(state.product.filters).filter((v) => Array.isArray(v) ? v.length > 0 : v).length;

export default productSlice.reducer;