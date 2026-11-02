import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  Link as MuiLink,
  Paper,
  Skeleton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  FiAward,
  FiCheckCircle,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiLock,
  FiMapPin,
  FiPackage,
  FiRefreshCw,
  FiShare2,
  FiShield,
  FiShoppingBag,
  FiTag,
  FiTruck,
  FiZap,
  FiStar,
  FiImage,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

import { THEME } from '../Shop/ProductCard';
import { selectProducts } from '../../../store/slices/productSlice';
import { addToCart } from '../../../store/slices/cartSlice';
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistItems,
} from '../../../store/slices/wishlistSlice';
import {
  buildSeedReviews,
  selectUserReviews,
  summarizeReviews,
  formatReviewDate,
} from '../../../store/slices/reviewSlice';
// NEW: similar products for API products (store has none for them)
import { loadRelated } from '../../../api/CatalogApi';

/* ─────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────── */
const PRODUCT_API = 'https://dummyjson.com/products';
const USD_TO_INR = 83;
const EMPTY = [];
const GREEN = THEME.accent;   // '#0E6B5C'
const DANGER = THEME.danger;  // '#C2255C'
const STAR_COLOR = '#F5A623';

/* Named-colour → hex lookup for CSS swatch rendering */
const NAMED_COLORS = {
  black: '#000000', white: '#FFFFFF', red: '#D32F2F', blue: '#1976D2',
  navy: '#1a1a2e', green: '#2E7D32', yellow: '#FBC02D', orange: '#F57C00',
  pink: '#EC407A', purple: '#7B1FA2', brown: '#8B4513', grey: '#9E9E9E',
  gray: '#9E9E9E', silver: '#C0C0C0', gold: '#D4AF37', beige: '#D9C7A3',
  maroon: '#800000', mint: '#98D8C8', cream: '#FFFDD0', coral: '#FF6B6B',
  khaki: '#C3B091', tan: '#D2B48C', cognac: '#9A4F2E',
};

/* ─────────────────────────────────────────────────────────
   PURE HELPERS  (no hooks — safe to call outside components)
───────────────────────────────────────────────────────── */
const rupee = (n) =>
  `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const prettyLabel = (slug = '') =>
  slug.split(/[-_]/).filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const resolveHex = (value = '') => {
  const v = String(value).trim();
  if (/^#[0-9a-f]{6}$/i.test(v)) return v;
  if (/^#[0-9a-f]{3}$/i.test(v))
    return `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
  return NAMED_COLORS[v.toLowerCase()] ?? null;
};

/*
 * Old whole-image CSS-filter tint. It is no longer used for the preview
 * (it also changed the background), but it is kept here so nothing is lost.
 */
// eslint-disable-next-line no-unused-vars
const swatchFilter = (value) => {
  const hex = resolveHex(value);
  if (!hex) return undefined;
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  if (s < 0.15)
    return `grayscale(1) brightness(${(0.35 + l * 1.1).toFixed(2)}) contrast(1.05)`;
  return `sepia(1) saturate(${(2.5 + s * 3).toFixed(1)}) hue-rotate(${h - 50}deg) brightness(${(0.65 + l * 0.7).toFixed(2)})`;
};

/* ─────────────────────────────────────────────────────────
   PRODUCT-ONLY RECOLOUR  (background stays untouched)
   1. Flood-fill from the image edges to find the background.
   2. Recolour only the remaining pixels (the product).
   3. Skin tones and very dark pixels (hair, shadows) are kept as they are.
───────────────────────────────────────────────────────── */
const RECOLOR_MAX_SIZE = 900;
const RECOLOR_CACHE_LIMIT = 80;
const recolorCache = new Map(); // key -> dataURL | null (null = could not recolour)

const hexToRgb = (hex) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

const rgbToHsl = (r, g, b) => {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
};

const hslToRgb = (h, s, l) => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
};

const looksLikeSkin = (r, g, b, s) =>
  r > 95 && g > 40 && b > 20 &&
  r > g && r > b &&
  Math.abs(r - g) > 15 &&
  Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
  s < 0.62;

/* Marks background pixels by flood-filling inwards from every edge pixel. */
const detectBackground = (data, w, h) => {
  const total = w * h;
  const bg = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0, tail = 0;

  // Average colour of the border = reference background colour
  let sr = 0, sg = 0, sb = 0, count = 0;
  const sample = (x, y) => {
    const i = (y * w + x) * 4;
    sr += data[i]; sg += data[i + 1]; sb += data[i + 2]; count += 1;
  };
  for (let x = 0; x < w; x += 2) { sample(x, 0); sample(x, h - 1); }
  for (let y = 0; y < h; y += 2) { sample(0, y); sample(w - 1, y); }
  const ar = sr / count, ag = sg / count, ab = sb / count;

  const LOCAL_TOL = 20;   // allowed jump between neighbouring pixels (soft gradients)
  const GLOBAL_TOL = 120; // allowed distance from the average border colour

  const dist = (i, r, g, b) => {
    const dr = data[i] - r, dg = data[i + 1] - g, db = data[i + 2] - b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };

  const push = (p) => {
    bg[p] = 1;
    queue[tail] = p;
    tail += 1;
  };

  // Seed from the edges (only pixels that look like the background)
  const trySeed = (x, y) => {
    const p = y * w + x;
    if (!bg[p] && dist(p * 4, ar, ag, ab) < GLOBAL_TOL * 0.6) push(p);
  };
  for (let x = 0; x < w; x += 1) { trySeed(x, 0); trySeed(x, h - 1); }
  for (let y = 0; y < h; y += 1) { trySeed(0, y); trySeed(w - 1, y); }

  while (head < tail) {
    const p = queue[head];
    head += 1;
    const x = p % w;
    const y = (p - x) / w;
    const i = p * 4;
    const pr = data[i], pg = data[i + 1], pb = data[i + 2];

    const visit = (nx, ny) => {
      const np = ny * w + nx;
      if (bg[np]) return;
      const ni = np * 4;
      if (
        dist(ni, pr, pg, pb) < LOCAL_TOL &&
        dist(ni, ar, ag, ab) < GLOBAL_TOL
      ) {
        push(np);
      }
    };
    if (x > 0) visit(x - 1, y);
    if (x < w - 1) visit(x + 1, y);
    if (y > 0) visit(x, y - 1);
    if (y < h - 1) visit(x, y + 1);
  }
  return bg;
};

const recolorProduct = (src, hex) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const scale = Math.min(
          1,
          RECOLOR_MAX_SIZE / Math.max(img.naturalWidth, img.naturalHeight),
        );
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, w, h);

        const imageData = ctx.getImageData(0, 0, w, h); // throws if CORS-tainted
        const { data } = imageData;
        const bg = detectBackground(data, w, h);

        const [tr, tg, tb] = hexToRgb(hex);
        const [th, ts, tl] = rgbToHsl(tr, tg, tb);
        const neutral = ts < 0.12; // white / black / grey targets

        for (let p = 0; p < w * h; p += 1) {
          if (bg[p]) continue;
          const i = p * 4;
          const [, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
          if (l < 0.1) continue;                                  // hair / deep shadow
          if (looksLikeSkin(data[i], data[i + 1], data[i + 2], s)) continue;

          const ns = neutral ? 0 : Math.min(1, ts * (0.45 + Math.min(s, 0.8) * 1.2));
          const nl = Math.min(0.97, Math.max(0.03, l + (tl - 0.5) * 0.8));
          const [r, g, b] = hslToRgb(th, ns, nl);
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = src;
  });

/*
 * Returns an image URL where only the product is recoloured.
 * While it is processing (or if the image host blocks canvas access)
 * the original image is returned, so the background is never changed.
 */
