import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { FiCheck, FiHeart, FiImage, FiShoppingBag, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const THEME = {
  ink: '#14151A',
  muted: '#6B6F7A',
  canvas: '#F6F5F2',
  surface: '#FFFFFF',
  line: '#E6E4DE',
  soft: '#F0EEE9',
  accent: '#0E6B5C', // discounts, "in stock", primary highlights
  rating: '#1F8A4C',
  danger: '#C2255C',
};

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

/** Normalises whatever shape your API/store returns so the card never crashes. */
const normalise = (p) => {
  const price = Number(p.price) || 0;
  const original = Number(p.originalPrice ?? p.oldPrice ?? p.mrp) || 0;
  const firstImage = Array.isArray(p.images) ? p.images[0] : undefined;
  const secondImage = Array.isArray(p.images) ? p.images[1] : undefined;
  const reviews = Array.isArray(p.reviews) ? p.reviews.length : p.reviewCount ?? p.reviews ?? 0;

  const image = p.image ?? (typeof firstImage === 'string' ? firstImage : firstImage?.url);
  const hover = typeof secondImage === 'string' ? secondImage : secondImage?.url;

  return {
    id: p.id ?? p._id,
    name: p.name ?? p.title ?? 'Untitled product',
    category: p.category,
    image,
    // NEW: second photo shown when the mouse is over the card
    hoverImage: hover && hover !== image ? hover : undefined,
    price,
    original: original > price ? original : 0,
    discount: original > price ? Math.round(((original - price) / original) * 100) : 0,
    rating: Number(p.rating) || 0,
    reviews: Number(reviews) || 0,
    colors: (p.colors || []).map((c) => (typeof c === 'string' ? { value: c } : c)),
    sizes: p.sizes || [],
    highlights: p.highlights || p.features || [],
    outOfStock: p.stock === 0,
    lowStock: typeof p.stock === 'number' && p.stock > 0 && p.stock <= 5,
    isNew: !!p.isNew,
    isBestSeller: !!p.isBestSeller,
  };
};

const Badge = ({ children, bg, color = '#fff' }) => (
  <Box
    component="span"
    sx={{
      bgcolor: bg,
      color,
      fontSize: 11,
      fontWeight: 700,
      lineHeight: 1,
      px: 1,
      py: 0.6,
      borderRadius: '6px',
      letterSpacing: 0.2,
    }}
  >
    {children}
  </Box>
);

const RatingPill = ({ rating, reviews }) => {
  if (!rating) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.4,
          bgcolor: THEME.rating,
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          px: 0.8,
          py: 0.3,
          borderRadius: '6px',
        }}
      >
        {rating.toFixed(1)}
        <FiStar size={11} style={{ fill: '#fff' }} />
      </Box>
      {reviews > 0 && (
        <Typography sx={{ fontSize: 12, color: THEME.muted }}>
          ({reviews.toLocaleString('en-IN')})
        </Typography>
      )}
    </Box>
  );
};

const ColorDots = ({ colors }) =>
  colors.length === 0 ? null : (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
      {colors.slice(0, 5).map((c, i) => (
        <Tooltip key={`${c.value}-${i}`} title={c.name || c.value} arrow>
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              bgcolor: c.value,
              border: `1px solid ${THEME.line}`,
              outline: '1px solid transparent',
            }}
          />
        </Tooltip>
      ))}
      {colors.length > 5 && (
        <Typography sx={{ fontSize: 11, color: THEME.muted }}>+{colors.length - 5}</Typography>
      )}
    </Box>
  );

const PriceBlock = ({ item, size = 'md' }) => (
  <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', columnGap: 1, rowGap: 0 }}>
    <Typography
      sx={{ fontWeight: 800, fontSize: size === 'lg' ? { xs: 20, sm: 24 } : { xs: 15, sm: 17 }, color: THEME.ink }}
    >
      {formatPrice(item.price)}
    </Typography>
    {item.original > 0 && (
      <Typography sx={{ fontSize: 12.5, color: THEME.muted, textDecoration: 'line-through' }}>
        {formatPrice(item.original)}
      </Typography>
    )}
    {item.discount > 0 && (
      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: THEME.accent }}>
        {item.discount}% off
      </Typography>
    )}
  </Box>
);

/** Image area shared by both variants (with graceful fallback for broken URLs). */
const Media = ({ item, wished, onToggleWish, onOpen, children, sx }) => {
  const [failed, setFailed] = useState(false);

  return (
    <Box
      onClick={onOpen}
      sx={{
        position: 'relative',
        bgcolor: THEME.soft,
        overflow: 'hidden',
        cursor: onOpen ? 'pointer' : 'default',
        ...sx,
      }}
    >
      {item.image && !failed ? (
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          loading="lazy"
          onError={() => setFailed(true)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform .6s cubic-bezier(.2,.7,.2,1)',
            '.product-card:hover &': { transform: 'scale(1.05)' },
            filter: item.outOfStock ? 'grayscale(1)' : 'none',
            opacity: item.outOfStock ? 0.6 : 1,
          }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            color: THEME.muted,
          }}
        >
          <FiImage size={28} />
          <Typography sx={{ fontSize: 12, px: 2, textAlign: 'center' }}>{item.name}</Typography>
        </Box>
      )}

      {/* NEW: second image fades in on hover (mouse devices only) */}
      {item.hoverImage && item.image && !failed && !item.outOfStock && (
        <Box
          component="img"
          src={item.hoverImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0,
            transition: 'opacity .3s ease',
            pointerEvents: 'none',
            '@media (hover: hover)': {
              '.product-card:hover &': { opacity: 1 },
            },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }}
        />
      )}

      <Box sx={{ position: 'absolute', top: 10, left: 10, display: 'flex', flexDirection: 'column', gap: 0.6, alignItems: 'flex-start' }}>
        {item.isNew && <Badge bg={THEME.ink}>New</Badge>}
        {item.isBestSeller && <Badge bg="#B7791F">Best seller</Badge>}
      </Box>

      <Tooltip title={wished ? 'Remove from wishlist' : 'Add to wishlist'}>
        <IconButton
          aria-label="Toggle wishlist"
          aria-pressed={wished}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWish?.(item.id);
          }}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255,255,255,.92)',
            color: wished ? THEME.danger : THEME.ink,
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          <FiHeart size={16} style={{ fill: wished ? 'currentColor' : 'none' }} />
        </IconButton>
      </Tooltip>

      {item.outOfStock && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              bgcolor: 'rgba(20,21,26,.88)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              px: 1.5,
              py: 0.6,
              borderRadius: '6px',
            }}
          >
            Currently unavailable
          </Typography>
        </Box>
      )}

      {children}
    </Box>
  );
};

const ProductCard = ({ product, variant = 'grid', wished = false, onToggleWish, onAddToCart, onOpen }) => {
  const item = normalise(product);
  const navigate = useNavigate();
  const [cartState, setCartState] = useState('idle'); // 'idle' | 'success'

  /* NEW: clicking the image or the name opens the product details page.
     Pass your own `onOpen` prop to override. */
  const openDetails = () => {
    if (onOpen) {
      onOpen(product);
      return;
    }
    if (item.id === undefined || item.id === null) return;
    navigate(`/product/${encodeURIComponent(item.id)}`, { state: { product } });
  };

  const titleLinkProps = {
    role: 'link',
    tabIndex: 0,
    onClick: openDetails,
    onKeyDown: (e) => {
      if (e.key === 'Enter') openDetails();
    },
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (cartState === 'success') return;
    
    setCartState('success');
    onAddToCart?.(product);

    // Revert back after 2 seconds if desired, or keep it active
    setTimeout(() => {
      setCartState('idle');
    }, 2000);
  };

  /* ---------- LIST (Flipkart-style horizontal row) ---------- */
  if (variant === 'list') {
    const specs = item.highlights.length
      ? item.highlights.slice(0, 4)
      : [
          item.category && `Category: ${item.category}`,
          item.sizes.length && `Sizes: ${item.sizes.join(', ')}`,
          item.colors.length && `${item.colors.length} colour options`,
        ].filter(Boolean);

    return (
      <Paper
        className="product-card"
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          borderRadius: '16px',
          border: `1px solid ${THEME.line}`,
          overflow: 'hidden',
          bgcolor: THEME.surface,
          transition: 'box-shadow .25s ease, border-color .25s ease',
          '&:hover': { boxShadow: '0 12px 32px rgba(20,21,26,.08)', borderColor: '#D5D2C9' },
        }}
      >
        <Media
          item={item}
          wished={wished}
          onToggleWish={onToggleWish}
          onOpen={openDetails}
          sx={{
            width: { xs: '100%', sm: 210, md: 240 },
            flexShrink: 0,
            aspectRatio: { xs: '16 / 11', sm: '1 / 1' },
            alignSelf: { sm: 'stretch' },
            minHeight: { sm: 210 },
          }}
        />

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            p: { xs: 2, md: 2.5 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 1.5, md: 3 },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontSize: 12, color: THEME.muted }}>{item.category}</Typography>
            <Typography
              {...titleLinkProps}
              sx={{
                fontWeight: 700,
                fontSize: { xs: 16, md: 18 },
                color: THEME.ink,
                lineHeight: 1.3,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
                '&:focus-visible': { outline: `2px solid ${THEME.ink}`, outlineOffset: 2, borderRadius: '4px' },
              }}
            >
              {item.name}
            </Typography>
            <RatingPill rating={item.rating} reviews={item.reviews} />
            <Box component="ul" sx={{ m: 0, pl: 2.2, color: '#3A3D46', fontSize: 13.5, lineHeight: 1.8 }}>
              {specs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </Box>
            <ColorDots colors={item.colors} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              minWidth: { md: 200 },
              borderTop: { xs: `1px solid ${THEME.line}`, md: 'none' },
              pt: { xs: 1.5, md: 0 },
            }}
          >
            <PriceBlock item={item} size="lg" />
            {item.lowStock && (
              <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: THEME.danger }}>Only few left</Typography>
            )}
            {!item.outOfStock && !item.lowStock && (
              <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: THEME.accent }}>In stock</Typography>
            )}
            <Button
              variant="contained"
              disableElevation
              disabled={item.outOfStock}
              onClick={handleAddToCartClick}
              sx={{
                mt: { md: 'auto' },
                bgcolor: cartState === 'success' ? '#1F8A4C' : THEME.ink,
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 700,
                py: 1,
                transition: 'background-color 0.3s ease',
                '&:hover': { bgcolor: cartState === 'success' ? '#176F3C' : '#2A2C35' },
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {cartState === 'success' ? (
                  <motion.span
                    key="success"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#fff', color: '#1F8A4C' }}
                    >
                      <FiCheck size={12} strokeWidth={3} />
                    </motion.span>
                    Added to bag
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <FiShoppingBag size={16} /> Add to bag
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </Box>
        </Box>
      </Paper>
    );
  }

  /* ---------- GRID (vertical card) ---------- */
  return (
    <Paper
      className="product-card"
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: `1px solid ${THEME.line}`,
        overflow: 'hidden',
        bgcolor: THEME.surface,
        transition: 'box-shadow .25s ease, transform .25s ease',
        '&:hover': {
          boxShadow: '0 14px 34px rgba(20,21,26,.10)',
          transform: { md: 'translateY(-3px)' },
          '& .quick-add': { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Media
        item={item}
        wished={wished}
        onToggleWish={onToggleWish}
        onOpen={openDetails}
        sx={{ aspectRatio: '4 / 5' }}
      >
        {item.discount > 0 && !item.outOfStock && (
          <Box sx={{ position: 'absolute', left: 10, bottom: 10 }}>
            <Badge bg={THEME.accent}>{item.discount}% off</Badge>
          </Box>
        )}
        {!item.outOfStock && (
          <Button
            className="quick-add"
            size="small"
            variant="contained"
            disableElevation
            onClick={handleAddToCartClick}
            sx={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              minWidth: 0,
              bgcolor: cartState === 'success' ? '#1F8A4C' : THEME.ink,
              borderRadius: '10px',
              px: 1.4,
              py: 0.6,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: 12.5,
              opacity: cartState === 'success' ? 1 : 0,
              transform: cartState === 'success' ? 'translateY(0)' : 'translateY(8px)',
              transition: 'all .25s ease',
              '@media (hover: none)': { opacity: 1, transform: 'none' }, // always visible on touch devices
              '&:hover': { bgcolor: cartState === 'success' ? '#176F3C' : '#2A2C35' },
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {cartState === 'success' ? (
                <motion.span
                  key="grid-success"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#fff', color: '#1F8A4C' }}
                  >
                    <FiCheck size={10} strokeWidth={3} />
                  </motion.span>
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="grid-idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <FiShoppingBag size={14} /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        )}
      </Media>

      <Box sx={{ p: { xs: 1.5, sm: 2 }, display: 'flex', flexDirection: 'column', gap: 0.9, flex: 1 }}>
        <Typography sx={{ fontSize: 12, color: THEME.muted }}>{item.category}</Typography>
        <Typography
          {...titleLinkProps}
          sx={{
            fontWeight: 700,
            fontSize: { xs: 14, sm: 15 },
            lineHeight: 1.3,
            color: THEME.ink,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: { xs: 36, sm: 39 },
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
            '&:focus-visible': { outline: `2px solid ${THEME.ink}`, outlineOffset: 2, borderRadius: '4px' },
          }}
        >
          {item.name}
        </Typography>
        <RatingPill rating={item.rating} reviews={item.reviews} />
        <Box sx={{ mt: 'auto', pt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.8 }}>
          <PriceBlock item={item} />
          <ColorDots colors={item.colors} />
        </Box>
      </Box>
    </Paper>
  );
};

export default memo(ProductCard);