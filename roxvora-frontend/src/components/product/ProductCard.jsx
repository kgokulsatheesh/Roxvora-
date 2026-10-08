import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Rating,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  ShoppingBagOutlined,
  ArrowForward,
} from "@mui/icons-material";
import Reveal from "../common/Reveal";
import { formatPrice } from "../../utils/formatCurrency";
import { useCart } from "../../hooks/useCart";

/* =========================================================
   COLOURS
========================================================= */
const C = {
  bg: "#F8F6F1",
  dark: "#111111",
  text: "#111111",
  muted: "#666666",
  border: "#E6E2DA",
  white: "#FFFFFF",
  cardBg: "#EEEBE4",
  accent: "#C8392B",
};

/* =========================================================
   PREMIUM PRODUCT CARD
   ─────────────────────────────────────────────────────────
   Props:
     product   — product object from products.js
     index     — stagger index for reveal delay
     reveal    — whether to wrap in <Reveal> (default true)
========================================================= */
export default function ProductCard({ product, index = 0, reveal = true }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const baseDelay = 0.04 + index * 0.1;

  /* Navigate to product detail */
  const goToProduct = () => navigate(`/product/${product.id}`);

  /* Quick add — picks first size & first color, then goes to cart */
  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const size = product.sizes?.[2] ?? product.sizes?.[0] ?? "";
    const color = product.colors?.[0]?.name ?? "";
    addItem({
      ...product,
      variantId: `${product.id}-${size}-${color}`,
      size,
      color,
      quantity: 1,
      image: product.images?.[0] ?? product.image ?? "",
    });

    /* brief visual feedback before navigating */
    setAddedFeedback(true);
    setTimeout(() => {
      navigate("/cart");
    }, 320);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  const discountLabel =
    product.discount > 0 ? `${product.discount}% OFF` : null;

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const inner = (
    <Box
      onClick={goToProduct}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") goToProduct();
      }}
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        /* card lift on hover */
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
        "&:hover": {
          transform: "translateY(-4px)",
        },
        "&:focus-visible": {
          outline: `2px solid ${C.dark}`,
          outlineOffset: "2px",
          borderRadius: "2px",
        },
      }}
    >
      {/* ── IMAGE WRAPPER ──────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: C.cardBg,
          borderRadius: "2px",
          aspectRatio: { xs: "0.78", sm: "0.80", md: "0.78" },
          mb: { xs: 1.4, sm: 1.6 },
          flexShrink: 0,
        }}
      >
        {/* Product image */}
        <Box
          component="img"
          src={product.images?.[0] ?? product.image}
          alt={product.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            transition: "transform 0.60s cubic-bezier(0.22,1,0.36,1)",
            "&:hover": { transform: "scale(1.07)" },
          }}
        />

        {/* Discount badge */}
        {discountLabel && (
          <Box
            sx={{
              position: "absolute",
              top: { xs: 8, sm: 10 },
              left: { xs: 8, sm: 10 },
              backgroundColor: C.dark,
              color: C.white,
              px: 1,
              py: 0.35,
              borderRadius: "1px",
              fontSize: { xs: "7px", sm: "8px" },
              fontWeight: 700,
              letterSpacing: "0.5px",
              lineHeight: 1.4,
              pointerEvents: "none",
            }}
          >
            {discountLabel}
          </Box>
        )}

        {/* Low stock chip */}
        {isLowStock && !isOutOfStock && (
          <Box
            sx={{
              position: "absolute",
              top: { xs: 8, sm: 10 },
              right: wishlisted ? 48 : { xs: 8, sm: 10 },
              backgroundColor: "#C8392B",
              color: C.white,
              px: 1,
              py: 0.35,
              borderRadius: "1px",
              fontSize: { xs: "7px", sm: "8px" },
              fontWeight: 700,
              letterSpacing: "0.5px",
              lineHeight: 1.4,
              pointerEvents: "none",
            }}
          >
            ONLY {product.stock} LEFT
          </Box>
        )}

        {/* Wishlist button */}
        <Tooltip
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          placement="left"
        >
          <IconButton
            onClick={toggleWishlist}
            aria-label={
              wishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            sx={{
              position: "absolute",
              top: { xs: 6, sm: 8 },
              right: { xs: 6, sm: 8 },
              width: { xs: 30, sm: 34, md: 36 },
              height: { xs: 30, sm: 34, md: 36 },
              backgroundColor: "rgba(255,255,255,0.92)",
              color: wishlisted ? C.accent : C.dark,
              opacity: { xs: 1, md: wishlisted ? 1 : 0 },
              transform: {
                xs: "none",
                md: wishlisted ? "none" : "translateY(-4px)",
              },
              transition: "opacity 0.3s ease, transform 0.3s ease, color 0.25s ease",
              backdropFilter: "blur(4px)",
              "&:hover": {
                backgroundColor: C.white,
              },
              ".MuiBox-root:hover &": {
                opacity: 1,
                transform: "translateY(0)",
              },
            }}
          >
            {wishlisted ? (
              <Favorite sx={{ fontSize: { xs: 14, sm: 16 } }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: { xs: 14, sm: 16 } }} />
            )}
          </IconButton>
        </Tooltip>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(255,255,255,0.65)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                letterSpacing: "2px",
                fontWeight: 700,
                color: C.muted,
                textTransform: "uppercase",
              }}
            >
              OUT OF STOCK
            </Typography>
          </Box>
        )}
      </Box>

      {/* ── CONTENT ────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: 0,
        }}
      >
        {/* Category label */}
        <Typography
          sx={{
            fontSize: { xs: "7px", sm: "7.5px" },
            letterSpacing: "1.4px",
            fontWeight: 600,
            color: "#999",
            textTransform: "uppercase",
            mb: 0.5,
          }}
        >
          {product.category}
        </Typography>

        {/* Name */}
        <Typography
          sx={{
            fontSize: { xs: "12px", sm: "13px", md: "13px", lg: "14px" },
            fontWeight: 600,
            color: C.text,
            lineHeight: 1.3,
            mb: 0.6,
            /* clamp to 2 lines */
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: { xs: "30px", sm: "34px" },
          }}
        >
          {product.name}
        </Typography>

        {/* Rating */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            mb: 0.7,
          }}
        >
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              fontSize: { xs: "11px", sm: "12px" },
              "& .MuiRating-iconFilled": { color: C.dark },
              "& .MuiRating-iconEmpty": { color: "#DDD" },
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: "9px", sm: "10px" },
              color: C.muted,
              lineHeight: 1,
            }}
          >
            ({product.reviewCount})
          </Typography>
        </Box>

        {/* Price row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "13px", sm: "14px", md: "14px" },
              fontWeight: 700,
              color: C.text,
              lineHeight: 1,
            }}
          >
            {formatPrice(product.price)}
          </Typography>

          {product.originalPrice > product.price && (
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "11px" },
                color: C.muted,
                textDecoration: "line-through",
                lineHeight: 1,
              }}
            >
              {formatPrice(product.originalPrice)}
            </Typography>
          )}
        </Box>

        {/* Color swatches */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            mb: 1.2,
          }}
        >
          {product.colors.slice(0, 5).map((color, i) => (
            <Tooltip key={i} title={color.name} placement="top">
              <Box
                aria-label={color.name}
                sx={{
                  width: { xs: 10, sm: 12 },
                  height: { xs: 10, sm: 12 },
                  borderRadius: "50%",
                  backgroundColor: color.value,
                  border:
                    color.value === "#FFFFFF" || color.value === "#FAFAF8"
                      ? "1px solid #CCCCCC"
                      : "1px solid rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.25)",
                    boxShadow: "0 0 0 1.5px rgba(0,0,0,0.3)",
                  },
                }}
              />
            </Tooltip>
          ))}
          {product.colors.length > 5 && (
            <Typography
              sx={{
                fontSize: "9px",
                color: C.muted,
                alignSelf: "center",
                lineHeight: 1,
              }}
            >
              +{product.colors.length - 5}
            </Typography>
          )}
        </Box>

        {/* Buttons */}
        <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 0.8 }}>
          {/* Add to Bag */}
          <Button
            fullWidth
            disableElevation
            variant="contained"
            disabled={isOutOfStock}
            onClick={handleQuickAdd}
            startIcon={
              addedFeedback ? null : (
                <ShoppingBagOutlined sx={{ fontSize: "14px !important" }} />
              )
            }
            sx={{
              minHeight: { xs: 36, sm: 40 },
              backgroundColor: addedFeedback ? "#2a6a2a" : C.dark,
              color: C.white,
              borderRadius: "2px",
              fontSize: { xs: "7px", sm: "8px", md: "8.5px" },
              letterSpacing: "0.7px",
              fontWeight: 700,
              textTransform: "uppercase",
              transition:
                "background-color 0.25s ease, transform 0.2s ease",
              "&:hover": {
                backgroundColor: addedFeedback ? "#2a6a2a" : "#2a2a2a",
                transform: "translateY(-1px)",
              },
              "&:active": { transform: "translateY(0)" },
              "&.Mui-disabled": {
                backgroundColor: "#DDDDDD",
                color: "#AAAAAA",
              },
            }}
          >
            {addedFeedback ? "ADDED!" : isOutOfStock ? "OUT OF STOCK" : "ADD TO CART"}
          </Button>

          {/* View product */}
          <Button
            fullWidth
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              goToProduct();
            }}
            endIcon={<ArrowForward sx={{ fontSize: "12px !important" }} />}
            sx={{
              minHeight: { xs: 34, sm: 38 },
              borderColor: C.border,
              color: C.muted,
              borderRadius: "2px",
              fontSize: { xs: "7px", sm: "8px" },
              letterSpacing: "0.7px",
              fontWeight: 600,
              textTransform: "uppercase",
              transition: "border-color 0.2s ease, color 0.2s ease",
              "&:hover": {
                borderColor: C.dark,
                color: C.dark,
                backgroundColor: "transparent",
              },
            }}
          >
            VIEW PRODUCT
          </Button>
        </Box>
      </Box>
    </Box>
  );

  if (!reveal) return inner;

  return (
    <Reveal
      delay={baseDelay}
      direction="up"
      distance={32}
      duration={0.65}
      threshold={0.05}
    >
      {inner}
    </Reveal>
  );
}