const useRecoloredSrc = (src, hex) => {
  const [, forceRender] = useState(0);
  const key = src && hex ? `${src}|${hex.toLowerCase()}` : '';
  const cached = key ? recolorCache.get(key) : undefined;

  useEffect(() => {
    if (!key || recolorCache.has(key)) return undefined;
    let cancelled = false;

    recolorProduct(src, hex)
      .then((url) => {
        if (recolorCache.size >= RECOLOR_CACHE_LIMIT) {
          recolorCache.delete(recolorCache.keys().next().value);
        }
        recolorCache.set(key, url);
      })
      .catch(() => {
        recolorCache.set(key, null); // CORS blocked or broken image: show original
      })
      .finally(() => {
        if (!cancelled) forceRender((n) => n + 1);
      });

    return () => { cancelled = true; };
  }, [key, src, hex]);

  return cached || src;
};

/* DummyJSON shape → normalised ROXVORA shape */
const normalizeApiProduct = (p) => {
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

/* Size/variant inference */
const deriveVariants = (p) => {
  if (p.variants?.length) {
    return {
      label: p.variantLabel || 'Variant',
      options: p.variants.map((v) =>
        typeof v === 'string' ? { label: v, priceDelta: 0 } : { priceDelta: 0, ...v }),
    };
  }
  if (p.sizes?.length)
    return { label: 'Size', options: p.sizes.map((s) => ({ label: s, priceDelta: 0 })) };

  const c = (p.category || '').toLowerCase();
  if (/shoe|boot|sneaker|sandal|footwear/.test(c))
    return { label: 'Size (UK)', options: ['6', '7', '8', '9', '10', '11'].map((s) => ({ label: s, priceDelta: 0 })) };
  if (/shirt|dress|top|jacket|jeans|pant|trouser|kurta|knitwear|sweater|blouse|outerwear/.test(c))
    return { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => ({ label: s, priceDelta: 0 })) };
  if (/smartphone|mobile|tablet|laptop|computer/.test(c))
    return {
      label: 'Storage',
      options: [
        { label: '128 GB', priceDelta: 0 },
        { label: '256 GB', priceDelta: Math.round((p.price || 0) * 0.12) },
        { label: '512 GB', priceDelta: Math.round((p.price || 0) * 0.28) },
      ],
    };
  return null;
};

/* Product highlights list */
const buildHighlights = (p, colorName, variantText) => {
  if (p.highlights?.length) return p.highlights;
  const list = [];
  if (p.brand) list.push(`Brand: ${p.brand}`);
  if (colorName) list.push(`Colour: ${colorName}`);
  if (variantText) list.push(variantText);
  if (p.category) list.push(`Category: ${p.category}`);
  if (p.warrantyInformation) list.push(p.warrantyInformation);
  if (p.weight) list.push(`Weight: ${p.weight} g`);
  if (p.returnPolicy) list.push(p.returnPolicy);
  if (p.tags?.length) list.push(`Tags: ${p.tags.join(', ')}`);
  return list;
};

/* Specification groups */
const buildSpecs = (p, colorName, variantCfg, variant) => {
  if (p.specifications && typeof p.specifications === 'object' && !Array.isArray(p.specifications)) {
    return Object.entries(p.specifications).map(([group, rows]) => ({
      group,
      rows: typeof rows === 'object' && !Array.isArray(rows)
        ? Object.entries(rows).map(([k, v]) => [k, String(v)])
        : [],
    })).filter((g) => g.rows.length);
  }
  const clean = (rows) => rows.filter(([, v]) => v !== undefined && v !== null && v !== '');
  const dims = p.dimensions
    ? `${p.dimensions.width} × ${p.dimensions.height} × ${p.dimensions.depth} cm`
    : '';
  return [
    {
      group: 'General',
      rows: clean([
        ['Brand', p.brand],
        ['Model / SKU', p.sku],
        ['Category', p.category],
        ['Colour', colorName],
        [variantCfg?.label, variant?.label],
        ['Availability', p.availabilityStatus],
        ['Minimum order quantity', p.minimumOrderQuantity
          ? String(p.minimumOrderQuantity) : undefined],
      ]),
    },
    {
      group: 'Dimensions & Weight',
      rows: clean([
        ['Dimensions (W × H × D)', dims],
        ['Weight', p.weight ? `${p.weight} g` : ''],
      ]),
    },
    {
      group: 'Service & Delivery',
      rows: clean([
        ['Warranty', p.warrantyInformation],
        ['Return policy', p.returnPolicy],
        ['Shipping', p.shippingInformation],
      ]),
    },
  ].filter((g) => g.rows.length);
};

/* Estimated delivery (honest label: "estimate") */
const deliveryEstimate = (pin) => {
  const d = new Date();
  d.setDate(d.getDate() + 3 + (Number(pin.slice(-1)) % 3));
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
};

const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

/* Demo offers — clearly labelled as demo */
const DEMO_OFFERS = (price) => [
  { tag: 'Bank offer', text: '10% instant discount on select credit cards (demo offer — not active)' },
  { tag: 'No-cost EMI', text: `From ${rupee(Math.ceil(price / 6))}/month for 6 months on select cards (demo)` },
  { tag: 'Special price', text: 'Extra discount shown at checkout for eligible orders (demo)' },
];

/* ─────────────────────────────────────────────────────────
   SHARED SUB-COMPONENTS
───────────────────────────────────────────────────────── */

/* Reusable section card */
const Section = ({ title, id, children, action }) => (
  <Paper
    id={id}
    elevation={0}
    sx={{
      border: `1px solid ${THEME.line}`,
      borderRadius: { xs: 0, sm: '16px' },
      borderLeft: { xs: 0, sm: `1px solid ${THEME.line}` },
      borderRight: { xs: 0, sm: `1px solid ${THEME.line}` },
      bgcolor: THEME.surface,
      p: { xs: 2, md: 3 },
      mb: { xs: 1, sm: 2 },
      scrollMarginTop: 88,
    }}
  >
    {title && (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          component="h2"
          sx={{ fontWeight: 800, fontSize: { xs: 17, md: 19 }, color: THEME.ink }}
        >
          {title}
        </Typography>
        {action}
      </Box>
    )}
    {children}
  </Paper>
);

/* Green rating badge */
const RatingBadge = ({ value, small }) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 0.5,
      bgcolor: GREEN,
      color: '#fff',
      fontWeight: 700,
      fontSize: small ? 12 : 14,
      px: small ? 0.9 : 1.1,
      py: small ? 0.15 : 0.3,
      borderRadius: '8px',
      lineHeight: 1.5,
    }}
  >
    {Number(value || 0).toFixed(1)}
    <FiStar size={small ? 11 : 12} style={{ fill: '#fff', flexShrink: 0 }} />
  </Box>
);

/* Page-level skeleton */
const DetailSkeleton = () => (
  <Container maxWidth="xl" sx={{ pt: 3, px: { xs: 2, sm: 3 } }}>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '5fr 6fr' },
        gap: 3,
      }}
    >
      <Skeleton variant="rounded" sx={{ height: { xs: 340, md: 560 }, borderRadius: '16px' }} />
      <Box>
        <Skeleton width="80%" height={44} />
        <Skeleton width="30%" height={28} sx={{ mt: 1 }} />
        <Skeleton width="45%" height={52} sx={{ mt: 1 }} />
        <Skeleton variant="rounded" height={120} sx={{ mt: 2, borderRadius: '16px' }} />
        <Skeleton variant="rounded" height={160} sx={{ mt: 2, borderRadius: '16px' }} />
      </Box>
    </Box>
  </Container>
);

/* Broken-image fallback */
const ImageFallback = ({ name }) => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      color: THEME.muted,
      bgcolor: THEME.soft,
    }}
  >
    <FiImage size={32} />
    <Typography sx={{ fontSize: 12, px: 2, textAlign: 'center', color: THEME.muted }}>
      {name || 'Image unavailable'}
    </Typography>
  </Box>
);

