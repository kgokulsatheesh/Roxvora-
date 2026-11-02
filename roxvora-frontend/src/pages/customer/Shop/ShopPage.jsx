import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Drawer,
  Fab,
  IconButton,
  InputBase,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiFilter,
  FiGrid,
  FiList,
  FiMaximize2,
  FiMinimize2,
  FiRotateCcw,
  FiSearch,
  FiX,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

import ProductCard, { THEME } from './ProductCard';
import FilterPanel from './FilterPanel';
import { selectProducts, selectCategories } from '../../../store/slices/productSlice';

/* ----------------------------- constants ----------------------------- */
const PRICE_MIN = 0;
const PRICE_MAX = 25000;
const PAGE_SIZE = 12;
const EMPTY = []; // stable reference so useMemo does not re-run when the store is empty

/* ---- search settings ---- */
const SEARCH_API = 'https://dummyjson.com/products/search'; // free, no API key
const SEARCH_LIMIT = 100;
const SEARCH_DEBOUNCE_MS = 400;
const USD_TO_INR = 83; // the API returns USD; change this rate if you want
const QUICK_SEARCHES = ['shirt', 'pants', 't-shirt', 'shoes', 'watch', 'bag'];

const DEFAULT_FILTERS = {
  categories: [],
  priceRange: [PRICE_MIN, PRICE_MAX],
  sizes: [],
  colors: [],
  availability: [],
  rating: null,
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Relevance' },
  { value: 'best-selling', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' },
];

const AVAILABILITY_OPTIONS = [
  { value: 'in-stock', label: 'In stock' },
  { value: 'on-sale', label: 'On sale' },
  { value: 'new-arrivals', label: 'New arrivals' },
  { value: 'bestsellers', label: 'Best sellers' },
];

const DEFAULT_COLORS = [
  { value: '#000000', name: 'Black' },
  { value: '#FFFFFF', name: 'White' },
  { value: '#1a1a2e', name: 'Navy' },
  { value: '#8B4513', name: 'Brown' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const rupee = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

/* "mens-shirts" -> "Mens Shirts" */
const prettyCategory = (slug = '') =>
  slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

/* Convert a DummyJSON product into the shape the rest of this page / ProductCard expects */
const normalizeApiProduct = (p) => {
  const price = Math.round(p.price * USD_TO_INR);
  const discount = Number(p.discountPercentage) || 0;
  return {
    id: `api-${p.id}`,
    name: p.title,
    title: p.title,
    description: p.description,
    brand: p.brand,
    category: prettyCategory(p.category),
    price,
    originalPrice: discount > 0 ? Math.round(price / (1 - discount / 100)) : undefined,
    discount: discount > 0 ? Math.round(discount) : undefined,
    rating: p.rating,
    stock: p.stock,
    image: p.thumbnail,
    thumbnail: p.thumbnail,
    images: p.images?.length ? p.images : [p.thumbnail],
    sizes: [],
    colors: [],
    isSale: discount >= 10,
    isNew: false,
    isBestSeller: (p.rating || 0) >= 4.5,
    salesCount: p.reviews?.length || 0,
  };
};

/* small debounce hook */
const useDebouncedValue = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

/* ------------------------------ component ----------------------------- */
const ShopPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // sidebar visible
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletUp = useMediaQuery(theme.breakpoints.up('md'));

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [density, setDensity] = useState('normal'); // 'normal' | 'compact'
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState(() => new Set());
  const [toast, setToast] = useState(null);

  /* ---- search state ---- */
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(EMPTY);
  const [searchStatus, setSearchStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [retryKey, setRetryKey] = useState(0);
  const debouncedSearch = useDebouncedValue(searchText.trim(), SEARCH_DEBOUNCE_MS);
  const isSearching = searchText.trim().length > 0;

  const listTopRef = useRef(null);
  const searchInputRef = useRef(null);

  const storeProducts = useSelector(selectProducts) || EMPTY;
  const storeCategories = useSelector(selectCategories) || EMPTY;

  /* ------------------------- open product details ------------------------- */
  const openProduct = useCallback(
    (p) =>
      navigate(`/product/${encodeURIComponent(p.id ?? p._id)}`, {
        state: { product: p },
      }),
    [navigate]
  );

  /* --------------------------- live search (API) --------------------------- */
  useEffect(() => {
    if (!debouncedSearch) {
      setSearchResults(EMPTY);
      setSearchStatus('idle');
      return undefined;
    }

    const controller = new AbortController();
    setSearchStatus('loading');

    fetch(`${SEARCH_API}?q=${encodeURIComponent(debouncedSearch)}&limit=${SEARCH_LIMIT}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Search failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setSearchResults((data.products || []).map(normalizeApiProduct));
        setSearchStatus('success');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // a newer search replaced this one
        setSearchResults(EMPTY);
        setSearchStatus('error');
      });

    // cancels the old request when the user keeps typing
    return () => controller.abort();
  }, [debouncedSearch, retryKey]);

  // While searching, show API results; otherwise show the Redux store products
  const products = isSearching ? searchResults : storeProducts;
  const isLoadingSearch = isSearching && (searchStatus === 'loading' || searchText.trim() !== debouncedSearch);

  const clearSearch = useCallback(() => {
    setSearchText('');
    searchInputRef.current?.focus();
  }, []);

  /* ------------------------- filter options (derived) ------------------------- */
  const options = useMemo(() => {
    const counts = {};
    const colorMap = new Map();

    products.forEach((p) => {
      if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
      (p.colors || []).forEach((c) => {
        const value = typeof c === 'string' ? c : c.value;
        if (value && !colorMap.has(value)) colorMap.set(value, { value, name: c.name || value });
      });
    });

    const names =
      !isSearching && storeCategories.length ? storeCategories.map((c) => c.name) : Object.keys(counts).sort();

    return {
      categories: names.map((name) => ({ value: name, label: name, count: counts[name] || 0 })),
      sizes: SIZES,
      colors: colorMap.size ? [...colorMap.values()] : DEFAULT_COLORS,
      availability: AVAILABILITY_OPTIONS,
      ratings: [4, 3, 2],
    };
  }, [products, storeCategories, isSearching]);

  /* ------------------------------- handlers ------------------------------- */
  const toggleFilter = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name].includes(value) ? prev[name].filter((v) => v !== value) : [...prev[name], value],
    }));
  }, []);

  const setPriceRange = useCallback((range) => {
    setFilters((prev) => ({ ...prev, priceRange: range.map(Number) }));
  }, []);

  const setRating = useCallback((rating) => {
    setFilters((prev) => ({ ...prev, rating }));
  }, []);

  const clearGroup = useCallback((name) => {
    setFilters((prev) => ({
      ...prev,
      [name]: name === 'priceRange' ? [PRICE_MIN, PRICE_MAX] : name === 'rating' ? null : [],
    }));
  }, []);

  const clearAll = useCallback(() => setFilters({ ...DEFAULT_FILTERS, priceRange: [PRICE_MIN, PRICE_MAX] }), []);

  const toggleWish = useCallback((id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleAddToCart = useCallback((product) => {
    // TODO: dispatch(addToCart(product)) from your cart slice
    setToast(`${product.name ?? product.title} added to your bag`);
  }, []);

  /* --------------------------- filtering & sorting --------------------------- */
  const priceChanged = filters.priceRange[0] !== PRICE_MIN || filters.priceRange[1] !== PRICE_MAX;

  const activeCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    filters.availability.length +
    (priceChanged ? 1 : 0) +
    (filters.rating ? 1 : 0);

  const hasActiveFilters = activeCount > 0;

  const sortedProducts = useMemo(() => {
    const f = filters;
    const result = products.filter((p) => {
      if (f.categories.length && !f.categories.includes(p.category)) return false;
      if (p.price < f.priceRange[0] || p.price > f.priceRange[1]) return false;
      if (f.sizes.length && !f.sizes.some((s) => p.sizes?.includes(s))) return false;
      if (
        f.colors.length &&
        !f.colors.some((c) => p.colors?.some((col) => (typeof col === 'string' ? col : col.value) === c))
      )
        return false;
      if (f.rating && (p.rating || 0) < f.rating) return false;
      if (f.availability.includes('in-stock') && p.stock === 0) return false;
      if (f.availability.includes('on-sale') && !p.isSale) return false;
      if (f.availability.includes('new-arrivals') && !p.isNew) return false;
      if (f.availability.includes('bestsellers') && !p.isBestSeller) return false;
      return true;
    });

    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      newest: (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      'best-selling': (a, b) => (b.salesCount || 0) - (a.salesCount || 0),
      rating: (a, b) => (b.rating || 0) - (a.rating || 0),
    };
    return sorters[sortBy] ? [...result].sort(sorters[sortBy]) : result;
  }, [products, filters, sortBy]);

  /* -------------------------------- pagination -------------------------------- */
  useEffect(() => setPage(1), [filters, sortBy, debouncedSearch]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageItems = sortedProducts.slice(startIdx, startIdx + PAGE_SIZE);
  const rangeLabel = isLoadingSearch
    ? 'Searching…'
    : sortedProducts.length
      ? `Showing ${startIdx + 1} – ${startIdx + pageItems.length} of ${sortedProducts.length} results`
      : 'No results';

  const handlePageChange = (_, value) => {
    setPage(value);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ------------------------------- active chips ------------------------------- */
  const chips = [
    ...filters.categories.map((v) => ({ key: `c-${v}`, label: v, remove: () => toggleFilter('categories', v) })),
    ...filters.sizes.map((v) => ({ key: `s-${v}`, label: `Size: ${v}`, remove: () => toggleFilter('sizes', v) })),
    ...filters.colors.map((v) => ({
      key: `col-${v}`,
      label: `Colour: ${options.colors.find((c) => c.value === v)?.name || v}`,
      remove: () => toggleFilter('colors', v),
    })),
    ...filters.availability.map((v) => ({
      key: `a-${v}`,
      label: AVAILABILITY_OPTIONS.find((o) => o.value === v)?.label || v,
      remove: () => toggleFilter('availability', v),
    })),
    ...(priceChanged
      ? [
        {
          key: 'price',
          label: `${rupee(filters.priceRange[0])} – ${rupee(filters.priceRange[1])}`,
          remove: () => clearGroup('priceRange'),
        },
      ]
      : []),
    ...(filters.rating
      ? [{ key: 'rating', label: `${filters.rating}★ & above`, remove: () => clearGroup('rating') }]
      : []),
  ];

  /* -------------------------------- grid columns -------------------------------- */
  const gridColumns =
    viewMode === 'list'
      ? { xs: '1fr' }
      : density === 'compact'
        ? { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }
        : { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' };

  const filterPanel = (
    <FilterPanel
      filters={filters}
      options={options}
      priceBounds={{ min: PRICE_MIN, max: PRICE_MAX }}
      onToggle={toggleFilter}
      onPriceChange={setPriceRange}
      onRatingChange={setRating}
      onClearGroup={clearGroup}
    />
  );

  /* ---------------------------- empty-state copy ---------------------------- */
  const emptyTitle = isSearching
    ? searchStatus === 'error'
      ? 'Search is not working right now'
      : searchResults.length === 0
        ? `No products found for “${debouncedSearch}”`
        : 'Nothing matches these filters'
    : products.length === 0
      ? 'No products to show yet'
      : 'Nothing matches these filters';

  const emptyBody = isSearching
    ? searchStatus === 'error'
      ? 'Check your internet connection and try again.'
      : searchResults.length === 0
        ? 'Check the spelling or try a different word, like “shirt” or “watch”.'
        : 'Try widening the price range or removing a filter.'
    : products.length === 0
      ? 'Products will appear here once they have loaded.'
      : 'Try widening the price range or removing a filter.';

  /* ----------------------------------- render ----------------------------------- */
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: THEME.canvas, pb: { xs: 12, lg: 8 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 3, lg: 4 }, pt: { xs: 2, md: 3 } }}>
        {/* Heading */}
        <Breadcrumbs
          separator={<FiChevronRight size={13} />}
          sx={{ fontSize: 13, color: THEME.muted, mb: 1 }}
        >
          <Typography sx={{ fontSize: 13, color: THEME.muted }}>Home</Typography>
          <Typography sx={{ fontSize: 13, color: THEME.ink, fontWeight: 600 }}>
            {isSearching ? 'Search' : 'All products'}
          </Typography>
        </Breadcrumbs>

        <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
          <Typography
            component="h1"
            sx={{ fontFamily: '"Fraunces", "Playfair Display", Georgia, serif', fontWeight: 600, fontSize: { xs: 26, sm: 32, md: 38 }, color: THEME.ink, lineHeight: 1.15, overflowWrap: 'anywhere' }}
          >
            {isSearching ? `Results for “${searchText.trim()}”` : 'All products'}
          </Typography>
          <Typography sx={{ color: THEME.muted, mt: 0.5, fontSize: { xs: 13.5, md: 15 }, maxWidth: 560 }}>
            {isSearching
              ? 'Filter and sort these results the same way as the full collection.'
              : 'Browse the full collection. Narrow it down by price, size, colour and rating.'}
          </Typography>
        </Box>

        {/* Search box */}
        <Box sx={{ mb: { xs: 2, md: 2.5 } }}>
          <Paper
            component="div"
            role="search"
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: { md: 640 },
              height: { xs: 48, md: 52 },
              px: { xs: 1.5, md: 2 },
              gap: 1.25,
              bgcolor: THEME.surface,
              border: `1px solid ${THEME.line}`,
              borderRadius: '14px',
              transition: 'border-color .2s, box-shadow .2s',
              '&:focus-within': {
                borderColor: THEME.ink,
                boxShadow: '0 0 0 3px rgba(20,21,26,.08)',
              },
            }}
          >
            <FiSearch size={19} color={THEME.muted} style={{ flexShrink: 0 }} aria-hidden />
            <InputBase
              inputRef={searchInputRef}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchText('');
              }}
              placeholder="Search shirt, pants, t-shirt…"
              fullWidth
              inputProps={{ 'aria-label': 'Search products', enterKeyHint: 'search', autoComplete: 'off' }}
              sx={{ fontSize: { xs: 15, md: 16 }, color: THEME.ink, minWidth: 0 }}
            />
            {isLoadingSearch && <CircularProgress size={18} thickness={5} sx={{ color: THEME.ink, flexShrink: 0 }} />}
            {searchText && (
              <IconButton size="small" onClick={clearSearch} aria-label="Clear search" sx={{ bgcolor: THEME.soft, flexShrink: 0 }}>
                <FiX size={15} />
              </IconButton>
            )}
          </Paper>

          {/* Quick suggestions: single scrolling row on mobile */}
          {!isSearching && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 1.25,
                flexWrap: { xs: 'nowrap', md: 'wrap' },
                overflowX: { xs: 'auto', md: 'visible' },
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              <Typography sx={{ fontSize: 13, color: THEME.muted, flexShrink: 0 }}>Try:</Typography>
              {QUICK_SEARCHES.map((term) => (
                <Chip
                  key={term}
                  label={term}
                  size="small"
                  clickable
                  onClick={() => setSearchText(term)}
                  sx={{ bgcolor: THEME.surface, border: `1px solid ${THEME.line}`, fontWeight: 600, borderRadius: '8px', flexShrink: 0 }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Toolbar */}
        <Paper
          elevation={0}
          sx={{
            border: `1px solid ${THEME.line}`,
            borderRadius: '16px',
            bgcolor: THEME.surface,
            px: { xs: 1.5, md: 2.5 },
            py: { xs: 1.25, md: 0 },
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: { xs: 1, md: 2 },
            minHeight: { md: 60 },
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: { xs: 13.5, md: 15 }, color: THEME.ink, mr: 'auto' }} aria-live="polite">
            {rangeLabel}
          </Typography>

          {/* Sort — text tabs on large screens (Flipkart style), select on smaller */}
          {isDesktop ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} role="tablist" aria-label="Sort products">
              <Typography sx={{ fontWeight: 700, fontSize: 14, mr: 1 }}>Sort by</Typography>
              {SORT_OPTIONS.map((o) => {
                const on = sortBy === o.value;
                return (
                  <Button
                    key={o.value}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setSortBy(o.value)}
                    sx={{
                      textTransform: 'none',
                      fontSize: 14,
                      fontWeight: on ? 700 : 500,
                      color: on ? THEME.ink : THEME.muted,
                      borderRadius: 0,
                      height: 60,
                      px: 1.5,
                      borderBottom: `3px solid ${on ? THEME.ink : 'transparent'}`,
                      '&:hover': { bgcolor: 'transparent', color: THEME.ink },
                    }}
                  >
                    {o.label}
                  </Button>
                );
              })}
            </Box>
          ) : (
            <Select
              size="small"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              inputProps={{ 'aria-label': 'Sort products' }}
              sx={{ minWidth: { xs: 150, sm: 190 }, borderRadius: '10px', fontSize: 14 }}
            >
              {SORT_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          )}

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' }, my: 1.5 }} />

          <ToggleButtonGroup
            exclusive
            size="small"
            value={viewMode}
            onChange={(_, v) => v && setViewMode(v)}
            aria-label="View mode"
            sx={{ '& .MuiToggleButton-root': { border: `1px solid ${THEME.line}`, px: 1.2, '&.Mui-selected': { bgcolor: THEME.ink, color: '#fff', '&:hover': { bgcolor: '#2A2C35' } } } }}
          >
            <ToggleButton value="grid" aria-label="Grid view">
              <FiGrid size={16} />
            </ToggleButton>
            <ToggleButton value="list" aria-label="List view">
              <FiList size={16} />
            </ToggleButton>
          </ToggleButtonGroup>

          {isTabletUp && viewMode === 'grid' && (
            <Tooltip title={density === 'compact' ? 'Larger cards' : 'Compact cards'}>
              <IconButton
                onClick={() => setDensity((d) => (d === 'compact' ? 'normal' : 'compact'))}
                aria-label="Toggle card density"
                sx={{
                  border: `1px solid ${THEME.line}`,
                  borderRadius: '8px',
                  p: 0.9,
                  bgcolor: density === 'compact' ? THEME.ink : 'transparent',
                  color: density === 'compact' ? '#fff' : THEME.ink,
                  '&:hover': { bgcolor: density === 'compact' ? '#2A2C35' : THEME.soft },
                }}
              >
                {density === 'compact' ? <FiMaximize2 size={16} /> : <FiMinimize2 size={16} />}
              </IconButton>
            </Tooltip>
          )}
        </Paper>

        {/* Active filter chips: single scrolling row on mobile, wraps on desktop */}
        {hasActiveFilters && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
              flexWrap: { xs: 'nowrap', md: 'wrap' },
              overflowX: { xs: 'auto', md: 'visible' },
              pb: { xs: 0.5, md: 0 },
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            {chips.map((c) => (
              <Chip
                key={c.key}
                label={c.label}
                onDelete={c.remove}
                deleteIcon={<FiX size={14} />}
                sx={{ bgcolor: THEME.surface, border: `1px solid ${THEME.line}`, fontWeight: 600, borderRadius: '8px', flexShrink: 0 }}
              />
            ))}
            <Button
              size="small"
              startIcon={<FiRotateCcw size={14} />}
              onClick={clearAll}
              sx={{ textTransform: 'none', fontWeight: 700, color: THEME.accent, flexShrink: 0 }}
            >
              Clear all
            </Button>
          </Box>
        )}

        {/* Body */}
        <Box sx={{ display: 'flex', gap: { lg: 3, xl: 4 }, alignItems: 'flex-start' }}>
          {isDesktop && (
            <Box
              component="aside"
              sx={{
                width: sidebarMinimized ? 76 : 290,
                flexShrink: 0,
                position: 'sticky',
                top: 88,
                transition: 'width .3s cubic-bezier(.4,0,.2,1)',
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  border: `1px solid ${THEME.line}`,
                  borderRadius: '16px',
                  bgcolor: THEME.surface,
                  maxHeight: 'calc(100vh - 110px)',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  p: sidebarMinimized ? 1.5 : 2.5,
                  '&::-webkit-scrollbar': { width: 5 },
                  '&::-webkit-scrollbar-thumb': { bgcolor: '#D8D5CD', borderRadius: 4 },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: sidebarMinimized ? 'center' : 'space-between',
                    flexDirection: sidebarMinimized ? 'column' : 'row',
                    gap: 1,
                    mb: sidebarMinimized ? 0 : 1,
                  }}
                >
                  {sidebarMinimized ? (
                    <Badge color="success" variant="dot" invisible={!hasActiveFilters}>
                      <FiFilter size={20} />
                    </Badge>
                  ) : (
                    <Typography sx={{ fontWeight: 800, fontSize: 18, color: THEME.ink }}>
                      Filters{hasActiveFilters ? ` (${activeCount})` : ''}
                    </Typography>
                  )}
                  <Tooltip title={sidebarMinimized ? 'Expand filters' : 'Collapse filters'}>
                    <IconButton
                      size="small"
                      onClick={() => setSidebarMinimized((m) => !m)}
                      aria-label="Toggle filter sidebar"
                      sx={{ bgcolor: THEME.soft }}
                    >
                      {sidebarMinimized ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
                    </IconButton>
                  </Tooltip>
                </Box>
                {!sidebarMinimized && filterPanel}
              </Paper>
            </Box>
          )}

          <Box sx={{ flex: 1, minWidth: 0 }} ref={listTopRef} style={{ scrollMarginTop: 90 }}>
            {isLoadingSearch && pageItems.length === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 8, md: 12 }, gap: 2 }}>
                <CircularProgress size={32} sx={{ color: THEME.ink }} />
                <Typography sx={{ color: THEME.muted }}>Searching for “{searchText.trim()}”…</Typography>
              </Box>
            ) : pageItems.length === 0 ? (
              <Paper
                elevation={0}
                sx={{ border: `1px dashed ${THEME.line}`, borderRadius: '16px', textAlign: 'center', py: { xs: 6, md: 10 }, px: 2, bgcolor: THEME.surface }}
              >
                <Typography sx={{ fontWeight: 800, fontSize: { xs: 18, md: 20 }, color: THEME.ink, overflowWrap: 'anywhere' }}>
                  {emptyTitle}
                </Typography>
                <Typography sx={{ color: THEME.muted, mt: 1, mb: 3 }}>{emptyBody}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                  {isSearching && searchStatus === 'error' && (
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={() => setRetryKey((k) => k + 1)}
                      sx={{ bgcolor: THEME.ink, borderRadius: '10px', textTransform: 'none', fontWeight: 700, px: 3, '&:hover': { bgcolor: '#2A2C35' } }}
                    >
                      Try again
                    </Button>
                  )}
                  {isSearching && searchStatus !== 'error' && searchResults.length === 0 && (
                    <Button
                      variant="outlined"
                      onClick={clearSearch}
                      sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700, color: THEME.ink, borderColor: THEME.line, px: 3 }}
                    >
                      Clear search
                    </Button>
                  )}
                  {hasActiveFilters && (
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={clearAll}
                      sx={{ bgcolor: THEME.ink, borderRadius: '10px', textTransform: 'none', fontWeight: 700, px: 3, '&:hover': { bgcolor: '#2A2C35' } }}
                    >
                      Clear all filters
                    </Button>
                  )}
                </Box>
              </Paper>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: gridColumns,
                  gap: { xs: 1.25, sm: 2, lg: 2.5 },
                  opacity: isLoadingSearch ? 0.55 : 1,
                  transition: 'opacity .2s',
                }}
              >
                <AnimatePresence mode="popLayout">
                  {pageItems.map((p, i) => {
                    const id = p.id ?? p._id;
                    return (
                      <motion.div
                        key={id}
                        layout
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.25) }}
                        style={{ minWidth: 0 }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 1 }}>
                          <ProductCard
                            product={p}
                            variant={viewMode}
                            wished={wishlist.has(id)}
                            onToggleWish={toggleWish}
                            onAddToCart={handleAddToCart}
                          />

                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FiEye size={16} />}
                            onClick={() => openProduct(p)}
                            sx={{
                              borderRadius: '10px',
                              textTransform: 'none',
                              fontWeight: 700,
                              color: THEME.ink,
                              borderColor: THEME.line,
                              '&:hover': {
                                borderColor: THEME.ink,
                                bgcolor: THEME.soft,
                              },
                            }}
                          >
                            View
                          </Button>
                        </Box>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </Box>
            )}

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 6 } }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  size={isMobile ? 'small' : 'medium'}
                  siblingCount={isMobile ? 0 : 1}
                  shape="rounded"
                  sx={{
                    '& .MuiPaginationItem-root': { fontWeight: 600 },
                    '& .Mui-selected': { bgcolor: `${THEME.ink} !important`, color: '#fff' },
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile / tablet filter button */}
      {!isDesktop && (
        <Fab
          variant="extended"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open filters"
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24 },
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: THEME.ink,
            color: '#fff',
            textTransform: 'none',
            fontWeight: 700,
            px: 3,
            zIndex: 1200,
            boxShadow: '0 10px 28px rgba(20,21,26,.35)',
            '&:hover': { bgcolor: '#2A2C35' },
          }}
        >
          <FiFilter style={{ marginRight: 8 }} />
          Filters{hasActiveFilters ? ` · ${activeCount}` : ''}
        </Fab>
      )}

      {/* Filter drawer (mobile / tablet) */}
      <Drawer
        anchor="left"
        open={!isDesktop && drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '88%', sm: 400 }, maxWidth: 420, bgcolor: THEME.surface, display: 'flex', flexDirection: 'column' } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 2 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
            Filters{hasActiveFilters ? ` (${activeCount})` : ''}
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close filters">
            <FiX />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ flex: 1, overflowY: 'auto', px: 2.5, py: 1 }}>{filterPanel}</Box>
        <Divider />
        <Box sx={{ display: 'flex', gap: 1.5, p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            disabled={!hasActiveFilters}
            onClick={clearAll}
            sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700, color: THEME.ink, borderColor: THEME.line }}
          >
            Clear all
          </Button>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={() => setDrawerOpen(false)}
            sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700, bgcolor: THEME.ink, '&:hover': { bgcolor: '#2A2C35' } }}
          >
            Show {sortedProducts.length} results
          </Button>
        </Box>
      </Drawer>

      <Snackbar
        open={!!toast}
        autoHideDuration={2500}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: { xs: 84, lg: 24 } }}
      >
        <Alert onClose={() => setToast(null)} severity="success" variant="filled" sx={{ bgcolor: THEME.accent, fontWeight: 600 }}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShopPage;