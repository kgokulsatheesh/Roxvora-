import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Slider,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  FiArrowRight,
  FiChevronRight,
  FiFilter,
  FiHeart,
  FiImage,
  FiRefreshCw,
  FiStar,
  FiX,
} from 'react-icons/fi';

/* Adjust these import paths to match your project (same ones your
   ProductDetailsPage uses). */
import { THEME } from '../Shop/ProductCard';
import { selectProducts } from '../../../store/slices/productSlice';
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistItems,
} from '../../../store/slices/wishlistSlice';
import { SUB_CATEGORIES, slugify } from '../../CategoryMenu';
// FIX: peekCatalog was commented out but is used below -> it crashed the page.
import { loadCatalog, peekCatalog, getHero } from '../../../api/CatalogApi';

/* ------------------------------------------------------------------ */
/* Constants + helpers                                                 */
/* ------------------------------------------------------------------ */
const PAGE_SIZE = 24;
const EMPTY = [];
const GREEN = THEME.accent;
const DISPLAY_FONT =
  '"Archivo Black", "Arial Black", Impact, "Helvetica Neue", sans-serif';

const SORTS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'low', label: 'Price: Low to High' },
  { value: 'high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'discount', label: 'Discount' },
];

const DEFAULT_FILTERS = {
  price: null, // [min, max] or null = no limit
  brands: [],
  rating: 0,
  discount: 0,
  includeOutOfStock: false,
};