/* Single gallery thumbnail */
const Thumb = ({ src, alt, active, recolor, onClick }) => {
  const [failed, setFailed] = useState(false);
  const shownSrc = useRecoloredSrc(src, recolor);
  return (
    <Box
      role="option"
      aria-selected={active}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      sx={{
        width: { xs: 56, md: 68 },
        height: { xs: 56, md: 68 },
        flexShrink: 0,
        borderRadius: '10px',
        border: `2px solid ${active ? THEME.ink : THEME.line}`,
        bgcolor: THEME.soft,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color .15s',
        '&:focus-visible': { outline: `2px solid ${THEME.ink}`, outlineOffset: 2 },
      }}
    >
      {src && !failed ? (
        <img
          src={shownSrc}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <Box
          sx={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: THEME.muted,
          }}
        >
          <FiImage size={20} />
        </Box>
      )}
    </Box>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────────────────── */
const ProductDetailsPage = () => {
  /* ── Router ── */
  const { slug: rawSlug = '' } = useParams();
  const id = decodeURIComponent(rawSlug);
  const navigate = useNavigate();
  const location = useLocation();

  /* ── MUI ── */
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const canHover = useMediaQuery('(hover: hover)');

  /* ── Redux ── */
  const dispatch = useDispatch();
  const storeProducts = useSelector(selectProducts) || EMPTY;
  const wishlistItems = useSelector(selectWishlistItems) || EMPTY;

  /* ── API product loading ── */
  const apiId = id.startsWith('api-') ? id.slice(4) : null;
  const passed = location.state?.product ?? null; // instant first-paint from ShopPage

  const [apiProduct, setApiProduct] = useState(null);
  const [loadStatus, setLoadStatus] = useState(apiId ? 'loading' : 'ready');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!apiId) {
      setApiProduct(null);
      setLoadStatus('ready');
      return undefined;
    }
    const ctrl = new AbortController();
    setLoadStatus('loading');
    setApiProduct(null);

    fetch(`${PRODUCT_API}/${encodeURIComponent(apiId)}`, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setApiProduct(normalizeApiProduct(data));
        setLoadStatus('ready');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setLoadStatus('error');
      });

    return () => ctrl.abort();
  }, [apiId, retryKey]);

  /* ── Resolve product ── */
  const storeFound = useMemo(
    () => (apiId ? null : storeProducts.find((p) => String(p.id ?? p._id) === id) ?? null),
    [apiId, id, storeProducts],
  );
  const product = apiId ? (apiProduct ?? passed) : (storeFound ?? passed);

  /* ── Per-product numeric ID for seed reviews ── */
  const numericProductId = useMemo(() => {
    if (!product) return 0;
    const raw = product.id ?? product._id;
    if (typeof raw === 'number') return raw;
    const m = String(raw).match(/\d+/);
    return m ? Number(m[0]) : 0;
  }, [product]);

  /* ── Reviews: seed + user-submitted ── */
  const userReviews = useSelector((state) => selectUserReviews(state, numericProductId));

  const allReviews = useMemo(() => {
    if (!product) return EMPTY;
    // API products carry their own reviews array
    const apiReviews = (product.reviews || EMPTY).map((r) => ({
      id: r.reviewerEmail || Math.random(),
      author: r.reviewerName || 'Verified buyer',
      rating: r.rating || 5,
      body: r.comment || '',
      title: '',
      createdAt: r.date || '',
      verified: true,
      location: '',
    }));
    if (apiReviews.length) return [...userReviews, ...apiReviews];
    // Store products get deterministic seed reviews
    return [...userReviews, ...buildSeedReviews(numericProductId)];
  }, [product, userReviews, numericProductId]);

  const reviewSummary = useMemo(() => summarizeReviews(allReviews), [allReviews]);

  /* ── Wishlist state ── */
  const wished = useMemo(() => {
    if (!product) return false;
    const pid = product.id ?? product._id;
    return wishlistItems.some((w) => w.id === pid);
  }, [wishlistItems, product]);

  /* ── Local UI state ── */
  const [colorIdx, setColorIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [pin, setPin] = useState('');
  const [pinResult, setPinResult] = useState(null);   // { ok, text }
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const [toast, setToast] = useState(null);   // { msg, severity }
  const [cartState, setCartState] = useState('idle'); // 'idle' | 'loading' | 'added'
  const [showAllReviews, setShowAllReviews] = useState(false); // NEW
  const [apiSimilar, setApiSimilar] = useState(EMPTY);          // NEW
  const touchX = useRef(null);
  const galleryTopRef = useRef(null);

  /* Reset selections whenever the product changes */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setColorIdx(0);
    setVariantIdx(0);
    setImgIdx(0);
    setPinResult(null);
    setCartState('idle');
    setShowAllReviews(false);
    setApiSimilar(EMPTY);
  }, [id]);

  /* ── Derived product values (only after product exists) ── */
  const name = product ? (product.name ?? product.title ?? 'Product') : '';

  const colors = useMemo(() => {
    if (!product) return [];
    const list = (product.colors || []).map((c) =>
      typeof c === 'string' ? { value: c, name: c } : { ...c, name: c.name || c.value },
    );
    return list.length ? list : [
      { value: '#000000', name: 'Black' },
      { value: '#FFFFFF', name: 'White' },
      { value: '#1a1a2e', name: 'Navy' },
    ];
  }, [product]);

  const color = colors[Math.min(colorIdx, colors.length - 1)] || colors[0] || { value: '#000', name: 'Default' };

  /* Per-colour images vs. base images */
  const ownImages = useMemo(() => {
    if (!product) return null;
    return color.images?.length
      ? color.images
      : product.colorImages?.[color.value] ?? product.colorImages?.[color.name] ?? null;
  }, [product, color]);

  const baseImages = useMemo(() => {
    if (!product) return [];
    return product.images?.length ? product.images : [product.image ?? product.thumbnail].filter(Boolean);
  }, [product]);

  const images = ownImages?.length ? ownImages : baseImages;
  const safeImgIdx = Math.min(imgIdx, Math.max(0, images.length - 1));

  /*
   * Colour preview: when there are no real per-colour photos, only the
   * PRODUCT is recoloured (canvas). The background is never changed.
   */
  const recolorHex = ownImages?.length
    ? null
    : (resolveHex(color.value) ?? resolveHex(color.name));
  const mainSrc = useRecoloredSrc(images[safeImgIdx], recolorHex);

  const variantCfg = useMemo(() => (product ? deriveVariants(product) : null), [product]);
  const variant = variantCfg
    ? variantCfg.options[Math.min(variantIdx, variantCfg.options.length - 1)]
    : null;

  const price = Number(product?.price || 0) + (variant?.priceDelta || 0);
  const mrp = product?.originalPrice
    ? Number(product.originalPrice) + (variant?.priceDelta || 0)
    : null;
  const discountPct = mrp && mrp > price ? Math.round((1 - price / mrp) * 100) : 0;

  const inStock = product ? (product.stock === undefined || product.stock > 0) : false;
  const lowStock = inStock && product?.stock !== undefined && product.stock <= 5;

  const highlights = useMemo(
    () => product ? buildHighlights(product, color.name, variant ? `${variantCfg?.label}: ${variant.label}` : '') : [],
    [product, color.name, variant, variantCfg],
  );

  const specs = useMemo(
    () => product ? buildSpecs(product, color.name, variantCfg, variant) : [],
    [product, color.name, variantCfg, variant],
  );

  /* Similar products (same category, from Redux store) */
  const similar = useMemo(() => {
    if (!product) return EMPTY;
    return storeProducts
      .filter((p) =>
        String(p.id ?? p._id) !== id &&
        p.category &&
        p.category === product.category,
      )
      .slice(0, 8);
  }, [storeProducts, product, id]);

  /* NEW: when the store has no similar products (e.g. API products),
     load products of the same category from the free API. */
  const productCategory = product?.category;
  useEffect(() => {
    if (!productCategory || similar.length > 0) return undefined;
    let stale = false;
    loadRelated(productCategory)
      .then((list) => {
        if (!stale) {
          setApiSimilar(
            list.filter((p) => String(p.id) !== id).slice(0, 10),
          );
        }
      })
      .catch(() => { });
    return () => {
      stale = true;
    };
  }, [productCategory, similar.length, id]);

  const similarList = similar.length > 0 ? similar : apiSimilar;

  /* ── Handlers ── */
  const handleColorSelect = useCallback((i) => {
    setColorIdx(i);
    setImgIdx(0);
  }, []);

  const goImg = useCallback(
    (dir) => setImgIdx((prev) => (prev + dir + images.length) % images.length),
    [images.length],
  );

  const handleCheckPin = useCallback(() => {
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      setPinResult({ ok: false, text: 'Please enter a valid 6-digit Indian pincode.' });
      return;
    }
    // No live delivery API — honest estimate
    setPinResult({
      ok: true,
      text: `Estimated delivery by ${deliveryEstimate(pin)} (estimate only — not confirmed).`,
    });
  }, [pin]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setToast({ msg: 'Product link copied to clipboard', severity: 'success' });
      }
    } catch {
      // user dismissed share sheet — not an error
    }
  }, [name]);

  const handleWishlist = useCallback(() => {
    if (!product) return;
    const pid = product.id ?? product._id;
    if (wished) {
      dispatch(removeFromWishlist(pid));
      setToast({ msg: 'Removed from wishlist', severity: 'info' });
    } else {
      dispatch(addToWishlist({
        id: pid,
        name,
        price,
        image: images[0],
        category: product.category,
      }));
      setToast({ msg: 'Added to wishlist', severity: 'success' });
    }
  }, [product, wished, dispatch, name, price, images]);

  const handleAddToCart = useCallback(() => {
    if (!product || !inStock) return;

    const pid = product.id ?? product._id;
    const variantId = `${pid}-${color.name}-${variant?.label || 'default'}`;

    dispatch(addToCart({
      id: pid,
      variantId,
      name,
      price,
      image: images[0] ?? product.image ?? product.thumbnail ?? '',
      color: color.name,
      size: variant?.label || '',
      quantity: 1,
      category: product.category,
    }));

    setCartState('added');
    setToast({ msg: `${name} added to your bag`, severity: 'success' });
    setTimeout(() => setCartState('idle'), 2500);
  }, [product, inStock, color.name, variant, dispatch, name, price, images]);

  const handleBuyNow = useCallback(() => {
    if (!product || !inStock) return;
    handleAddToCart();
    navigate('/checkout');
  }, [product, inStock, handleAddToCart, navigate]);

  const goBack = useCallback(() => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/shop');
  }, [navigate]);

  /* ── Guard: loading ── */
  if (!product && loadStatus === 'loading') {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: THEME.canvas }}>
        <Container maxWidth="xl" sx={{ pt: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <CircularProgress size={20} sx={{ color: THEME.ink }} />
          <Typography sx={{ color: THEME.muted }}>Loading product…</Typography>
        </Container>
        <DetailSkeleton />
      </Box>
    );
  }

  /* ── Guard: not found / error ── */
  if (!product) {
    return (
      <Box sx={{
        minHeight: '100vh', bgcolor: THEME.canvas,
        display: 'grid', placeItems: 'center', px: 2,
      }}>
        <Paper
          elevation={0}
          sx={{
            border: `1px dashed ${THEME.line}`,
            borderRadius: '16px',
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            bgcolor: THEME.surface,
            maxWidth: 480,
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: 20, color: THEME.ink, mb: 1 }}>
            {loadStatus === 'error' ? 'Could not load this product' : 'Product not found'}
          </Typography>
          <Typography sx={{ color: THEME.muted, mb: 3 }}>
            {loadStatus === 'error'
              ? 'Check your internet connection and try again.'
              : 'This product may have been removed or the link is incorrect.'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            {loadStatus === 'error' && (
              <Button
                variant="contained"
                disableElevation
                onClick={() => setRetryKey((k) => k + 1)}
                sx={{
                  bgcolor: THEME.ink, borderRadius: '12px',
                  textTransform: 'none', fontWeight: 700, px: 3,
                  '&:hover': { bgcolor: '#2A2C35' },
                }}
              >
                Try again
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={goBack}
              sx={{
                borderRadius: '12px', textTransform: 'none', fontWeight: 700,
                color: THEME.ink, borderColor: THEME.line, px: 3,
              }}
            >
              Back to shop
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  /* ─────────────────── ACTION BUTTONS ─────────────────── */
  const actionButtons = (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      {/* Add to Bag */}
      <Button
        fullWidth
        variant="contained"
        disableElevation
        disabled={!inStock || cartState === 'loading'}
        onClick={handleAddToCart}
        startIcon={
          cartState === 'added'
            ? <FiCheckCircle size={18} />
            : <FiShoppingBag size={18} />
        }
        sx={{
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: 15,
          py: 1.4,
          bgcolor: cartState === 'added' ? GREEN : THEME.ink,
          color: '#fff',
          transition: 'background-color .3s',
          '&:hover': { bgcolor: cartState === 'added' ? '#0a5549' : '#2A2C35' },
          '&.Mui-disabled': { bgcolor: THEME.soft, color: THEME.muted },
        }}
      >
        {cartState === 'added' ? 'Added to bag' : inStock ? 'Add to bag' : 'Out of stock'}
      </Button>

      {/* Buy Now */}
      <Button
        fullWidth
        variant="contained"
        disableElevation
        disabled={!inStock}
        onClick={handleBuyNow}
        startIcon={<FiZap size={18} />}
        sx={{
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: 15,
          py: 1.4,
          bgcolor: THEME.accent,
          color: '#fff',
          '&:hover': { bgcolor: '#0a5549' },
          '&.Mui-disabled': { bgcolor: THEME.soft, color: THEME.muted },
        }}
      >
        Buy now
      </Button>
    </Box>
  );

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: THEME.canvas, pb: { xs: 12, md: 8 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 3, lg: 4 }, pt: { xs: 1, md: 3 } }}>

        {/* ═══════════════════════ BREADCRUMBS ═══════════════════════ */}
        <Box sx={{ px: { xs: 1.5, sm: 0 }, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={goBack}
            aria-label="Go back"
            sx={{ bgcolor: THEME.soft, display: { md: 'none' }, flexShrink: 0 }}
          >
            <FiChevronLeft size={18} />
          </IconButton>
          <Breadcrumbs
            separator={<FiChevronRight size={13} color={THEME.muted} />}
            sx={{ fontSize: 13, color: THEME.muted, '& ol': { flexWrap: 'nowrap', overflow: 'hidden' } }}
          >
            <MuiLink
              component="button"
              underline="hover"
              onClick={() => navigate('/')}
              sx={{ fontSize: 13, color: THEME.muted, cursor: 'pointer', '&:hover': { color: THEME.ink } }}
            >
              Home
            </MuiLink>
            <MuiLink
              component="button"
              underline="hover"
              onClick={() => navigate('/shop')}
              sx={{ fontSize: 13, color: THEME.muted, cursor: 'pointer', '&:hover': { color: THEME.ink } }}
            >
              Shop
            </MuiLink>
            {product.category && (
              <Typography sx={{ fontSize: 13, color: THEME.muted }}>
                {product.category}
              </Typography>
            )}
            <Typography
              noWrap
              sx={{
                fontSize: 13, color: THEME.ink, fontWeight: 600,
                maxWidth: { xs: 130, sm: 300, md: 500 },
              }}
            >
              {name}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* ═══════════════════════ MAIN GRID ═══════════════════════ */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'minmax(0,1fr)',
              md: 'minmax(0,5fr) minmax(0,6fr)',
              lg: 'minmax(0,5fr) minmax(0,7fr)',
            },
            gap: { md: 3, lg: 4 },
            alignItems: 'start',
          }}
        >

          {/* ═══════════ LEFT COL — GALLERY ═══════════ */}
          <Box
            ref={galleryTopRef}
            sx={{ position: { md: 'sticky' }, top: { md: 88 } }}
          >
            <Paper
              elevation={0}
              sx={{
                border: `1px solid ${THEME.line}`,
                borderRadius: { xs: 0, sm: '16px' },
                borderLeft: { xs: 0, sm: `1px solid ${THEME.line}` },
                borderRight: { xs: 0, sm: `1px solid ${THEME.line}` },
                bgcolor: THEME.surface,
                p: { xs: 1.5, md: 2 },
                mb: { xs: 1, sm: 2 },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1.5 }}>

                {/* ── Thumbnail strip ── */}
                <Box
                  role="listbox"
                  aria-label="Product image thumbnails"
                  sx={{
                    order: { xs: 2, md: 1 },
                    display: 'flex',
                    flexDirection: { xs: 'row', md: 'column' },
                    gap: 1,
                    overflow: 'auto',
                    maxHeight: { md: 520 },
                    flexShrink: 0,
                    pb: { xs: 0.5, md: 0 },
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                  }}
                >
                  {images.map((src, i) => (
                    <Thumb
                      key={`${color.name}-${i}`}
                      src={src}
                      alt={`${name} view ${i + 1}`}
                      active={i === safeImgIdx}
                      recolor={recolorHex}
                      onClick={() => setImgIdx(i)}
                    />
                  ))}
                </Box>

                {/* ── Main image ── */}
                <Box sx={{ order: { xs: 1, md: 2 }, flex: 1, minWidth: 0, position: 'relative' }}>
                  {/* Zoom + swipe container */}
                  <Box
                    onMouseEnter={() => canHover && isMdUp && setZoom((z) => ({ ...z, on: true }))}
                    onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
                    onMouseMove={(e) => {
                      if (!canHover || !isMdUp) return;
                      const r = e.currentTarget.getBoundingClientRect();
                      setZoom({
                        on: true,
                        x: ((e.clientX - r.left) / r.width) * 100,
                        y: ((e.clientY - r.top) / r.height) * 100,
                      });
                    }}
                    onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
                    onTouchEnd={(e) => {
                      if (touchX.current === null) return;
                      const dx = e.changedTouches[0].clientX - touchX.current;
                      if (Math.abs(dx) > 40) goImg(dx < 0 ? 1 : -1);
                      touchX.current = null;
                    }}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: { xs: '1 / 1', md: '4 / 5' },
                      maxHeight: { md: 560 },
                      bgcolor: THEME.soft,
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: zoom.on ? 'zoom-in' : 'default',
                    }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={`${color.name}-${safeImgIdx}`}
                        src={mainSrc}
                        alt={`${name} in ${color.name}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        draggable={false}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          transform: zoom.on ? 'scale(1.9)' : 'scale(1)',
                          transformOrigin: `${zoom.x}% ${zoom.y}%`,
                          transition: zoom.on
                            ? 'transform .08s linear'
                            : 'transform .25s ease',
                          userSelect: 'none',
                          display: 'block',
                        }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </AnimatePresence>

                    {/* Discount badge */}
                    {discountPct > 0 && (
                      <Chip
                        label={`${discountPct}% off`}
                        size="small"
                        sx={{
                          position: 'absolute', top: 12, left: 12,
                          bgcolor: GREEN, color: '#fff',
                          fontWeight: 700, borderRadius: '8px',
                        }}
                      />
                    )}

                    {/* Prev / Next arrows */}
                    {images.length > 1 && (
                      <>
                        <IconButton
                          onClick={() => goImg(-1)}
                          aria-label="Previous image"
                          size="small"
                          sx={{
                            position: 'absolute', left: 8, top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(255,255,255,.9)',
                            '&:hover': { bgcolor: '#fff' },
                          }}
                        >
                          <FiChevronLeft size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => goImg(1)}
                          aria-label="Next image"
                          size="small"
                          sx={{
                            position: 'absolute', right: 8, top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(255,255,255,.9)',
                            '&:hover': { bgcolor: '#fff' },
                          }}
                        >
                          <FiChevronRight size={18} />
                        </IconButton>
                      </>
                    )}

                    {/* Dot indicator */}
                    {images.length > 1 && (
                      <Box
                        sx={{
                          position: 'absolute', bottom: 10, left: '50%',
                          transform: 'translateX(-50%)',
                          display: 'flex', gap: 0.6,
                        }}
                      >
                        {images.map((_, i) => (
                          <Box
                            key={i}
                            onClick={() => setImgIdx(i)}
                            sx={{
                              width: i === safeImgIdx ? 18 : 6,
                              height: 6,
                              borderRadius: '4px',
                              bgcolor: i === safeImgIdx
                                ? THEME.ink
                                : 'rgba(20,21,26,.3)',
                              transition: 'all .2s',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>

                  {/* Wishlist + Share — floating top-right */}
                  <Box
                    sx={{
                      position: 'absolute', top: 12, right: 12,
                      display: 'flex', flexDirection: 'column', gap: 1,
                    }}
                  >
                    <Tooltip title={wished ? 'Remove from wishlist' : 'Add to wishlist'}>
                      <IconButton
                        onClick={handleWishlist}
                        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                        aria-pressed={wished}
                        sx={{
                          bgcolor: 'rgba(255,255,255,.95)',
                          boxShadow: '0 2px 8px rgba(0,0,0,.12)',
                          '&:hover': { bgcolor: '#fff' },
                        }}
                      >
                        <FiHeart
                          size={18}
                          color={wished ? DANGER : THEME.ink}
                          fill={wished ? DANGER : 'none'}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share product">
                      <IconButton
                        onClick={handleShare}
                        aria-label="Share product"
                        sx={{
                          bgcolor: 'rgba(255,255,255,.95)',
                          boxShadow: '0 2px 8px rgba(0,0,0,.12)',
                          '&:hover': { bgcolor: '#fff' },
                        }}
                      >
                        <FiShare2 size={18} />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Colour preview disclosure */}
                  {recolorHex && (
                    <Typography
                      sx={{
                        fontSize: 11, color: THEME.muted, mt: 0.75, px: 0.5,
                        lineHeight: 1.4, textAlign: 'center',
                      }}
                    >
                      Colour shown is a preview (product only, background unchanged). Add <code>color.images</code> for actual product photos per colour.
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Desktop action buttons below gallery */}
              {isMdUp && <Box sx={{ mt: 2 }}>{actionButtons}</Box>}
            </Paper>
          </Box>

          {/* ═══════════ RIGHT COL — DETAILS ═══════════ */}
          <Box sx={{ minWidth: 0 }}>

            {/* ── Title & Price ── */}
            <Section>
              {product.brand && (
                <Typography sx={{ color: THEME.muted, fontWeight: 600, fontSize: 13 }}>
                  {product.brand}
                </Typography>
              )}

              <Typography
                component="h1"
                sx={{
                  fontFamily: '"Fraunces", "Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: { xs: 22, sm: 26, md: 30 },
                  color: THEME.ink,
                  lineHeight: 1.2,
                  overflowWrap: 'anywhere',
                  mt: product.brand ? 0.4 : 0,
                }}
              >
                {name}
                {color && ` · ${color.name}`}
                {variant && ` (${variant.label})`}
              </Typography>

              {/* Rating row */}
              {product.rating > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mt: 1.25, flexWrap: 'wrap' }}>
                  <RatingBadge value={product.rating} />
                  <Typography sx={{ color: THEME.muted, fontSize: 14, fontWeight: 600 }}>
                    {allReviews.length
                      ? `${allReviews.length} ratings & reviews`
                      : 'Rated by customers'}
                  </Typography>
                  {product.isBestSeller && (
                    <Chip
                      size="small"
                      label="Bestseller"
                      sx={{ bgcolor: '#fff4e0', color: '#8a5a00', fontWeight: 700, borderRadius: '8px' }}
                    />
                  )}
                  {product.isSale && (
                    <Chip
                      size="small"
                      label="On Sale"
                      sx={{ bgcolor: '#fce4ec', color: '#b71c1c', fontWeight: 700, borderRadius: '8px' }}
                    />
                  )}
                </Box>
              )}

              {/* Price block */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1.5,
                  flexWrap: 'wrap',
                  mt: 2,
                }}
              >
                {discountPct > 0 && (
                  <Typography sx={{ color: GREEN, fontWeight: 800, fontSize: { xs: 20, md: 24 } }}>
                    ↓ {discountPct}%
                  </Typography>
                )}
                {mrp && mrp > price && (
                  <Typography
                    sx={{
                      color: THEME.muted,
                      textDecoration: 'line-through',
                      fontSize: { xs: 16, md: 18 },
                    }}
                  >
                    {rupee(mrp)}
                  </Typography>
                )}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={price}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      fontWeight: 800,
                      fontSize: 'clamp(26px, 5vw, 34px)',
                      color: THEME.ink,
                      lineHeight: 1,
                    }}
                  >
                    {rupee(price)}
                  </motion.span>
                </AnimatePresence>
              </Box>

              <Typography sx={{ color: THEME.muted, fontSize: 12.5, mt: 0.5 }}>
                Inclusive of all taxes
              </Typography>

              {/* Stock status */}
              {!inStock && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>
                  Currently out of stock.
                </Alert>
              )}
              {lowStock && (
                <Typography sx={{ color: '#c62828', fontWeight: 700, fontSize: 13.5, mt: 1.5 }}>
                  Only {product.stock} left — order soon
                </Typography>
              )}
            </Section>

            {/* ── Offers (demo) ── */}
            <Section title="Available Offers">
              <Typography sx={{ fontSize: 11.5, color: THEME.muted, mb: 1.5, fontStyle: 'italic' }}>
                Demo offers — not active at checkout
              </Typography>
              <Box sx={{ display: 'grid', gap: 1.25 }}>
                {DEMO_OFFERS(price).map((o) => (
                  <Box key={o.tag} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                    <Box sx={{ color: GREEN, mt: '3px', flexShrink: 0 }}>
                      <FiTag size={16} />
                    </Box>
                    <Typography sx={{ fontSize: 14, color: THEME.ink }}>
                      <strong>{o.tag}</strong> — {o.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Section>

            {/* ── Colour + Variant selection ── */}
            <Section title="Select Options">
              {/* Colours */}
              <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1.25, color: THEME.ink }}>
                Colour:{' '}
                <span style={{ fontWeight: 500, color: THEME.muted }}>{color.name}</span>
              </Typography>
              <Box
                role="radiogroup"
                aria-label="Select colour"
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: variantCfg ? 3 : 0 }}
              >
                {colors.map((c, i) => {
                  const on = i === Math.min(colorIdx, colors.length - 1);
                  const hex = resolveHex(c.value) ?? c.value;
                  const isLight = hex === '#FFFFFF' || hex === '#FFFDD0' || hex === '#F5F5F5';
                  return (
                    <Tooltip key={`${c.value}-${i}`} title={c.name} arrow>
                      <Box
                        role="radio"
                        aria-checked={on}
                        aria-label={c.name}
                        tabIndex={0}
                        onClick={() => handleColorSelect(i)}
                        onKeyDown={(e) =>
                          (e.key === 'Enter' || e.key === ' ') && handleColorSelect(i)
                        }
                        sx={{
                          width: 44, height: 44,
                          borderRadius: '50%',
                          p: '3px',
                          border: `2px solid ${on ? THEME.ink : 'transparent'}`,
                          cursor: 'pointer',
                          transition: 'border-color .15s',
                          '&:focus-visible': { outline: `2px solid ${THEME.ink}`, outlineOffset: 2 },
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%', height: '100%',
                            borderRadius: '50%',
                            bgcolor: hex,
                            border: `1.5px solid ${isLight ? THEME.line : 'transparent'}`,
                          }}
                        />
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>

              {/* Variants / Sizes */}
              {variantCfg && (
                <>
                  <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1.25, color: THEME.ink }}>
                    {variantCfg.label}:{' '}
                    <span style={{ fontWeight: 500, color: THEME.muted }}>
                      {variant?.label}
                    </span>
                  </Typography>
                  <Box
                    role="radiogroup"
                    aria-label={variantCfg.label}
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}
                  >
                    {variantCfg.options.map((v, i) => {
                      const on = i === Math.min(variantIdx, variantCfg.options.length - 1);
                      const vPrice = Number(product.price || 0) + (v.priceDelta || 0);
                      return (
                        <Box
                          key={v.label}
                          role="radio"
                          aria-checked={on}
                          tabIndex={0}
                          onClick={() => setVariantIdx(i)}
                          onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && setVariantIdx(i)
                          }
                          sx={{
                            minWidth: 84,
                            px: 2, py: 1,
                            textAlign: 'center',
                            borderRadius: '10px',
                            border: `${on ? 2 : 1}px solid ${on ? THEME.ink : THEME.line}`,
                            bgcolor: on ? THEME.soft : THEME.surface,
                            cursor: 'pointer',
                            transition: 'border-color .15s, background-color .15s',
                            '&:focus-visible': { outline: `2px solid ${THEME.ink}`, outlineOffset: 2 },
                          }}
                        >
                          <Typography sx={{ fontWeight: 700, fontSize: 14, color: THEME.ink }}>
                            {v.label}
                          </Typography>
                          {variantCfg.options.some((o) => o.priceDelta) && (
                            <Typography sx={{ fontSize: 12, color: THEME.muted }}>
                              {rupee(vPrice)}
                            </Typography>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                </>
              )}
            </Section>

            {/* ── Delivery details ── */}
            <Section title="Delivery Details">
              <Box
                sx={{
                  display: 'flex',
                  gap: 1.25,
                  alignItems: 'flex-start',
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setPinResult(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckPin()}
                  placeholder="Enter 6-digit pincode"
                  inputProps={{ inputMode: 'numeric', 'aria-label': 'Delivery pincode', maxLength: 6 }}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: 'flex', color: THEME.muted }}>
                        <FiMapPin size={16} />
                      </Box>
                    ),
                    sx: { borderRadius: '10px' },
                  }}
                  sx={{ maxWidth: { sm: 360 } }}
                />
                <Button
                  onClick={handleCheckPin}
                  sx={{
                    textTransform: 'none', fontWeight: 700,
                    color: THEME.accent, height: 40, flexShrink: 0,
                  }}
                >
                  Check
                </Button>
              </Box>

              {pinResult && (
                <Typography
                  aria-live="polite"
                  sx={{
                    mt: 1, fontSize: 13.5, fontWeight: 600,
                    color: pinResult.ok ? GREEN : '#c62828',
                  }}
                >
                  {pinResult.text}
                </Typography>
              )}

              <Box sx={{ display: 'grid', gap: 1.25, mt: 2 }}>
                {[
                  { icon: <FiTruck size={18} />, text: product.shippingInformation || 'Delivery in 3–5 business days' },
                  { icon: <FiPackage size={18} />, text: price >= 500 ? 'Free delivery on this order' : 'Delivery fee applies on orders below ₹500' },
                  { icon: <FiRefreshCw size={18} />, text: product.returnPolicy || '7-day replacement policy' },
                ].map(({ icon, text }) => (
                  <Box key={text} sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
                    <Box sx={{ color: THEME.ink, flexShrink: 0 }}>{icon}</Box>
                    <Typography sx={{ fontSize: 14 }}>{text}</Typography>
                  </Box>
                ))}
              </Box>
            </Section>

            {/* ── Peace of mind ── */}
            <Section title="Shop with Peace of Mind">
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, minmax(0,1fr))',
                    sm: 'repeat(4, minmax(0,1fr))',
                  },
                  gap: 2,
                }}
              >
                {[
                  {
                    icon: <FiRefreshCw size={22} />,
                    title: 'Easy returns',
                    text: product.returnPolicy || '7-day return policy',
                  },
                  {
                    icon: <FiShield size={22} />,
                    title: 'Warranty',
                    text: product.warrantyInformation || 'Brand warranty included',
                  },
                  {
                    icon: <FiAward size={22} />,
                    title: '100% authentic',
                    text: 'Sourced from verified brands',
                  },
                  {
                    icon: <FiLock size={22} />,
                    title: 'Secure payments',
                    text: 'Encrypted checkout',
                  },
                ].map((item) => (
                  <Box key={item.title} sx={{ textAlign: 'center', px: 1 }}>
                    <Box
                      sx={{
                        width: 52, height: 52, borderRadius: '50%',
                        bgcolor: THEME.soft, display: 'grid', placeItems: 'center',
                        mx: 'auto', mb: 1, color: THEME.ink,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>{item.title}</Typography>
                    <Typography
                      sx={{ color: THEME.muted, fontSize: 12, mt: 0.25, overflowWrap: 'anywhere' }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Section>

            {/* ── Product highlights ── */}
            {highlights.length > 0 && (
              <Section title="Product Highlights">
                <Box
                  component="ul"
                  role="list"
                  sx={{ m: 0, p: 0, listStyle: 'none', display: 'grid', gap: 1.1 }}
                >
                  {highlights.map((h, i) => (
                    <Box
                      key={`${h}-${i}`}
                      component="li"
                      sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}
                    >
                      <Box sx={{ color: GREEN, mt: '3px', flexShrink: 0 }}>
                        <FiCheckCircle size={16} />
                      </Box>
                      <Typography sx={{ fontSize: 14.5, overflowWrap: 'anywhere' }}>{h}</Typography>
                    </Box>
                  ))}
                </Box>
              </Section>
            )}

            {/* ── Showcase ── */}
            <Section title="Showcase" id="showcase">
              {product.description && (
                <Typography
                  sx={{
                    fontSize: 15, lineHeight: 1.75, color: THEME.ink,
                    maxWidth: 720, mb: 2.5,
                  }}
                >
                  {product.description}
                </Typography>
              )}
              {images.length > 0 && (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(2, minmax(0,1fr))',
                      md: 'repeat(3, minmax(0,1fr))',
                    },
                    gap: { xs: 1, md: 1.5 },
                  }}
                >
                  {images.map((src, i) => (
                    <ShowcaseImage
                      key={`${color.name}-showcase-${i}`}
                      src={src}
                      alt={`${name} showcase ${i + 1}`}
                      recolor={recolorHex}
                      onClick={() => {
                        setImgIdx(i);
                        galleryTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    />
                  ))}
                </Box>
              )}
            </Section>

            {/* ── Specifications ── */}
            {specs.length > 0 && (
              <Section title="Specifications" id="specifications">
                {specs.map((g, gi) => (
                  <Accordion
                    key={g.group}
                    defaultExpanded={gi === 0}
                    disableGutters
                    elevation={0}
                    square
                    sx={{
                      border: 0,
                      borderTop: gi ? `1px solid ${THEME.line}` : 0,
                      '&:before': { display: 'none' },
                      bgcolor: 'transparent',
                    }}
                  >
                    <AccordionSummary expandIcon={<FiChevronDown />} sx={{ px: 0 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{g.group}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 0, pt: 0 }}>
                      <Table
                        size="small"
                        sx={{
                          '& td': {
                            borderBottom: `1px solid ${THEME.line}`,
                            py: 1.25, fontSize: 14, verticalAlign: 'top',
                          },
                          '& tr:last-child td': { borderBottom: 0 },
                        }}
                      >
                        <TableBody>
                          {g.rows.map(([k, v]) => (
                            <TableRow key={k}>
                              <TableCell
                                sx={{
                                  color: THEME.muted,
                                  width: { xs: '42%', sm: '32%' },
                                  pl: 0,
                                  fontWeight: 500,
                                }}
                              >
                                {k}
                              </TableCell>
                              <TableCell
                                sx={{ color: THEME.ink, fontWeight: 600, overflowWrap: 'anywhere' }}
                              >
                                {String(v)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Section>
            )}

            {/* ── Warranty ── */}
            <Section title="Warranty & Returns" id="warranty">
              <Table
                size="small"
                sx={{
                  '& td': {
                    borderBottom: `1px solid ${THEME.line}`,
                    py: 1.25, fontSize: 14, verticalAlign: 'top',
                  },
                  '& tr:last-child td': { borderBottom: 0 },
                }}
              >
                <TableBody>
                  {[
                    ['Warranty', product.warrantyInformation || 'Please check the brand warranty card included in the box'],
                    ['Return policy', product.returnPolicy || '7-day replacement policy'],
                    ['Shipping', product.shippingInformation || 'Ships within 3–5 business days'],
                  ].map(([k, v]) => (
                    <TableRow key={k}>
                      <TableCell sx={{ color: THEME.muted, width: { xs: '42%', sm: '32%' }, pl: 0, fontWeight: 500 }}>
                        {k}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>{v}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography sx={{ color: THEME.muted, fontSize: 12.5, mt: 1.5 }}>
                Keep your invoice as proof of purchase for warranty claims.
              </Typography>
            </Section>

            {/* ── Manufacturer info ── */}
            {(() => {
              const mfRows = [
                ['Brand', product.manufacturer?.name || product.brand],
                ['Model / SKU', product.sku],
                ['Barcode', product.meta?.barcode],
                ['Country', product.manufacturer?.country],
                ['Address', product.manufacturer?.address],
                ['Listed on', product.meta?.createdAt ? fmtDate(product.meta.createdAt) : ''],
              ].filter(([, v]) => v);
              if (!mfRows.length) return null;
              return (
                <Section title="Manufacturer Info" id="manufacturer">
                  <Table
                    size="small"
                    sx={{
                      '& td': {
                        borderBottom: `1px solid ${THEME.line}`,
                        py: 1.25, fontSize: 14, verticalAlign: 'top',
                      },
                      '& tr:last-child td': { borderBottom: 0 },
                    }}
                  >
                    <TableBody>
                      {mfRows.map(([k, v]) => (
                        <TableRow key={k}>
                          <TableCell sx={{ color: THEME.muted, width: { xs: '42%', sm: '32%' }, pl: 0, fontWeight: 500 }}>
                            {k}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>{v}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {product.meta?.qrCode && (
                    <Box sx={{ mt: 2 }}>
                      <img
                        src={product.meta.qrCode}
                        alt="Product QR code"
                        width={96}
                        height={96}
                        loading="lazy"
                        style={{ borderRadius: 8, border: `1px solid ${THEME.line}` }}
                      />
                    </Box>
                  )}
                </Section>
              );
            })()}

            {/* ── Ratings & Reviews ── */}
            <Section title="Ratings & Reviews" id="reviews">
              {reviewSummary.count > 0 || product.rating > 0 ? (
                <>
                  {/* Summary row */}
                  <Box
                    sx={{
                      display: 'flex', gap: { xs: 3, md: 6 },
                      flexWrap: 'wrap', alignItems: 'center',
                      mb: allReviews.length ? 3 : 0,
                    }}
                  >
                    {/* Average */}
                    <Box sx={{ textAlign: 'center', minWidth: 110 }}>
                      <Typography
                        sx={{ fontWeight: 800, fontSize: 44, lineHeight: 1, color: THEME.ink }}
                      >
                        {reviewSummary.count > 0
                          ? reviewSummary.average.toFixed(1)
                          : Number(product.rating).toFixed(1)}
                        <span style={{ color: STAR_COLOR, fontSize: 30 }}> ★</span>
                      </Typography>
                      <Typography sx={{ color: THEME.muted, fontSize: 13, mt: 0.5 }}>
                        {reviewSummary.count
                          ? `${reviewSummary.count} reviews`
                          : 'Customer rating'}
                      </Typography>
                    </Box>

                    {/* Distribution bars */}
                    {reviewSummary.count > 0 && (
                      <Box sx={{ flex: 1, minWidth: 220, maxWidth: 420, display: 'grid', gap: 0.75 }}>
                        {[5, 4, 3, 2, 1].map((star) => {
                          const n = reviewSummary.distribution[star] || 0;
                          const pct = reviewSummary.count
                            ? (n / reviewSummary.count) * 100
                            : 0;
                          return (
                            <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                              <Typography sx={{ width: 28, fontSize: 13, fontWeight: 600 }}>
                                {star} ★
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={pct}
                                sx={{
                                  flex: 1, height: 7, borderRadius: 4,
                                  bgcolor: THEME.soft,
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: star >= 4 ? GREEN : star === 3 ? STAR_COLOR : '#e53935',
                                    borderRadius: 4,
                                  },
                                }}
                              />
                              <Typography sx={{ width: 24, fontSize: 13, color: THEME.muted, textAlign: 'right' }}>
                                {n}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>

                  {/* Individual reviews */}
                  {allReviews.slice(0, showAllReviews ? allReviews.length : 8).map((r, i) => (
                    <Box key={r.id ?? `review-${i}`}>
                      <Divider sx={{ my: 2, borderColor: THEME.line }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 0.75, flexWrap: 'wrap' }}>
                        <RatingBadge value={r.rating} small />
                        <Typography sx={{ fontWeight: 700, fontSize: 14, color: THEME.ink }}>
                          {r.author || r.reviewerName || 'Verified buyer'}
                        </Typography>
                        {r.verified && (
                          <Chip
                            size="small"
                            label="Verified purchase"
                            sx={{ bgcolor: '#e8f5e9', color: GREEN, fontWeight: 600, fontSize: 11, borderRadius: '6px' }}
                          />
                        )}
                        {(r.createdAt || r.date) && (
                          <Typography sx={{ color: THEME.muted, fontSize: 12 }}>
                            {formatReviewDate(r.createdAt || r.date)}
                          </Typography>
                        )}
                        {r.location && (
                          <Typography sx={{ color: THEME.muted, fontSize: 12 }}>
                            · {r.location}
                          </Typography>
                        )}
                      </Box>
                      {r.title && (
                        <Typography sx={{ fontWeight: 700, fontSize: 14.5, mb: 0.5 }}>
                          {r.title}
                        </Typography>
                      )}
                      <Typography
                        sx={{ fontSize: 14.5, lineHeight: 1.65, color: THEME.ink, overflowWrap: 'anywhere' }}
                      >
                        {r.body || r.comment || ''}
                      </Typography>
                    </Box>
                  ))}

                  {/* NEW: show more / fewer reviews */}
                  {allReviews.length > 8 && (
                    <Button
                      onClick={() => setShowAllReviews((v) => !v)}
                      sx={{ mt: 2, textTransform: 'none', fontWeight: 700, color: GREEN, px: 0.5 }}
                    >
                      {showAllReviews ? 'Show fewer reviews' : `Show all ${allReviews.length} reviews`}
                    </Button>
                  )}
                </>
              ) : (
                <Typography sx={{ color: THEME.muted }}>No ratings yet for this product.</Typography>
              )}
            </Section>

            {/* ── Similar products ── */}
            {similarList.length > 0 && (
              <Section title="Similar Products">
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    overflowX: 'auto',
                    pb: 1,
                    scrollSnapType: 'x proximity',
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${THEME.line} transparent`,
                    '&::-webkit-scrollbar': { height: 5 },
                    '&::-webkit-scrollbar-thumb': { bgcolor: THEME.line, borderRadius: 4 },
                  }}
                >
                  {similarList.map((p) => {
                    const pid = p.id ?? p._id;
                    return (
                      <Box
                        key={pid}
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          navigate(`/product/${encodeURIComponent(pid)}`, { state: { product: p } })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ')
                            navigate(`/product/${encodeURIComponent(pid)}`, { state: { product: p } });
                        }}
                        sx={{
                          width: { xs: 148, md: 176 },
                          flexShrink: 0,
                          scrollSnapAlign: 'start',
                          cursor: 'pointer',
                          '&:focus-visible': { outline: `2px solid ${THEME.ink}`, borderRadius: '12px', outlineOffset: 2 },
                        }}
                      >
                        <Box
                          sx={{
                            aspectRatio: '1 / 1',
                            bgcolor: THEME.soft,
                            borderRadius: '12px',
                            overflow: 'hidden',
                            mb: 1,
                            transition: 'transform .2s',
                            '&:hover': { transform: 'translateY(-3px)' },
                          }}
                        >
                          {(p.image ?? p.thumbnail ?? p.images?.[0]) ? (
                            <img
                              src={p.image ?? p.thumbnail ?? p.images?.[0]}
                              alt={p.name ?? p.title}
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                          ) : (
                            <ImageFallback name={p.name ?? p.title} />
                          )}
                        </Box>
                        <Typography
                          noWrap
                          sx={{ fontSize: 13.5, fontWeight: 600, color: THEME.ink }}
                        >
                          {p.name ?? p.title}
                        </Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 800, color: THEME.ink }}>
                          {rupee(p.price)}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Section>
            )}

          </Box>{/* end right col */}
        </Box>{/* end main grid */}
      </Container>

      {/* ══════════ MOBILE / TABLET STICKY ACTION BAR ══════════ */}
      {!isMdUp && (
        <Box
          role="region"
          aria-label="Purchase actions"
          sx={{
            position: 'fixed',
            left: 0, right: 0, bottom: 0,
            zIndex: 1200,
            bgcolor: THEME.surface,
            borderTop: `1px solid ${THEME.line}`,
            px: 1.5,
            pt: 1.25,
            pb: 'calc(10px + env(safe-area-inset-bottom, 0px))',
            boxShadow: '0 -6px 20px rgba(20,21,26,.08)',
          }}
        >
          {actionButtons}
        </Box>
      )}

      {/* ══════════ SNACKBAR TOAST ══════════ */}
      <Snackbar
        open={!!toast}
        autoHideDuration={2800}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: { xs: 86, md: 24 } }}
      >
        <Alert
          onClose={() => setToast(null)}
          severity={toast?.severity || 'success'}
          variant="filled"
          sx={{
            bgcolor: toast?.severity === 'info' ? THEME.ink : THEME.accent,
            fontWeight: 600,
            borderRadius: '10px',
          }}
        >
          {toast?.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

/* ─────────────────────────────────────────────────────────
   SHOWCASE IMAGE  (lazy, error-safe, click-to-view)
───────────────────────────────────────────────────────── */
const ShowcaseImage = ({ src, alt, recolor, onClick }) => {
  const [failed, setFailed] = useState(false);
  const shownSrc = useRecoloredSrc(src, recolor);
  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${alt}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      sx={{
        aspectRatio: '1 / 1',
        bgcolor: THEME.soft,
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform .2s, box-shadow .2s',
        '&:hover': { transform: 'scale(1.02)', boxShadow: '0 6px 20px rgba(20,21,26,.1)' },
        '&:focus-visible': { outline: `2px solid ${THEME.ink}`, outlineOffset: 2 },
      }}
    >
      {src && !failed ? (
        <img
          src={shownSrc}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <ImageFallback name={alt} />
      )}
    </Box>
  );
};

export default ProductDetailsPage;