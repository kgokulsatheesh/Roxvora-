import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Link,
  Rating,
  Divider,
  Tooltip,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  NavigateNext,
  FavoriteBorder,
  Favorite,
  Add,
  Remove,
  ShoppingBagOutlined,
  LocalShippingOutlined,
  VerifiedOutlined,
  ReplayOutlined,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import Reveal from "../../../components/common/Reveal";
import ProductCard from "../../../components/common/ProductCard";
import {
  getProductById,
  getRelatedProducts,
  formatPrice,
} from "../../../data/products";
import { useCart } from "../../../context/CartContext";

/* =========================================================
   COLOURS
========================================================= */
const C = {
  bg: "#F8F6F1",
  bgAlt: "#EEEAE2",
  dark: "#111111",
  text: "#111111",
  muted: "#666666",
  border: "#E6E2DA",
  white: "#FFFFFF",
  hover: "#F3F1EC",
  accent: "#C8392B",
  cardBg: "#EEEBE4",
};

const wrap = {
  width: "100%",
  maxWidth: "1560px",
  mx: "auto",
  px: { xs: 2, sm: 3, md: 5, lg: 7, xl: 8 },
};

/* =========================================================
   CAROUSEL GALLERY
   ─────────────────────────────────────────────────────────
   • Smooth CSS translate-based slide animation
   • Thumbnail strip (vertical on desktop, horizontal mobile)
   • Arrow prev/next
   • Dot indicators
   • goToSlide(idx) — exposed via prop so parent can drive
     the active slide when colour changes
   • Direction-aware: slides from left or right depending
     on whether we're going forward or backward
========================================================= */
function CarouselGallery({ images, productName, activeIndex, onChangeIndex }) {
  /* ── Slide animation state ────────────────────────── */
  const [displayed, setDisplayed] = useState(activeIndex);   // slide currently rendered
  const [entering, setEntering] = useState(null);             // slide sliding in
  const [direction, setDirection] = useState(1);              // 1 = forward, -1 = backward
  const [animating, setAnimating] = useState(false);
  const lockRef = useRef(false);

  /* Whenever the parent drives a new index (colour change or arrow) */
  useEffect(() => {
    if (activeIndex === displayed) return;
    if (lockRef.current) return;

    const dir = activeIndex > displayed ? 1 : -1;
    triggerSlide(activeIndex, dir);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  /* Reset when product changes (new product id) */
  useEffect(() => {
    lockRef.current = false;
    setDisplayed(0);
    setEntering(null);
    setAnimating(false);
    onChangeIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const triggerSlide = useCallback((nextIdx, dir) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setDirection(dir);
    setEntering(nextIdx);
    setAnimating(true);
  }, []);

  /* After CSS transition ends */
  const handleTransitionEnd = useCallback(() => {
    if (entering === null) return;
    setDisplayed(entering);
    setEntering(null);
    setAnimating(false);
    lockRef.current = false;
  }, [entering]);

  const goNext = useCallback(() => {
    const next = (displayed + 1) % images.length;
    onChangeIndex(next);
    triggerSlide(next, 1);
  }, [displayed, images.length, onChangeIndex, triggerSlide]);

  const goPrev = useCallback(() => {
    const prev = (displayed - 1 + images.length) % images.length;
    onChangeIndex(prev);
    triggerSlide(prev, -1);
  }, [displayed, images.length, onChangeIndex, triggerSlide]);

  const goTo = useCallback((idx) => {
    if (idx === displayed || lockRef.current) return;
    const dir = idx > displayed ? 1 : -1;
    onChangeIndex(idx);
    triggerSlide(idx, dir);
  }, [displayed, onChangeIndex, triggerSlide]);

  /* Slide transform values */
  /* displayed = current  → starts at 0, exits to -direction*100% */
  /* entering  = incoming → starts at direction*100%, enters to 0 */
  const displayedStyle = animating
    ? {
      transform: `translateX(${-direction * 100}%)`,
      transition: "transform 0.55s cubic-bezier(0.77,0,0.18,1)",
    }
    : { transform: "translateX(0%)", transition: "none" };

  const enteringStyle = {
    transform: animating ? "translateX(0%)" : `translateX(${direction * 100}%)`,
    transition: animating
      ? "transform 0.55s cubic-bezier(0.77,0,0.18,1)"
      : "none",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 1.5, md: 2 },
        position: { md: "sticky" },
        top: { md: 88 },
      }}
    >
      {/* ── Thumbnail strip ───────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: 1,
          order: { xs: 2, md: 1 },
          overflowX: { xs: "auto", md: "visible" },
          overflowY: { md: "auto" },
          flexShrink: 0,
          pb: { xs: 0.5, md: 0 },
          maxHeight: { md: 580 },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {images.map((img, idx) => (
          <Box
            key={idx}
            component="button"
            onClick={() => goTo(idx)}
            aria-label={`View image ${idx + 1}`}
            sx={{
              width: { xs: 56, md: 68 },
              height: { xs: 68, md: 80 },
              flexShrink: 0,
              overflow: "hidden",
              borderRadius: "2px",
              backgroundColor: C.cardBg,
              border: `1.5px solid ${displayed === idx ? C.dark : "transparent"
                }`,
              cursor: "pointer",
              padding: 0,
              transition: "border-color 0.2s ease, opacity 0.2s ease",
              opacity: displayed === idx ? 1 : 0.55,
              "&:hover": { opacity: 1 },
            }}
          >
            <Box
              component="img"
              src={img}
              alt={`${productName} view ${idx + 1}`}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Box>

      {/* ── Main carousel viewport ────────────────────── */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          borderRadius: "2px",
          backgroundColor: C.cardBg,
          aspectRatio: { xs: "0.85", sm: "0.82", md: "0.78" },
          order: { xs: 1, md: 2 },
          maxHeight: { md: 640, lg: 680 },
        }}
      >
        {/* Current slide */}
        <Box
          onTransitionEnd={handleTransitionEnd}
          sx={{
            position: "absolute",
            inset: 0,
            willChange: "transform",
            ...displayedStyle,
          }}
        >
          <Box
            component="img"
            src={images[displayed]}
            alt={`${productName} — view ${displayed + 1}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </Box>

        {/* Incoming slide */}
        {entering !== null && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              willChange: "transform",
              ...enteringStyle,
            }}
          >
            <Box
              component="img"
              src={images[entering]}
              alt={`${productName} — view ${entering + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          </Box>
        )}

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <IconButton
              onClick={goPrev}
              aria-label="Previous image"
              sx={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                backgroundColor: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(6px)",
                color: C.dark,
                width: { xs: 34, sm: 38 },
                height: { xs: 34, sm: 38 },
                borderRadius: "2px",
                border: `1px solid rgba(0,0,0,0.08)`,
                transition: "background-color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: C.white,
                  transform: "translateY(-50%) scale(1.06)",
                },
              }}
            >
              <ChevronLeft sx={{ fontSize: 20 }} />
            </IconButton>

            <IconButton
              onClick={goNext}
              aria-label="Next image"
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                backgroundColor: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(6px)",
                color: C.dark,
                width: { xs: 34, sm: 38 },
                height: { xs: 34, sm: 38 },
                borderRadius: "2px",
                border: `1px solid rgba(0,0,0,0.08)`,
                transition: "background-color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  backgroundColor: C.white,
                  transform: "translateY(-50%) scale(1.06)",
                },
              }}
            >
              <ChevronRight sx={{ fontSize: 20 }} />
            </IconButton>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 14,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              display: "flex",
              gap: 0.7,
            }}
          >
            {images.map((_, idx) => (
              <Box
                key={idx}
                component="button"
                onClick={() => goTo(idx)}
                aria-label={`Go to image ${idx + 1}`}
                sx={{
                  width: idx === displayed ? 24 : 6,
                  height: 3,
                  borderRadius: "2px",
                  backgroundColor:
                    idx === displayed
                      ? C.white
                      : "rgba(255,255,255,0.45)",
                  border: "none",
                  cursor: "pointer",
                  p: 0,
                  transition:
                    "width 0.35s cubic-bezier(0.22,1,0.36,1), background-color 0.3s ease",
                }}
              />
            ))}
          </Box>
        )}

        {/* Slide counter badge */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
            color: C.white,
            px: 1,
            py: 0.3,
            borderRadius: "2px",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            pointerEvents: "none",
          }}
        >
          {displayed + 1} / {images.length}
        </Box>
      </Box>
    </Box>
  );
}

/* =========================================================
   SIZE SELECTOR
========================================================= */
function SizeSelector({ sizes, selected, onChange }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
      {sizes.map((size) => (
        <Box
          key={size}
          component="button"
          onClick={() => onChange(size)}
          aria-pressed={selected === size}
          sx={{
            px: { xs: 1.4, sm: 1.8 },
            py: { xs: 0.7, sm: 0.9 },
            fontSize: { xs: "10px", sm: "11px" },
            fontWeight: selected === size ? 700 : 500,
            letterSpacing: "0.4px",
            cursor: "pointer",
            backgroundColor: selected === size ? C.dark : "transparent",
            color: selected === size ? C.white : C.text,
            border: `1.5px solid ${selected === size ? C.dark : C.border}`,
            borderRadius: "2px",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: C.dark,
              backgroundColor: selected === size ? C.dark : C.hover,
            },
          }}
        >
          {size}
        </Box>
      ))}
    </Box>
  );
}

/* =========================================================
   COLOR SELECTOR
   ─────────────────────────────────────────────────────────
   When a colour is clicked:
   • The selection updates immediately (no delay)
   • onChangeImage(idx) is called to slide the carousel to
     the image that best matches this colour (uses index
     of the colour in the product.colors array, clamped
     to available images)
========================================================= */
function ColorSelector({ colors, selected, onChange, onChangeImage }) {
  const handleClick = (color, idx) => {
    onChange(color.name);
    /* Map colour index → nearest available image */
    const imageIdx = Math.min(idx, (/* images.length provided via closure */ 999));
    onChangeImage(idx);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {colors.map((color, idx) => {
        const isSelected = selected === color.name;
        return (
          <Tooltip key={color.name} title={color.name} placement="top" arrow>
            <Box
              component="button"
              onClick={() => handleClick(color, idx)}
              aria-pressed={isSelected}
              aria-label={color.name}
              sx={{
                position: "relative",
                width: { xs: 30, sm: 34 },
                height: { xs: 30, sm: 34 },
                borderRadius: "50%",
                backgroundColor: color.hex,
                /* Ring when selected */
                boxShadow: isSelected
                  ? `0 0 0 2.5px ${C.white}, 0 0 0 4.5px ${C.dark}`
                  : "none",
                border:
                  color.hex === "#FFFFFF" ||
                    color.hex === "#FAFAF8" ||
                    color.hex === "#F5F5F0"
                    ? `1.5px solid #CCCCCC`
                    : `1.5px solid rgba(0,0,0,0.10)`,
                cursor: "pointer",
                padding: 0,
                transition:
                  "transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s ease",
                "&:hover": {
                  transform: "scale(1.18)",
                },
              }}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
}

/* =========================================================
   QUANTITY SELECTOR
========================================================= */
function QuantitySelector({ value, onChange, max }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        border: `1.5px solid ${C.border}`,
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label="Decrease quantity"
        sx={{
          width: { xs: 36, sm: 40 },
          height: { xs: 36, sm: 40 },
          borderRadius: 0,
          color: C.text,
          "&:hover": { backgroundColor: C.hover },
          "&.Mui-disabled": { color: "#CCCCCC" },
        }}
      >
        <Remove sx={{ fontSize: 14 }} />
      </IconButton>

      <Box
        component="span"
        sx={{
          minWidth: { xs: 36, sm: 44 },
          textAlign: "center",
          fontSize: "13px",
          fontWeight: 600,
          color: C.text,
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        {value}
      </Box>

      <IconButton
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        sx={{
          width: { xs: 36, sm: 40 },
          height: { xs: 36, sm: 40 },
          borderRadius: 0,
          color: C.text,
          "&:hover": { backgroundColor: C.hover },
          "&.Mui-disabled": { color: "#CCCCCC" },
        }}
      >
        <Add sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  );
}

/* =========================================================
   DELIVERY INFO ROW
========================================================= */
function DeliveryRow({ icon, title, sub }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        py: 1.2,
        borderBottom: `1px solid ${C.border}`,
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Box sx={{ color: C.muted, mt: 0.1, flexShrink: 0 }}>{icon}</Box>
      <Box>
        <Typography sx={{ fontSize: "11px", fontWeight: 600, color: C.text, mb: 0.2 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: "10px", color: C.muted, lineHeight: 1.6 }}>
          {sub}
        </Typography>
      </Box>
    </Box>
  );
}

/* =========================================================
   PRODUCT DETAILS PAGE
========================================================= */
export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = getProductById(id);
  const related = product ? getRelatedProducts(product, 4) : [];

  /* ── Selection state ──────────────────────────────── */
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  /* ── Carousel index — driven by both arrows and colour clicks */
  const [carouselIndex, setCarouselIndex] = useState(0);

  /* Reset when navigating to a different product */
  useEffect(() => {
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
    setSizeError(false);
    setColorError(false);
    setCarouselIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  /* ── 404 guard ────────────────────────────────────── */
  if (!product) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          p: 4,
          backgroundColor: C.bg,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: { xs: "30px", md: "44px" },
            color: C.text,
          }}
        >
          Product not found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/shop")}
          sx={{
            backgroundColor: C.dark,
            color: C.white,
            borderRadius: "2px",
            px: 3.5,
            py: 1.3,
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            "&:hover": { backgroundColor: "#2a2a2a" },
          }}
        >
          BACK TO SHOP
        </Button>
      </Box>
    );
  }

  /* ── Colour → image mapping ───────────────────────── */
  /* Each colour is mapped to its own image index (clamped to
     available images so we never go out of bounds). */
  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    setColorError(false);
  };

  const handleColorImageChange = (colorIdx) => {
    /* Use the colour's position to pick an image.
       If the product only has 1 or 2 images, wrap around. */
    const imgIdx = colorIdx % product.images.length;
    setCarouselIndex(imgIdx);
  };

  /* ── Validation ───────────────────────────────────── */
  const validate = () => {
    let ok = true;
    if (!selectedSize) { setSizeError(true); ok = false; }
    if (!selectedColor) { setColorError(true); ok = false; }
    return ok;
  };

  const handleAddToBag = () => {
    if (!validate()) return;
    addItem(product, selectedSize, selectedColor, quantity);
    navigate("/bag");
  };

  const handleBuyNow = () => {
    if (!validate()) return;
    addItem(product, selectedSize, selectedColor, quantity);
    navigate("/checkout");
  };

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        backgroundColor: C.bg,
        color: C.text,
        minHeight: "100vh",
      }}
    >
      {/* ── BREADCRUMB ─────────────────────────────────── */}
      <Box sx={{ borderBottom: `1px solid ${C.border}`, backgroundColor: C.white }}>
        <Container maxWidth={false} sx={{ ...wrap, py: 1.5 }}>
          <Breadcrumbs
            separator={<NavigateNext sx={{ fontSize: 13, color: "#BBBBBB" }} />}
          >
            <Link
              component="button"
              onClick={() => navigate("/")}
              underline="hover"
              sx={{ fontSize: "9px", letterSpacing: "0.8px", color: C.muted, cursor: "pointer", border: "none", background: "none", p: 0, fontFamily: "inherit" }}
            >
              HOME
            </Link>
            <Link
              component="button"
              onClick={() => navigate("/shop")}
              underline="hover"
              sx={{ fontSize: "9px", letterSpacing: "0.8px", color: C.muted, cursor: "pointer", border: "none", background: "none", p: 0, fontFamily: "inherit" }}
            >
              SHOP
            </Link>
            <Link
              component="button"
              onClick={() => navigate(`/shop/category/${product.categorySlug}`)}
              underline="hover"
              sx={{ fontSize: "9px", letterSpacing: "0.8px", color: C.muted, cursor: "pointer", border: "none", background: "none", p: 0, fontFamily: "inherit" }}
            >
              {product.category.toUpperCase()}
            </Link>
            <Typography sx={{ fontSize: "9px", letterSpacing: "0.8px", color: C.text, fontWeight: 600 }}>
              {product.name.toUpperCase()}
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* ── PRODUCT SECTION ────────────────────────────── */}
      <Container maxWidth={false} sx={{ ...wrap, pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1.05fr 0.95fr" },
            gap: { xs: 4, sm: 5, md: 6, lg: 8 },
            alignItems: "start",
          }}
        >
          {/* ── LEFT: Carousel Gallery ─────────────────── */}
          <Reveal delay={0} direction="left" distance={30} duration={0.75} threshold={0.04}>
            <CarouselGallery
              images={product.images}
              productName={product.name}
              activeIndex={carouselIndex}
              onChangeIndex={setCarouselIndex}
            />
          </Reveal>

          {/* ── RIGHT: Info panel ─────────────────────── */}
          <Box>
            {/* Category + name */}
            <Reveal delay={0.08} direction="up" distance={20} duration={0.55}>
              <Typography
                sx={{
                  fontSize: "8px",
                  letterSpacing: "2px",
                  fontWeight: 600,
                  color: C.muted,
                  textTransform: "uppercase",
                  mb: 0.8,
                }}
              >
                {product.category}
              </Typography>
              <Typography
                component="h1"
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: { xs: "26px", sm: "32px", md: "34px", lg: "38px", xl: "42px" },
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: C.text,
                  mb: 1.5,
                  letterSpacing: "-0.5px",
                }}
              >
                {product.name}
              </Typography>
            </Reveal>

            {/* Rating */}
            <Reveal delay={0.14} direction="up" distance={16} duration={0.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Rating
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{
                    fontSize: "14px",
                    "& .MuiRating-iconFilled": { color: C.dark },
                    "& .MuiRating-iconEmpty": { color: "#DDD" },
                  }}
                />
                <Typography sx={{ fontSize: "11px", color: C.muted }}>
                  {product.rating} ({product.reviewCount} reviews)
                </Typography>
              </Box>
            </Reveal>

            {/* Price */}
            <Reveal delay={0.20} direction="up" distance={14} duration={0.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.8, flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: { xs: "26px", sm: "30px" }, fontWeight: 700, color: C.text, lineHeight: 1 }}>
                  {formatPrice(product.price)}
                </Typography>
                {product.originalPrice > product.price && (
                  <>
                    <Typography sx={{ fontSize: "16px", color: C.muted, textDecoration: "line-through", lineHeight: 1 }}>
                      {formatPrice(product.originalPrice)}
                    </Typography>
                    <Chip
                      label={`${product.discount}% OFF`}
                      size="small"
                      sx={{ backgroundColor: C.dark, color: C.white, fontSize: "9px", fontWeight: 700, height: 22, borderRadius: "2px" }}
                    />
                  </>
                )}
              </Box>
              <Typography sx={{ fontSize: "10px", color: C.muted, mb: 2.5 }}>
                Inclusive of all taxes.{" "}
                <Box component="span" sx={{ color: C.dark, fontWeight: 600 }}>
                  Free shipping above ₹999
                </Box>
              </Typography>
            </Reveal>

            <Divider sx={{ borderColor: C.border, mb: 2.5 }} />

            {/* Stock status */}
            <Reveal delay={0.25} direction="up" distance={12} duration={0.5}>
              {isOutOfStock ? (
                <Chip label="OUT OF STOCK" sx={{ backgroundColor: "#F5EAEA", color: C.accent, fontSize: "9px", fontWeight: 700, height: 24, borderRadius: "2px", letterSpacing: "0.5px", mb: 2.5 }} />
              ) : isLowStock ? (
                <Chip label={`ONLY ${product.stock} LEFT`} sx={{ backgroundColor: "#FEF3EE", color: "#B85B20", fontSize: "9px", fontWeight: 700, height: 24, borderRadius: "2px", letterSpacing: "0.5px", mb: 2.5 }} />
              ) : (
                <Chip label="IN STOCK" sx={{ backgroundColor: "#EDFAF3", color: "#1A7A4A", fontSize: "9px", fontWeight: 700, height: 24, borderRadius: "2px", letterSpacing: "0.5px", mb: 2.5 }} />
              )}
            </Reveal>

            {/* ── COLOUR SELECTION ──────────────────────── */}
            <Reveal delay={0.30} direction="up" distance={12} duration={0.5}>
              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      letterSpacing: "1.2px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: colorError ? C.accent : C.text,
                    }}
                  >
                    COLOUR
                    {selectedColor && (
                      <Box
                        component="span"
                        sx={{
                          fontWeight: 400,
                          textTransform: "none",
                          letterSpacing: 0,
                          color: C.muted,
                          ml: 1,
                          fontSize: "10px",
                          /* Smooth fade-in when colour name changes */
                          animation: "colourNameFade 0.3s ease",
                          "@keyframes colourNameFade": {
                            from: { opacity: 0, transform: "translateX(-4px)" },
                            to: { opacity: 1, transform: "translateX(0)" },
                          },
                        }}
                      >
                        — {selectedColor}
                      </Box>
                    )}
                  </Typography>
                  {colorError && !selectedColor && (
                    <Typography sx={{ fontSize: "9px", color: C.accent, fontWeight: 600 }}>
                      Please select a colour
                    </Typography>
                  )}
                </Box>

                {/* Live colour preview swatch row */}
                {selectedColor && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.2,
                      animation: "colourPreviewIn 0.25s ease",
                      "@keyframes colourPreviewIn": {
                        from: { opacity: 0, transform: "translateY(-4px)" },
                        to: { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        backgroundColor:
                          product.colors.find((c) => c.name === selectedColor)?.hex ?? "#CCC",
                        border: "1.5px solid rgba(0,0,0,0.12)",
                        flexShrink: 0,
                        transition: "background-color 0.2s ease",
                      }}
                    />
                    <Typography sx={{ fontSize: "10px", color: C.muted }}>
                      {selectedColor}
                    </Typography>
                  </Box>
                )}

                <ColorSelector
                  colors={product.colors}
                  selected={selectedColor}
                  onChange={handleColorChange}
                  onChangeImage={handleColorImageChange}
                />
              </Box>
            </Reveal>

            {/* ── SIZE SELECTION ────────────────────────── */}
            <Reveal delay={0.36} direction="up" distance={12} duration={0.5}>
              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      letterSpacing: "1.2px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: sizeError ? C.accent : C.text,
                    }}
                  >
                    SIZE
                    {selectedSize && (
                      <Box
                        component="span"
                        sx={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: C.muted, ml: 1, fontSize: "10px" }}
                      >
                        — {selectedSize}
                      </Box>
                    )}
                  </Typography>
                  {sizeError && !selectedSize && (
                    <Typography sx={{ fontSize: "9px", color: C.accent, fontWeight: 600 }}>
                      Please select a size
                    </Typography>
                  )}
                </Box>
                <SizeSelector
                  sizes={product.sizes}
                  selected={selectedSize}
                  onChange={(s) => { setSelectedSize(s); setSizeError(false); }}
                />
              </Box>
            </Reveal>

            {/* Quantity */}
            <Reveal delay={0.42} direction="up" distance={12} duration={0.5}>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: "10px", letterSpacing: "1.2px", fontWeight: 700, textTransform: "uppercase", color: C.text, mb: 1 }}>
                  QUANTITY
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock || 10} />
                  {product.stock > 0 && (
                    <Typography sx={{ fontSize: "10px", color: C.muted }}>
                      {product.stock} available
                    </Typography>
                  )}
                </Box>
              </Box>
            </Reveal>

            {/* CTA buttons */}
            <Reveal delay={0.48} direction="up" distance={14} duration={0.5}>
              <Stack spacing={1.2} sx={{ mb: 2.5 }}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={isOutOfStock}
                  onClick={handleAddToBag}
                  startIcon={<ShoppingBagOutlined />}
                  sx={{
                    backgroundColor: C.dark,
                    color: C.white,
                    borderRadius: "2px",
                    py: { xs: 1.5, sm: 1.6 },
                    fontSize: { xs: "10px", sm: "11px" },
                    fontWeight: 700,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    transition: "background-color 0.25s ease, transform 0.2s ease",
                    "&:hover": { backgroundColor: "#2a2a2a", transform: "translateY(-1px)" },
                    "&:active": { transform: "translateY(0)" },
                    "&.Mui-disabled": { backgroundColor: "#DDDDDD", color: "#AAAAAA" },
                  }}
                >
                  {isOutOfStock ? "OUT OF STOCK" : "ADD TO BAG"}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  disabled={isOutOfStock}
                  onClick={handleBuyNow}
                  sx={{
                    borderColor: C.dark,
                    color: C.dark,
                    borderRadius: "2px",
                    py: { xs: 1.5, sm: 1.6 },
                    fontSize: { xs: "10px", sm: "11px" },
                    fontWeight: 700,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    transition: "background-color 0.25s ease, transform 0.2s ease",
                    "&:hover": { backgroundColor: C.hover, borderColor: C.dark, transform: "translateY(-1px)" },
                    "&:active": { transform: "translateY(0)" },
                    "&.Mui-disabled": { borderColor: "#DDDDDD", color: "#AAAAAA" },
                  }}
                >
                  BUY NOW
                </Button>

                <Button
                  fullWidth
                  variant="text"
                  onClick={() => setWishlisted((p) => !p)}
                  startIcon={
                    wishlisted
                      ? <Favorite sx={{ fontSize: "16px !important", color: C.accent }} />
                      : <FavoriteBorder sx={{ fontSize: "16px !important" }} />
                  }
                  sx={{
                    color: C.muted,
                    borderRadius: "2px",
                    py: 1,
                    fontSize: { xs: "9px", sm: "10px" },
                    fontWeight: 600,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    "&:hover": { backgroundColor: C.hover, color: C.dark },
                  }}
                >
                  {wishlisted ? "SAVED TO WISHLIST" : "SAVE TO WISHLIST"}
                </Button>
              </Stack>
            </Reveal>

            {/* Delivery info */}
            <Reveal delay={0.54} direction="up" distance={12} duration={0.5}>
              <Box
                sx={{
                  border: `1px solid ${C.border}`,
                  borderRadius: "2px",
                  p: 2,
                  mb: 2.5,
                  backgroundColor: C.white,
                }}
              >
                <DeliveryRow
                  icon={<LocalShippingOutlined sx={{ fontSize: 18 }} />}
                  title="Free Delivery on orders above ₹999"
                  sub="Standard delivery 3–5 business days. Express available at checkout."
                />
                <DeliveryRow
                  icon={<VerifiedOutlined sx={{ fontSize: 18 }} />}
                  title="Genuine ROXVORA product"
                  sub="100% authentic. Every piece quality-checked before dispatch."
                />
                <DeliveryRow
                  icon={<ReplayOutlined sx={{ fontSize: 18 }} />}
                  title="Easy 14-day returns"
                  sub="Unworn, with tags. Initiate a return directly from your account."
                />
              </Box>
            </Reveal>

            {/* Description + Specs accordions */}
            <Reveal delay={0.60} direction="up" distance={12} duration={0.5}>
              <Box>
                <Accordion
                  defaultExpanded
                  elevation={0}
                  disableGutters
                  square
                  sx={{
                    backgroundColor: "transparent",
                    border: `1px solid ${C.border}`,
                    borderRadius: "2px !important",
                    mb: 1,
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ fontSize: 18 }} />}
                    sx={{ px: 2, minHeight: 44, "& .MuiAccordionSummary-content": { my: "10px" } }}
                  >
                    <Typography sx={{ fontSize: "10px", letterSpacing: "1.5px", fontWeight: 700, textTransform: "uppercase", color: C.text }}>
                      DESCRIPTION
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                    <Typography sx={{ fontSize: "12px", color: C.muted, lineHeight: 1.85, mb: 1.5 }}>
                      {product.description}
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {product.details.map((d) => (
                        <Box key={d} component="li" sx={{ fontSize: "11px", color: C.muted, lineHeight: 1.8, "&::marker": { color: C.dark } }}>
                          {d}
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  elevation={0}
                  disableGutters
                  square
                  sx={{
                    backgroundColor: "transparent",
                    border: `1px solid ${C.border}`,
                    borderRadius: "2px !important",
                    mb: 1,
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ fontSize: 18 }} />}
                    sx={{ px: 2, minHeight: 44, "& .MuiAccordionSummary-content": { my: "10px" } }}
                  >
                    <Typography sx={{ fontSize: "10px", letterSpacing: "1.5px", fontWeight: 700, textTransform: "uppercase", color: C.text }}>
                      SPECIFICATIONS
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                    <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
                      <Box component="tbody">
                        {Object.entries(product.specs).map(([key, val]) => (
                          <Box
                            key={key}
                            component="tr"
                            sx={{ "&:not(:last-child) td": { borderBottom: `1px solid ${C.border}` } }}
                          >
                            <Box component="td" sx={{ fontSize: "10px", fontWeight: 700, color: C.text, py: 0.9, pr: 2, width: "38%", verticalAlign: "top" }}>
                              {key}
                            </Box>
                            <Box component="td" sx={{ fontSize: "10px", color: C.muted, py: 0.9, verticalAlign: "top" }}>
                              {val}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Reveal>
          </Box>
        </Box>
      </Container>

      {/* ── RELATED PRODUCTS ───────────────────────────────── */}
      {related.length > 0 && (
        <Box
          component="section"
          sx={{
            py: { xs: 7, sm: 9, md: 11 },
            backgroundColor: C.bgAlt,
            borderTop: `1px solid ${C.border}`,
          }}
        >
          <Container maxWidth={false} sx={wrap}>
            <Reveal delay={0} direction="up" distance={22} duration={0.6}>
              <Box sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
                <Typography sx={{ fontSize: { xs: "8px", sm: "9px" }, letterSpacing: "2.5px", fontWeight: 600, color: "#999", mb: 1, textTransform: "uppercase" }}>
                  YOU MAY ALSO LIKE
                </Typography>
                <Typography
                  component="h2"
                  sx={{
                    fontFamily: "Georgia, serif",
                    fontSize: { xs: "28px", sm: "36px", md: "44px", lg: "50px" },
                    lineHeight: 0.96,
                    letterSpacing: { xs: "-0.5px", md: "-1px" },
                    color: C.text,
                    fontWeight: 400,
                  }}
                >
                  RELATED PRODUCTS
                </Typography>
              </Box>
            </Reveal>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0,1fr))",
                  sm: "repeat(2, minmax(0,1fr))",
                  md: "repeat(4, minmax(0,1fr))",
                },
                gap: { xs: "14px 10px", sm: "20px 16px", md: "24px 18px" },
                alignItems: "stretch",
              }}
            >
              {related.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} reveal />
              ))}
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
}