const rupee = (n) =>
  `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const normGroup = (s) => slugify(String(s)).replace(/s$/, ''); // womens -> women

const findCategoryLabel = (slug) =>
  Object.keys(SUB_CATEGORIES).find((label) => slugify(label) === slug);

const discountOf = (p) =>
  p.discount ||
  (p.originalPrice && p.originalPrice > p.price
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : 0);

const imageOf = (p) => p.image ?? p.thumbnail ?? p.images?.[0];

/* Your own store products that belong on this page */
const storeMatches = (storeProducts, categorySlug, subSlug, subSlugs) =>
  storeProducts.filter((p) => {
    if (!p?.category) return false;
    const catOk = subSlug
      ? slugify(String(p.category)) === subSlug
      : subSlugs.includes(slugify(String(p.category)));
    if (!catOk) return false;
    // If the product says which group it is for (Women / Men / Kids), respect it.
    const group = p.gender ?? p.section ?? p.department ?? p.audience;
    const isGroupPage = ['women', 'men', 'kids'].includes(normGroup(categorySlug));
    return !group || !isGroupPage || normGroup(group) === normGroup(categorySlug);
  });

/* ------------------------------------------------------------------ */
/* Hero helpers (new)                                                  */
/* ------------------------------------------------------------------ */
const productLink = (p) => `/product/${encodeURIComponent(p.id ?? p._id)}`;

/* One hero product + three different featured products */
const pickFeatured = (products) => {
  const withImage = products.filter((p) => imageOf(p));
  if (!withImage.length) return { hero: null, featured: [] };

  const used = new Set();
  const take = (sorted) => {
    const item = sorted.find((p) => !used.has(p.id ?? p._id));
    if (item) used.add(item.id ?? item._id);
    return item;
  };

  const byRating = [...withImage].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const byDiscount = [...withImage].sort((a, b) => discountOf(b) - discountOf(a));
  const byNewest = [...withImage].sort(
    (a, b) => new Date(b.meta?.createdAt || 0) - new Date(a.meta?.createdAt || 0),
  );

  const hero = take(byRating);
  const featured = [
    { tag: 'Top rated', item: take(byRating) },
    { tag: 'Biggest saving', item: take(byDiscount) },
    { tag: 'Just in', item: take(byNewest) },
  ].filter((entry) => entry.item);

  return { hero, featured };
};

const computeStats = (products) => {
  if (!products.length) return [];
  const rated = products.filter((p) => p.rating > 0);
  const avg = rated.length
    ? rated.reduce((sum, p) => sum + p.rating, 0) / rated.length
    : 0;
  const brands = new Set(products.map((p) => p.brand).filter(Boolean));
  const maxDiscount = Math.max(0, ...products.map(discountOf));
  return [
    { value: `${products.length}+`, label: 'Products in this collection' },
    { value: avg ? avg.toFixed(1) : '–', label: 'Average customer rating' },
    { value: String(brands.size || 1), label: 'Brands to choose from' },
    { value: `${maxDiscount}%`, label: 'Biggest discount right now' },
  ];
};

/* ------------------------------------------------------------------ */
/* Hero section: giant word + product image + overlapping cards + stats */
/* ------------------------------------------------------------------ */
const CategoryHero = memo(function CategoryHero({
  design,
  products,
  loading,
  headline,
  onShop,
}) {
  const { hero, featured } = useMemo(() => pickFeatured(products), [products]);
  const stats = useMemo(() => computeStats(products), [products]);
  const [top, mid, bottom] = design.gradient;
  const heroSrc = hero ? imageOf(hero) : null;

  return (
    <Box component="section" aria-labelledby="category-hero-title" sx={{ mb: { xs: 3, md: 5 } }}>
      {/* ---------------- Hero panel ---------------- */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
          borderRadius: { xs: '20px', md: '28px' },
          background: `linear-gradient(180deg, ${top} 0%, ${mid} 70%, ${bottom} 100%)`,
          minHeight: { xs: 540, md: 660 },
          pb: { xs: 13, md: 19 },
        }}
      >
        {/* Giant word behind the product (decorative) */}
        <Typography
          aria-hidden="true"
          component="div"
          sx={{
            position: 'absolute',
            top: { xs: '3%', md: '2%' },
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: DISPLAY_FONT,
            fontSize: 'clamp(4.5rem, 22vw, 20rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.95)',
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {design.display}
        </Typography>

        <Box
          sx={{
            position: 'relative',
            px: { xs: 2, sm: 4, lg: 6 },
            pt: { xs: '24vw', sm: '20vw', md: 'min(15vw, 15rem)' },
            display: 'grid',
            gap: { xs: 2, md: 4 },
            gridTemplateColumns: { xs: 'minmax(0,1fr)', md: 'minmax(0,5fr) minmax(0,6fr)' },
            alignItems: 'center',
          }}
        >
          <Box sx={{ order: { xs: 2, md: 1 }, maxWidth: 560 }}>
            <Typography
              id="category-hero-title"
              component="p"
              sx={{
                fontFamily: DISPLAY_FONT,
                fontSize: 'clamp(1.7rem, 3.8vw, 3.1rem)',
                lineHeight: 1.08,
                mb: 2,
              }}
            >
              {headline}
            </Typography>
            <Typography
              sx={{ opacity: 0.92, maxWidth: 460, mb: 3, fontSize: { xs: 14.5, md: 16 }, lineHeight: 1.6 }}
            >
              {design.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button
                onClick={onShop}
                variant="contained"
                disableElevation
                endIcon={<FiArrowRight size={16} />}
                sx={{
                  bgcolor: '#fff',
                  color: THEME.ink,
                  borderRadius: '999px',
                  px: 3,
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 700,
                  '&:hover': { bgcolor: 'rgba(255,255,255,.88)' },
                }}
              >
                Shop the collection
              </Button>
              {hero && (
                <Button
                  component={RouterLink}
                  to={productLink(hero)}
                  state={{ product: hero }}
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,.6)',
                    borderRadius: '999px',
                    px: 3,
                    py: 1.2,
                    textTransform: 'none',
                    fontWeight: 700,
                    '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,.1)' },
                  }}
                >
                  See top pick
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ order: { xs: 1, md: 2 }, display: 'grid', placeItems: 'center' }}>
            {loading || !heroSrc ? (
              <Skeleton
                variant="rounded"
                sx={{
                  bgcolor: 'rgba(255,255,255,.18)',
                  width: { xs: '70%', md: '60%' },
                  height: { xs: 250, sm: 330, md: 460 },
                  borderRadius: '20px',
                }}
              />
            ) : (
              <Box
                component="img"
                src={heroSrc}
                alt={hero.name ?? hero.title}
                decoding="async"
                sx={{
                  width: 'auto',
                  maxWidth: '100%',
                  height: { xs: 270, sm: 350, md: 480 },
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 30px 40px rgba(0,0,0,.35))',
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* ---------------- Featured cards overlapping the hero ---------------- */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          mt: { xs: -9, md: -13 },
          px: { xs: 1, sm: 2, md: 4 },
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: 'minmax(0,1fr)',
            sm: 'repeat(2, minmax(0,1fr))',
            md: 'repeat(3, minmax(0,1fr))',
          },
        }}
      >
        {loading
          ? [0, 1, 2].map((i) => (
              <Skeleton key={i} variant="rounded" height={160} sx={{ borderRadius: '20px' }} />
            ))
          : featured.map(({ tag, item }) => (
              <Paper
                key={item.id ?? item._id}
                component={RouterLink}
                to={productLink(item)}
                state={{ product: item }}
                elevation={0}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) 130px',
                  gap: 1,
                  alignItems: 'center',
                  p: 2,
                  minHeight: 160,
                  borderRadius: '20px',
                  textDecoration: 'none',
                  color: THEME.ink,
                  bgcolor: THEME.surface,
                  border: `1px solid ${THEME.line}`,
                  boxShadow: '0 20px 40px -18px rgba(20,21,26,.3)',
                  transition: 'transform .2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                  '&:focus-visible': { outline: `2px solid ${design.accent}`, outlineOffset: 2 },
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ color: design.accent, fontWeight: 800, fontSize: 12.5 }}>
                    {tag}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.25,
                      mb: 0.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.name ?? item.title}
                  </Typography>
                  <Typography sx={{ color: THEME.muted, fontSize: 14 }}>{rupee(item.price)}</Typography>
                  <Box sx={{ mt: 1, color: design.accent, display: 'flex' }}>
                    <FiArrowRight size={18} />
                  </Box>
                </Box>
                <Box
                  component="img"
                  src={imageOf(item)}
                  alt={item.name ?? item.title}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: 124,
                    objectFit: 'contain',
                    borderRadius: '14px',
                    bgcolor: THEME.soft,
                  }}
                />
              </Paper>
            ))}
      </Box>

      {/* ---------------- Stats ---------------- */}
      <Box
        sx={{
          mt: { xs: 3.5, md: 5 },
          px: { xs: 1, md: 4 },
          display: 'grid',
          gap: { xs: 2.5, md: 2 },
          gridTemplateColumns: { xs: 'repeat(2, minmax(0,1fr))', md: 'repeat(4, minmax(0,1fr))' },
        }}
      >
        {(loading ? [0, 1, 2, 3] : stats).map((stat, index) =>
          loading ? (
            <Skeleton key={index} variant="rounded" height={60} />
          ) : (
            <Box key={stat.label}>
              <Typography
                sx={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: { xs: 26, md: 34 },
                  lineHeight: 1.1,
                  color: THEME.ink,
                }}
              >
                {stat.value}
              </Typography>
              <Typography sx={{ color: THEME.muted, fontSize: 13.5 }}>{stat.label}</Typography>
            </Box>
          ),
        )}
      </Box>
    </Box>
  );
});

/* ------------------------------------------------------------------ */
/* Image mosaic: "most loved" (new)                                    */
/* ------------------------------------------------------------------ */
const CategoryGallery = memo(function CategoryGallery({ items, accent, label }) {
  if (items.length < 5) return null;
  return (
    <Box component="section" sx={{ mt: { xs: 6, md: 9 } }}>
      <Typography
        component="h2"
        sx={{ fontFamily: DISPLAY_FONT, fontSize: { xs: 24, md: 34 }, mb: 2.5, color: THEME.ink }}
      >
        Most loved in {label.toLowerCase()}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 1, md: 2 },
          gridTemplateColumns: { xs: 'repeat(2, minmax(0,1fr))', md: 'repeat(4, minmax(0,1fr))' },
          gridAutoRows: { xs: 160, sm: 220, md: 240 },
        }}
      >
        {items.map((item, index) => (
          <Box
            key={item.id ?? item._id}
            component={RouterLink}
            to={productLink(item)}
            state={{ product: item }}
            aria-label={item.name ?? item.title}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '16px',
              bgcolor: THEME.soft,
              gridColumn: { xs: index === 0 ? 'span 2' : 'auto', md: index === 0 ? 'span 2' : 'auto' },
              gridRow: { md: index === 0 ? 'span 2' : 'auto' },
              '&:hover img': { transform: 'scale(1.05)' },
              '&:focus-visible': { outline: `2px solid ${accent}`, outlineOffset: 2 },
            }}
          >
            <Box
              component="img"
              src={item.images?.[1] ?? imageOf(item)}
              alt={item.name ?? item.title}
              loading="lazy"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                p: 2,
                transition: 'transform .4s',
                '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
});

/* ------------------------------------------------------------------ */
/* Story block (new)                                                   */
/* ------------------------------------------------------------------ */
const CategoryStory = memo(function CategoryStory({ design, product }) {
  if (!product) return null;
  return (
    <Box
      component="section"
      sx={{
        mt: { xs: 7, md: 11 },
        display: 'grid',
        gap: { xs: 3, md: 6 },
        alignItems: 'center',
        gridTemplateColumns: { xs: 'minmax(0,1fr)', md: 'minmax(0,1fr) minmax(0,1.2fr)' },
      }}
    >
      <Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: DISPLAY_FONT,
            fontSize: { xs: 30, md: 46 },
            lineHeight: 1.05,
            mb: 2,
            color: THEME.ink,
          }}
        >
          {design.story.title}
        </Typography>
        <Typography sx={{ color: THEME.muted, maxWidth: 440, mb: 3, lineHeight: 1.7 }}>
          {design.story.text}
        </Typography>
        <Button
          component={RouterLink}
          to={productLink(product)}
          state={{ product }}
          variant="contained"
          disableElevation
          endIcon={<FiArrowRight size={16} />}
          sx={{
            bgcolor: THEME.ink,
            borderRadius: '999px',
            px: 3,
            py: 1.2,
            textTransform: 'none',
            fontWeight: 700,
            '&:hover': { bgcolor: '#2A2C35' },
          }}
        >
          See the details
        </Button>
      </Box>
      <Box
        sx={{
          borderRadius: { xs: '20px', md: '28px' },
          overflow: 'hidden',
          bgcolor: THEME.soft,
          display: 'grid',
          placeItems: 'center',
          minHeight: { xs: 260, md: 420 },
        }}
      >
        <Box
          component="img"
          src={imageOf(product)}
          alt={product.name ?? product.title}
          loading="lazy"
          sx={{ width: '100%', maxHeight: { xs: 320, md: 480 }, objectFit: 'contain', p: 3 }}
        />
      </Box>
    </Box>
  );
});

/* ------------------------------------------------------------------ */
/* Product card (Flipkart-style)                                       */
/* ------------------------------------------------------------------ */
const ProductCard = memo(function ProductCard({ product, wished, onToggleWish }) {
  const [failed, setFailed] = useState(false);
  const pid = product.id ?? product._id;
  const pct = discountOf(product);
  const src = imageOf(product);
  // NEW: second photo shown on hover (desktop only)
  const hoverSrc = product.images?.[1] && product.images[1] !== src ? product.images[1] : null;

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: THEME.surface,
        border: `1px solid ${THEME.line}`,
        borderRadius: { xs: '12px', md: '14px' },
        overflow: 'hidden',
        transition: 'box-shadow .2s, transform .2s',
        '&:hover': { boxShadow: '0 8px 24px rgba(20,21,26,.10)' },
        '@media (hover: hover)': {
          '&:hover .card-alt': { opacity: 1 },
        },
      }}
    >
      <IconButton
        size="small"
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={wished}
        onClick={() => onToggleWish(product)}
        sx={{
          position: 'absolute',
          top: 6,
          right: 6,
          zIndex: 2,
          bgcolor: 'rgba(255,255,255,.95)',
          '&:hover': { bgcolor: '#fff' },
        }}
      >
        <FiHeart
          size={16}
          color={wished ? THEME.danger : THEME.ink}
          fill={wished ? THEME.danger : 'none'}
        />
      </IconButton>

      <Box
        component={RouterLink}
        to={`/product/${encodeURIComponent(pid)}`}
        state={{ product }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          color: 'inherit',
          textDecoration: 'none',
          WebkitTapHighlightColor: 'transparent',
          '&:focus-visible': { outline: `2px solid ${THEME.ink}`, outlineOffset: -2 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '4 / 5',
            bgcolor: THEME.soft,
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
          }}
        >
          {src && !failed ? (
            <img
              src={src}
              alt={product.name ?? product.title}
              loading="lazy"
              onError={() => setFailed(true)}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <Box sx={{ color: THEME.muted, textAlign: 'center' }}>
              <FiImage size={28} />
            </Box>
          )}

          {hoverSrc && !failed && (
            <Box
              component="img"
              className="card-alt"
              src={hoverSrc}
              alt=""
              aria-hidden="true"
              loading="lazy"
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                bgcolor: THEME.soft,
                opacity: 0,
                transition: 'opacity .3s',
                '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
              }}
            />
          )}
        </Box>

        <Box sx={{ p: { xs: 1.25, md: 1.75 }, display: 'flex', flexDirection: 'column', gap: 0.4, flex: 1 }}>
          {product.brand && (
            <Typography noWrap sx={{ fontSize: 12, fontWeight: 700, color: THEME.muted }}>
              {product.brand}
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: { xs: 13, md: 14 },
              fontWeight: 600,
              color: THEME.ink,
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.7em',
            }}
          >
            {product.name ?? product.title}
          </Typography>

          {product.rating > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.4,
                  bgcolor: GREEN,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 11.5,
                  px: 0.8,
                  borderRadius: '6px',
                  lineHeight: 1.7,
                }}
              >
                {Number(product.rating).toFixed(1)}
                <FiStar size={10} style={{ fill: '#fff' }} />
              </Box>
              {product.ratingCount > 0 && (
                <Typography sx={{ fontSize: 12, color: THEME.muted }}>
                  ({product.ratingCount})
                </Typography>
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.9, flexWrap: 'wrap', mt: 'auto', pt: 0.5 }}>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: 15, md: 16 }, color: THEME.ink }}>
              {rupee(product.price)}
            </Typography>
            {pct > 0 && product.originalPrice > product.price && (
              <>
                <Typography
                  sx={{ fontSize: 12.5, color: THEME.muted, textDecoration: 'line-through' }}
                >
                  {rupee(product.originalPrice)}
                </Typography>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: GREEN }}>
                  {pct}% off
                </Typography>
              </>
            )}
          </Box>

          {product.stock !== undefined && product.stock <= 0 ? (
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#c62828' }}>
              Out of stock
            </Typography>
          ) : product.stock !== undefined && product.stock <= 5 ? (
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#c62828' }}>
              Only {product.stock} left
            </Typography>
          ) : (
            <Typography sx={{ fontSize: 12, color: THEME.muted }}>
              {product.price >= 500 ? 'Free delivery' : 'Delivery fee applies'}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
});

const CardSkeleton = () => (
  <Paper elevation={0} sx={{ border: `1px solid ${THEME.line}`, borderRadius: '14px', overflow: 'hidden' }}>
    <Skeleton variant="rectangular" sx={{ aspectRatio: '4 / 5', width: '100%', height: 'auto' }} />
    <Box sx={{ p: 1.5 }}>
      <Skeleton width="85%" />
      <Skeleton width="55%" />
      <Skeleton width="40%" height={28} />
    </Box>
  </Paper>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
const CategoryPage = () => {
  const { category: categorySlug = '', sub: subSlug } = useParams();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();

  const storeProducts = useSelector(selectProducts) || EMPTY;
  const wishlistItems = useSelector(selectWishlistItems) || EMPTY;

  const categoryLabel = findCategoryLabel(categorySlug);
  const subs = categoryLabel ? SUB_CATEGORIES[categoryLabel] : EMPTY;
  const subLabel = subs.find((s) => slugify(s) === subSlug);
  const valid = Boolean(categoryLabel) && (!subSlug || Boolean(subLabel));
  const pageKey = `${categorySlug}/${subSlug || ''}`;

  /* ---- data: cached pages show instantly, others show skeletons ---- */
  const cached = valid ? peekCatalog(categorySlug, subSlug) : undefined;
  const [remote, setRemote] = useState(null); // { key, data } | { key, error }
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!valid || peekCatalog(categorySlug, subSlug)) return undefined;
    let stale = false;
    loadCatalog(categorySlug, subSlug)
      .then((data) => !stale && setRemote({ key: pageKey, data }))
      .catch(() => !stale && setRemote({ key: pageKey, error: true }));
    return () => {
      stale = true;
    };
  }, [valid, categorySlug, subSlug, pageKey, retryKey]);

  const data = cached ?? (remote?.key === pageKey ? remote.data : undefined);
  const failed = !cached && remote?.key === pageKey && remote.error;
  const loading = valid && !data && !failed;

  /* ---- merge your own store products with the API products ---- */
  const products = useMemo(() => {
    if (!valid) return EMPTY;
    const own = storeMatches(storeProducts, categorySlug, subSlug, subs.map(slugify));
    const seen = new Set(own.map((p) => String(p.id ?? p._id)));
    const api = (data?.products || EMPTY).filter((p) => !seen.has(String(p.id)));
    return [...own, ...api];
  }, [valid, storeProducts, categorySlug, subSlug, subs, data]);

  /* ---- filters / sort / page ---- */
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  useEffect(() => {
    setFilters(DEFAULT_FILTERS);
    setSort('relevance');
    setPage(1);
    setFilterOpen(false);
    setSortOpen(false);
    setShowAllBrands(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pageKey]);

  const bounds = useMemo(() => {
    if (!products.length) return [0, 1000];
    const prices = products.map((p) => Number(p.price) || 0);
    return [
      Math.floor(Math.min(...prices) / 100) * 100,
      Math.ceil(Math.max(...prices) / 100) * 100,
    ];
  }, [products]);

  const [priceDraft, setPriceDraft] = useState(bounds);
  useEffect(() => setPriceDraft(filters.price || bounds), [bounds, filters.price]);

  const brands = useMemo(() => {
    const counts = new Map();
    products.forEach((p) => p.brand && counts.set(p.brand, (counts.get(p.brand) || 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [products]);

  const results = useMemo(() => {
    const list = products.filter((p) => {
      if (filters.price && (p.price < filters.price[0] || p.price > filters.price[1])) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if ((p.rating || 0) < filters.rating) return false;
      if (discountOf(p) < filters.discount) return false;
      if (!filters.includeOutOfStock && p.stock !== undefined && p.stock <= 0) return false;
      return true;
    });
    if (sort === 'low') list.sort((a, b) => a.price - b.price);
    if (sort === 'high') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === 'discount') list.sort((a, b) => discountOf(b) - discountOf(a));
    return list;
  }, [products, filters, sort]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const activeFilterCount =
    (filters.price ? 1 : 0) +
    filters.brands.length +
    (filters.rating ? 1 : 0) +
    (filters.discount ? 1 : 0) +
    (filters.includeOutOfStock ? 1 : 0);

  const patchFilters = (patch) => {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  };

  /* ---- wishlist ---- */
  const wishedIds = useMemo(
    () => new Set(wishlistItems.map((w) => String(w.id))),
    [wishlistItems],
  );
  const toggleWish = useCallback(
    (p) => {
      const pid = p.id ?? p._id;
      if (wishedIds.has(String(pid))) dispatch(removeFromWishlist(pid));
      else
        dispatch(
          addToWishlist({
            id: pid,
            name: p.name ?? p.title,
            price: p.price,
            image: imageOf(p),
            category: p.category,
          }),
        );
    },
    [dispatch, wishedIds],
  );

  /* ---- NEW: hero / gallery / story data (hooks stay above the early return) ---- */
  const design = useMemo(() => getHero(categorySlug), [categorySlug]);

  const galleryItems = useMemo(
    () =>
      [...products]
        .filter((p) => imageOf(p))
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5),
    [products],
  );

  const storyProduct = useMemo(() => {
    const ranked = [...products]
      .filter((p) => imageOf(p))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return ranked[1] || ranked[0] || null;
  }, [products]);

  const scrollToProducts = useCallback(() => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (!valid) return <Navigate to="/shop" replace />;

  const base = `/shop/${categorySlug}`;
  const title = subLabel ? `${categoryLabel} · ${subLabel}` : `All ${categoryLabel}`;
  const heroHeadline = subLabel ? `${subLabel} in ${categoryLabel}` : design.headline;

  /* ------------------------- filter panel ------------------------- */
  const sectionTitle = (text) => (
    <Typography sx={{ fontWeight: 800, fontSize: 13.5, color: THEME.ink, mb: 1, letterSpacing: 0.2 }}>
      {text}
    </Typography>
  );

  const filterPanel = (
    <Box sx={{ display: 'grid', gap: 2.5 }}>
      <Box>
        {sectionTitle('Price')}
        <Box sx={{ px: 1.25 }}>
          <Slider
            value={priceDraft}
            min={bounds[0]}
            max={bounds[1]}
            step={100}
            onChange={(_, v) => setPriceDraft(v)}
            onChangeCommitted={(_, v) =>
              patchFilters({ price: v[0] === bounds[0] && v[1] === bounds[1] ? null : v })
            }
            valueLabelDisplay="auto"
            valueLabelFormat={rupee}
            disableSwap
            sx={{ color: THEME.ink }}
            getAriaLabel={() => 'Price range'}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 12.5, color: THEME.muted }}>{rupee(priceDraft[0])}</Typography>
          <Typography sx={{ fontSize: 12.5, color: THEME.muted }}>{rupee(priceDraft[1])}</Typography>
        </Box>
      </Box>

      {brands.length > 0 && (
        <>
          <Divider />
          <Box>
            {sectionTitle('Brand')}
            <Box sx={{ display: 'grid' }}>
              {(showAllBrands ? brands : brands.slice(0, 8)).map(([brand, count]) => (
                <FormControlLabel
                  key={brand}
                  sx={{ m: 0, '& .MuiFormControlLabel-label': { fontSize: 13.5, minWidth: 0 } }}
                  control={
                    <Checkbox
                      size="small"
                      checked={filters.brands.includes(brand)}
                      onChange={(e) =>
                        patchFilters({
                          brands: e.target.checked
                            ? [...filters.brands, brand]
                            : filters.brands.filter((b) => b !== brand),
                        })
                      }
                      sx={{ color: THEME.muted, '&.Mui-checked': { color: THEME.ink } }}
                    />
                  }
                  label={`${brand} (${count})`}
                />
              ))}
            </Box>
            {brands.length > 8 && (
              <Button
                size="small"
                onClick={() => setShowAllBrands((v) => !v)}
                sx={{ textTransform: 'none', fontWeight: 700, color: GREEN, px: 0.5 }}
              >
                {showAllBrands ? 'Show less' : `Show ${brands.length - 8} more`}
              </Button>
            )}
          </Box>
        </>
      )}

      <Divider />
      <Box>
        {sectionTitle('Customer ratings')}
        <RadioGroup
          value={String(filters.rating)}
          onChange={(e) => patchFilters({ rating: Number(e.target.value) })}
        >
          {[
            [0, 'All ratings'],
            [4, '4★ & above'],
            [3, '3★ & above'],
            [2, '2★ & above'],
          ].map(([value, label]) => (
            <FormControlLabel
              key={value}
              value={String(value)}
              sx={{ m: 0, '& .MuiFormControlLabel-label': { fontSize: 13.5 } }}
              control={<Radio size="small" sx={{ color: THEME.muted, '&.Mui-checked': { color: THEME.ink } }} />}
              label={label}
            />
          ))}
        </RadioGroup>
      </Box>

      <Divider />
      <Box>
        {sectionTitle('Discount')}
        <RadioGroup
          value={String(filters.discount)}
          onChange={(e) => patchFilters({ discount: Number(e.target.value) })}
        >
          {[
            [0, 'Any discount'],
            [5, '5% or more'],
            [10, '10% or more'],
            [15, '15% or more'],
          ].map(([value, label]) => (
            <FormControlLabel
              key={value}
              value={String(value)}
              sx={{ m: 0, '& .MuiFormControlLabel-label': { fontSize: 13.5 } }}
              control={<Radio size="small" sx={{ color: THEME.muted, '&.Mui-checked': { color: THEME.ink } }} />}
              label={label}
            />
          ))}
        </RadioGroup>
      </Box>

      <Divider />
      <FormControlLabel
        sx={{ m: 0, justifyContent: 'space-between', '& .MuiFormControlLabel-label': { fontSize: 13.5 } }}
        labelPlacement="start"
        control={
          <Switch
            size="small"
            checked={filters.includeOutOfStock}
            onChange={(e) => patchFilters({ includeOutOfStock: e.target.checked })}
          />
        }
        label="Include out of stock"
      />
    </Box>
  );

  const clearAll = (
    <Button
      onClick={() => {
        setFilters(DEFAULT_FILTERS);
        setPage(1);
      }}
      disabled={!activeFilterCount}
      sx={{ textTransform: 'none', fontWeight: 700, color: GREEN }}
    >
      Clear all
    </Button>
  );

  /* ------------------------------ UI ------------------------------ */
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: THEME.canvas, pb: { xs: 10, md: 6 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1600, px: { xs: 1.5, sm: 3, lg: 4 }, pt: { xs: 1.5, md: 3 } }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<FiChevronRight size={13} color={THEME.muted} />}
          aria-label="Breadcrumb"
          sx={{ mb: 1.5, '& ol': { flexWrap: 'nowrap', overflow: 'hidden' } }}
        >
          <Typography component={RouterLink} to="/" sx={{ fontSize: 13, color: THEME.muted, textDecoration: 'none' }}>
            Home
          </Typography>
          <Typography component={RouterLink} to="/shop" sx={{ fontSize: 13, color: THEME.muted, textDecoration: 'none' }}>
            Shop
          </Typography>
          {subSlug ? (
            <Typography component={RouterLink} to={base} sx={{ fontSize: 13, color: THEME.muted, textDecoration: 'none' }}>
              {categoryLabel}
            </Typography>
          ) : null}
          <Typography noWrap sx={{ fontSize: 13, color: THEME.ink, fontWeight: 600 }}>
            {subLabel || categoryLabel}
          </Typography>
        </Breadcrumbs>

        {/* NEW: modern hero with related images, featured cards and stats */}
        <CategoryHero
          design={design}
          products={products}
          loading={loading}
          headline={heroHeadline}
          onShop={scrollToProducts}
        />

        {/* Sub-category chips: swipe on phones, wrap on desktop */}
        <Box
          component="nav"
          aria-label={`${categoryLabel} subcategories`}
          sx={{
            display: 'flex',
            gap: 1,
            mb: 2,
            overflowX: { xs: 'auto', md: 'visible' },
            flexWrap: { xs: 'nowrap', md: 'wrap' },
            pb: { xs: 0.5, md: 0 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {[{ label: 'All', to: base, on: !subSlug }, ...subs.map((s) => ({ label: s, to: `${base}/${slugify(s)}`, on: slugify(s) === subSlug }))].map(
            (chip) => (
              <Box
                key={chip.label}
                component={RouterLink}
                to={chip.to}
                aria-current={chip.on ? 'page' : undefined}
                sx={{
                  flexShrink: 0,
                  px: 2,
                  py: 0.9,
                  minHeight: 36,
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: '999px',
                  fontSize: 13.5,
                  fontWeight: 600,
                  textDecoration: 'none',
                  touchAction: 'manipulation',
                  color: chip.on ? '#fff' : THEME.ink,
                  bgcolor: chip.on ? THEME.ink : THEME.surface,
                  border: `1px solid ${chip.on ? THEME.ink : THEME.line}`,
                  '&:hover': { borderColor: THEME.ink },
                }}
              >
                {chip.label}
              </Box>
            ),
          )}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0,1fr)', md: '240px minmax(0,1fr)', lg: '270px minmax(0,1fr)' }, gap: { md: 2.5, lg: 3 }, alignItems: 'start' }}>
          {/* ---------------- Desktop filter sidebar ---------------- */}
          {isMdUp && (
            <Paper
              elevation={0}
              component="aside"
              aria-label="Filters"
              sx={{
                position: 'sticky',
                top: 88,
                maxHeight: 'calc(100vh - 104px)',
                overflowY: 'auto',
                bgcolor: THEME.surface,
                border: `1px solid ${THEME.line}`,
                borderRadius: '14px',
                p: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 17 }}>Filters</Typography>
                {clearAll}
              </Box>
              {filterPanel}
            </Paper>
          )}

          {/* ---------------- Results ---------------- */}
          <Box component="main" id="products" sx={{ minWidth: 0, scrollMarginTop: 88 }}>
            <Paper
              elevation={0}
              sx={{ bgcolor: THEME.surface, border: `1px solid ${THEME.line}`, borderRadius: '14px', p: { xs: 1.75, md: 2.25 }, mb: 2 }}
            >
              <Typography
                component="h1"
                sx={{
                  fontFamily: '"Fraunces", "Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: { xs: 22, sm: 26, md: 30 },
                  color: THEME.ink,
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Typography>
              <Typography sx={{ color: THEME.muted, fontSize: 13.5, mt: 0.5 }} aria-live="polite">
                {loading
                  ? 'Loading products…'
                  : results.length
                    ? `Showing ${(safePage - 1) * PAGE_SIZE + 1}–${(safePage - 1) * PAGE_SIZE + visible.length} of ${results.length} products`
                    : '0 products'}
              </Typography>

              {/* Desktop sort row (Flipkart style) */}
              {isMdUp && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mt: 1.75, flexWrap: 'wrap' }}>
                  <Typography sx={{ fontWeight: 800, fontSize: 13.5 }}>Sort by</Typography>
                  {SORTS.map((s) => (
                    <Box
                      key={s.value}
                      component="button"
                      type="button"
                      onClick={() => {
                        setSort(s.value);
                        setPage(1);
                      }}
                      aria-pressed={sort === s.value}
                      sx={{
                        all: 'unset',
                        cursor: 'pointer',
                        fontSize: 13.5,
                        fontWeight: sort === s.value ? 800 : 500,
                        color: sort === s.value ? GREEN : THEME.ink,
                        borderBottom: `2px solid ${sort === s.value ? GREEN : 'transparent'}`,
                        pb: 0.4,
                        '&:focus-visible': { outline: `2px solid ${THEME.ink}`, outlineOffset: 3 },
                      }}
                    >
                      {s.label}
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>

            {data?.approximate && (
              <Alert severity="info" sx={{ mb: 2, borderRadius: '12px' }}>
                The free demo catalogue has no exact {subLabel || categoryLabel} products yet, so these are the
                closest matches. Connect your own product API for real items.
              </Alert>
            )}
            {data?.note && (
              <Alert severity="info" sx={{ mb: 2, borderRadius: '12px' }}>
                {data.note}
              </Alert>
            )}

            {failed && (
              <Paper elevation={0} sx={{ border: `1px dashed ${THEME.line}`, borderRadius: '14px', p: 5, textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 1 }}>Could not load products</Typography>
                <Typography sx={{ color: THEME.muted, mb: 2.5 }}>Check your internet connection and try again.</Typography>
                <Button
                  variant="contained"
                  disableElevation
                  startIcon={<FiRefreshCw size={16} />}
                  onClick={() => {
                    setRemote(null);
                    setRetryKey((k) => k + 1);
                  }}
                  sx={{ bgcolor: THEME.ink, borderRadius: '12px', textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#2A2C35' } }}
                >
                  Try again
                </Button>
              </Paper>
            )}

            {/* Grid: 2 cols phone, 3 tablet, 3 laptop (with sidebar), 4 desktop, 5 large desktop */}
            {!failed && (
              <Box
                sx={{
                  display: 'grid',
                  gap: { xs: 1, sm: 1.5, md: 2 },
                  gridTemplateColumns: {
                    xs: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(3, minmax(0, 1fr))',
                    md: 'repeat(3, minmax(0, 1fr))',
                    lg: 'repeat(4, minmax(0, 1fr))',
                    xl: 'repeat(5, minmax(0, 1fr))',
                  },
                }}
              >
                {visible.map((p) => (
                  <ProductCard
                    key={p.id ?? p._id}
                    product={p}
                    wished={wishedIds.has(String(p.id ?? p._id))}
                    onToggleWish={toggleWish}
                  />
                ))}
                {loading && Array.from({ length: 8 }, (_, i) => <CardSkeleton key={`s${i}`} />)}
              </Box>
            )}

            {/* Empty state */}
            {!loading && !failed && results.length === 0 && (
              <Paper elevation={0} sx={{ border: `1px dashed ${THEME.line}`, borderRadius: '14px', p: { xs: 3, md: 6 }, textAlign: 'center', bgcolor: THEME.surface }}>
                <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 1 }}>
                  {products.length ? 'No products match your filters' : 'No products here yet'}
                </Typography>
                <Typography sx={{ color: THEME.muted, mb: 2.5 }}>
                  {products.length
                    ? 'Try removing some filters.'
                    : 'Try another section of this category.'}
                </Typography>
                {products.length > 0 && (
                  <Button
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    sx={{ textTransform: 'none', fontWeight: 700, color: GREEN }}
                  >
                    Clear all filters
                  </Button>
                )}
              </Paper>
            )}

            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={pageCount}
                  page={safePage}
                  siblingCount={isMdUp ? 1 : 0}
                  onChange={(_, value) => {
                    setPage(value);
                    // NEW: scroll to the product list instead of the very top
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  shape="rounded"
                  size={isMdUp ? 'medium' : 'small'}
                />
              </Box>
            )}
          </Box>
        </Box>

        {/* NEW: related images mosaic + story section */}
        {!loading && !failed && (
          <>
            <CategoryGallery
              items={galleryItems}
              accent={design.accent}
              label={subLabel ? `${categoryLabel} ${subLabel}` : categoryLabel}
            />
            <CategoryStory design={design} product={storyProduct} />
          </>
        )}
      </Container>

      {/* ---------------- Mobile / tablet: Sort + Filter bar ---------------- */}
      {!isMdUp && (
        <Box
          role="region"
          aria-label="Sort and filter"
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            bgcolor: THEME.surface,
            borderTop: `1px solid ${THEME.line}`,
            pb: 'env(safe-area-inset-bottom, 0px)',
            boxShadow: '0 -6px 20px rgba(20,21,26,.08)',
          }}
        >
          <Button
            onClick={() => setSortOpen(true)}
            sx={{ py: 1.6, borderRadius: 0, textTransform: 'none', fontWeight: 700, color: THEME.ink, borderRight: `1px solid ${THEME.line}` }}
          >
            Sort
          </Button>
          <Button
            onClick={() => setFilterOpen(true)}
            startIcon={<FiFilter size={16} />}
            sx={{ py: 1.6, borderRadius: 0, textTransform: 'none', fontWeight: 700, color: THEME.ink }}
          >
            Filter{activeFilterCount ? ` (${activeFilterCount})` : ''}
          </Button>
        </Box>
      )}

      {/* Sort drawer */}
      <Drawer
        anchor="bottom"
        open={!isMdUp && sortOpen}
        onClose={() => setSortOpen(false)}
        PaperProps={{ sx: { borderTopLeftRadius: 18, borderTopRightRadius: 18, pb: 'env(safe-area-inset-bottom, 0px)' } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 17, mb: 1 }}>Sort by</Typography>
          <RadioGroup
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
              setSortOpen(false);
            }}
          >
            {SORTS.map((s) => (
              <FormControlLabel
                key={s.value}
                value={s.value}
                control={<Radio sx={{ color: THEME.muted, '&.Mui-checked': { color: THEME.ink } }} />}
                label={s.label}
                sx={{ py: 0.5 }}
              />
            ))}
          </RadioGroup>
        </Box>
      </Drawer>

      {/* Filter drawer */}
      <Drawer
        anchor="bottom"
        open={!isMdUp && filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{ sx: { borderTopLeftRadius: 18, borderTopRightRadius: 18, maxHeight: '88vh' } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 1.5 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 17 }}>Filters</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {clearAll}
            <IconButton onClick={() => setFilterOpen(false)} aria-label="Close filters">
              <FiX size={20} />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ p: 2, overflowY: 'auto' }}>{filterPanel}</Box>
        <Box sx={{ p: 1.5, borderTop: `1px solid ${THEME.line}`, pb: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={() => setFilterOpen(false)}
            sx={{ bgcolor: THEME.ink, borderRadius: '12px', textTransform: 'none', fontWeight: 700, py: 1.3, '&:hover': { bgcolor: '#2A2C35' } }}
          >
            Show {results.length} products
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CategoryPage;