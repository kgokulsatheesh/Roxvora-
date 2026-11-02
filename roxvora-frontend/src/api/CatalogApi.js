/**
 * src/api/CatalogApi.js
 * Free API: https://dummyjson.com  (no key needed)
 *
 * Exports used by your pages:
 *   loadCatalog(categorySlug, subSlug)  -> Promise<{ products, approximate?, note? }>
 *   peekCatalog(categorySlug, subSlug)  -> cached result (sync) or undefined
 *   prefetchCatalog(categorySlug, subSlug)   (used by CategoryMenu hover)
 *   loadRelated(categoryLabel)          -> Promise<product[]>  (similar products)
 *   getHero(categorySlug)               -> hero design data for CategoryPage
 *   normalizeApiProduct(raw)
 */

const BASE = 'https://dummyjson.com';
const USD_TO_INR = 83;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const toSlug = (text) =>
  String(text)
    .toLowerCase()
    .replace(/%/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const prettyLabel = (slug = '') =>
  slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

/* DummyJSON shape -> normalised shape (same one ProductDetailsPage uses) */
export const normalizeApiProduct = (p) => {
  const price = Math.round(p.price * USD_TO_INR);
  const discount = Number(p.discountPercentage) || 0;
  return {
    id: `api-${p.id}`,
    name: p.title,
    title: p.title,
    description: p.description,
    brand: p.brand,
    category: prettyLabel(p.category),
    price,
    originalPrice: discount > 0 ? Math.round(price / (1 - discount / 100)) : undefined,
    discount: discount > 0 ? Math.round(discount) : undefined,
    rating: p.rating,
    ratingCount: Array.isArray(p.reviews) ? p.reviews.length : undefined,
    stock: p.stock,
    image: p.thumbnail,
    thumbnail: p.thumbnail,
    images: p.images?.length ? p.images : [p.thumbnail],
    sizes: [],
    colors: [],
    isSale: discount >= 10,
    isBestSeller: (p.rating || 0) >= 4.5,
    sku: p.sku,
    weight: p.weight,
    dimensions: p.dimensions,
    tags: p.tags,
    warrantyInformation: p.warrantyInformation,
    shippingInformation: p.shippingInformation,
    returnPolicy: p.returnPolicy,
    availabilityStatus: p.availabilityStatus,
    minimumOrderQuantity: p.minimumOrderQuantity,
    reviews: p.reviews,
    meta: p.meta,
    specifications: p.specifications,
    manufacturer: p.manufacturer,
  };
};

export const SECTION_LIST = [
  { key: "women", title: "Women" },
  { key: "men", title: "Men" },
  { key: "kids", title: "Kids" },
  { key: "accessories", title: "Accessories" },
  { key: "sale", title: "Sale" },
  { key: "new-arrivals", title: "New Arrivals" },
];

const byDiscount = (a, b) => (b.discount || 0) - (a.discount || 0);
const byRating = (a, b) => (b.rating || 0) - (a.rating || 0);
const byNewest = (a, b) =>
  new Date(b.meta?.createdAt || 0) - new Date(a.meta?.createdAt || 0);
const byStockAsc = (a, b) => (a.stock || 0) - (b.stock || 0);
const byReviews = (a, b) =>
  (b.reviews?.length || 0) - (a.reviews?.length || 0) || byRating(a, b);

/* ------------------------------------------------------------------ */
/* Menu -> DummyJSON category map                                      */
/* DummyJSON has no trousers / jackets / toys, so those sub-categories */
/* use the closest category and are flagged `approx` (the page shows   */
/* an info banner for them). Replace with your own backend later.      */
/* ------------------------------------------------------------------ */
export const CATALOG_MAP = {
  women: {
    all: ['womens-dresses', 'tops', 'womens-shoes', 'womens-bags', 'womens-jewellery', 'womens-watches'],
    subs: {
      dresses: { api: ['womens-dresses'] },
      tops: { api: ['tops'] },
      bottoms: { api: ['womens-shoes'], approx: true },
      outerwear: { api: ['womens-bags'], approx: true },
      knitwear: { api: ['womens-jewellery'], approx: true },
    },
  },
  men: {
    all: ['mens-shirts', 'mens-shoes', 'mens-watches', 'sunglasses'],
    subs: {
      tops: { api: ['mens-shirts'] },
      bottoms: { api: ['mens-watches'], approx: true },
      outerwear: { api: ['sunglasses'], approx: true },
      shoes: { api: ['mens-shoes'] },
    },
  },
  kids: {
    all: ['sports-accessories', 'beauty', 'skin-care', 'home-decoration'],
    subs: {
      boys: { api: ['sports-accessories'], approx: true },
      girls: { api: ['beauty'], approx: true },
      baby: { api: ['skin-care'], approx: true },
      toys: { api: ['home-decoration'], approx: true },
    },
  },
  accessories: {
    all: ['womens-jewellery', 'womens-watches', 'mens-watches', 'sunglasses', 'womens-bags'],
    subs: {
      accessories: { api: ['womens-jewellery', 'sunglasses'] },
      bags: { api: ['womens-bags'] },
      shoes: { api: ['womens-shoes', 'mens-shoes'] },
    },
  },
  sale: {
    all: ['womens-dresses', 'tops', 'mens-shirts', 'womens-shoes', 'mens-shoes', 'womens-bags', 'sunglasses', 'fragrances'],
    subs: {
      'up-to-50': { sort: byDiscount },
      'up-to-70': { sort: byRating },
      clearance: { filter: (p) => (p.stock || 0) < 30, sort: byStockAsc },
      'final-sale': { filter: (p) => (p.discount || 0) >= 8, sort: byDiscount },
    },
  },
  'new-arrivals': {
    all: ['womens-dresses', 'tops', 'mens-shirts', 'womens-shoes', 'mens-shoes', 'womens-bags', 'sunglasses', 'womens-watches'],
    subs: {
      'this-week': { sort: byNewest },
      trending: { sort: byRating },
      'best-sellers': { sort: byReviews },
      'coming-soon': { filter: (p) => (p.stock || 0) < 50, sort: byStockAsc },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Hero design data (used by CategoryPage)                             */
/* ------------------------------------------------------------------ */
export const HERO_DEFAULT = {
  display: 'SHOP',
  headline: 'Modern pieces for every day',
  description: 'Browse rated products with clear prices, stock and delivery details.',
  gradient: ['#14151A', '#2f3a4a', '#e8edf3'],
  accent: '#0E6B5C',
  story: {
    title: 'Chosen by customers',
    text: 'Start with the top rated products, then filter by price, brand and discount.',
  },
};

export const HERO = {
  women: {
    display: 'WOMEN',
    headline: 'Clothes and accessories built for every day',
    description: 'Dresses, tops, shoes, bags and jewellery picked for fit, finish and how often you will actually wear them.',
    gradient: ['#2e1065', '#7e22ce', '#f3e8ff'],
    accent: '#7e22ce',
    story: { title: 'Fewer pieces. Worn more.', text: 'Every item here is rated by real shoppers. Start with the top rated pieces, then build around them.' },
  },
  men: {
    display: 'MEN',
    headline: 'Sharp basics and everyday upgrades',
    description: 'Shirts, shoes, watches and sunglasses that work from the office to the weekend.',
    gradient: ['#0b2a4a', '#1d4ed8', '#dbeafe'],
    accent: '#1d4ed8',
    story: { title: 'Built to be repeated', text: 'Reliable pieces you can wear every week. Compare ratings, check stock and order in a few taps.' },
  },
  kids: {
    display: 'KIDS',
    headline: 'Playful, safe and ready for anything',
    description: 'Gear and care products for boys, girls and babies, with clear stock and delivery details.',
    gradient: ['#7c2d12', '#f59e0b', '#fef3c7'],
    accent: '#b45309',
    story: { title: 'Made for small people', text: 'Check ratings, warranty and return policy on every product before you buy.' },
  },
  accessories: {
    display: 'EXTRAS',
    headline: 'The details that finish the look',
    description: 'Bags, watches, jewellery, sunglasses and shoes from rated brands.',
    gradient: ['#042f2e', '#0f766e', '#ccfbf1'],
    accent: '#0f766e',
    story: { title: 'Small things, big difference', text: 'Browse by type or open any product for warranty and shipping information.' },
  },
  sale: {
    display: 'SALE',
    headline: 'Real discounts on products people rate highly',
    description: 'Price drops across clothing, shoes, bags and more. Sorted so the biggest savings come first.',
    gradient: ['#450a0a', '#dc2626', '#fee2e2'],
    accent: '#b91c1c',
    story: { title: 'Good prices, still good products', text: 'We only list sale items that keep a solid customer rating.' },
  },
  'new-arrivals': {
    display: 'NEW',
    headline: 'Just landed this season',
    description: 'The newest products added to the store, updated as soon as they are in stock.',
    gradient: ['#1e1b4b', '#4f46e5', '#e0e7ff'],
    accent: '#4338ca',
    story: { title: 'First to wear it', text: 'Fresh arrivals sorted by date, trend and sales so you can see what is moving.' },
  },
};

export const getHero = (categorySlug) => ({ ...HERO_DEFAULT, ...(HERO[categorySlug] || {}) });

/* ------------------------------------------------------------------ */
/* Fetching + caching                                                  */
/* ------------------------------------------------------------------ */
const categoryRequests = new Map(); // dummyjson category -> Promise<normalised[]>
const pending = new Map(); // page key -> Promise<result>
const results = new Map(); // page key -> result (sync access for peekCatalog)

const pageKey = (categorySlug, subSlug) => `${categorySlug}/${subSlug || ''}`;

const fetchApiCategory = (apiCategory) => {
  if (!categoryRequests.has(apiCategory)) {
    const promise = fetch(`${BASE}/products/category/${encodeURIComponent(apiCategory)}?limit=100`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => (data.products || []).map(normalizeApiProduct))
      .catch((error) => {
        categoryRequests.delete(apiCategory); // allow retry
        throw error;
      });
    categoryRequests.set(apiCategory, promise);
  }
  return categoryRequests.get(apiCategory);
};

/** Cached page result, available instantly (or undefined). */
export const peekCatalog = (categorySlug, subSlug) =>
  results.get(pageKey(categorySlug, subSlug));

export const loadCatalog = (categorySlug, subSlug) => {
  const key = pageKey(categorySlug, subSlug);
  if (results.has(key)) return Promise.resolve(results.get(key));
  if (pending.has(key)) return pending.get(key);

  const group = CATALOG_MAP[categorySlug];
  const sub = subSlug && group ? group.subs[subSlug] : null;
  if (!group || (subSlug && !sub)) {
    return Promise.reject(new Error('Unknown category'));
  }

  const apiCategories = sub?.api || group.all;

  const promise = Promise.all(apiCategories.map(fetchApiCategory))
    .then((lists) => {
      const seen = new Set();
      let products = lists.flat().filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      });

      if (sub?.filter) {
        const filtered = products.filter(sub.filter);
        if (filtered.length) products = filtered; // never leave the page empty
      }
      if (sub?.sort) products = [...products].sort(sub.sort);

      const result = { products, approximate: Boolean(sub?.approx) };
      results.set(key, result);
      return result;
    })
    .finally(() => pending.delete(key));

  pending.set(key, promise);
  return promise;
};

/** Called by CategoryMenu on hover / focus / touch. Never throws. */
export const prefetchCatalog = (categorySlug, subSlug) => {
  loadCatalog(categorySlug, subSlug).catch(() => {});
};

/** Similar products for the details page (category label like "Womens Dresses"). */
export const loadRelated = (categoryLabel) => {
  if (!categoryLabel) return Promise.resolve([]);
  return fetchApiCategory(toSlug(categoryLabel)).catch(() => []);
};