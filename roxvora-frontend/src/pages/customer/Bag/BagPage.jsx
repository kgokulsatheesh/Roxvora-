import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Link,
  Divider,
  TextField,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  NavigateNext,
  Add,
  Remove,
  DeleteOutlined,
  FavoriteBorder,
  ShoppingBagOutlined,
  ArrowForward,
  LocalShippingOutlined,
  LockOutlined,
  CheckCircleOutlined,
  Close,
} from "@mui/icons-material";
import Reveal from "../../../components/common/Reveal";
import { useCart } from "../../../context/CartContext";
import { formatPrice } from "../../../data/products";

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
  card: "#FFFFFF",
  accent: "#C8392B",
};

const wrap = {
  width: "100%",
  maxWidth: "1560px",
  mx: "auto",
  px: { xs: 2, sm: 3, md: 5, lg: 7, xl: 8 },
};

/* =========================================================
   VALID PROMO CODES
========================================================= */
const PROMO_CODES = {
  ROXVORA10: 10,
  WELCOME20: 20,
  SAVE15: 15,
  FIRST30: 30,
};

/* =========================================================
   CART ITEM ROW
========================================================= */
function CartItemRow({ item, onUpdate, onRemove }) {
  const savings =
    item.originalPrice && item.originalPrice > item.price
      ? (item.originalPrice - item.price) * item.quantity
      : 0;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "80px 1fr",
          sm: "100px 1fr",
          md: "110px 1fr",
        },
        gap: { xs: 1.5, sm: 2, md: 2.5 },
        py: { xs: 2.5, sm: 3 },
        borderBottom: `1px solid ${C.border}`,
        "&:last-child": { borderBottom: "none" },
      }}
    >
      {/* Product image */}
      <Box
        sx={{
          width: { xs: 80, sm: 100, md: 110 },
          height: { xs: 96, sm: 120, md: 132 },
          overflow: "hidden",
          borderRadius: "2px",
          backgroundColor: C.bgAlt,
          flexShrink: 0,
          cursor: "pointer",
        }}
        onClick={() => { }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            transition: "transform 0.4s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
      </Box>

      {/* Details */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4, minWidth: 0 }}>
        {/* Top row: name + remove */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "12px", sm: "13px", md: "14px" },
              fontWeight: 600,
              color: C.text,
              lineHeight: 1.3,
              flex: 1,
            }}
          >
            {item.name}
          </Typography>
          <Tooltip title="Remove item">
            <IconButton
              onClick={() => onRemove(item.lineKey)}
              aria-label={`Remove ${item.name}`}
              size="small"
              sx={{
                color: C.muted,
                p: 0.3,
                flexShrink: 0,
                "&:hover": { color: C.accent, backgroundColor: "transparent" },
              }}
            >
              <DeleteOutlined sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Category */}
        <Typography
          sx={{
            fontSize: "9px",
            letterSpacing: "1px",
            fontWeight: 600,
            color: "#999",
            textTransform: "uppercase",
          }}
        >
          {item.category}
        </Typography>

        {/* Selection chips */}
        <Box sx={{ display: "flex", gap: 0.6, flexWrap: "wrap", mt: 0.2 }}>
          <Chip
            label={`Size: ${item.selectedSize}`}
            size="small"
            sx={{
              fontSize: "9px",
              height: 20,
              borderRadius: "2px",
              backgroundColor: C.hover,
              color: C.text,
              fontWeight: 600,
            }}
          />
          <Chip
            label={`Colour: ${item.selectedColor}`}
            size="small"
            sx={{
              fontSize: "9px",
              height: 20,
              borderRadius: "2px",
              backgroundColor: C.hover,
              color: C.text,
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Price + Qty row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
            mt: "auto",
            pt: 0.8,
          }}
        >
          {/* Quantity controls */}
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
              onClick={() =>
                onUpdate(item.lineKey, item.quantity - 1)
              }
              aria-label="Decrease quantity"
              size="small"
              sx={{
                borderRadius: 0,
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                color: C.text,
                "&:hover": { backgroundColor: C.hover },
              }}
            >
              <Remove sx={{ fontSize: 12 }} />
            </IconButton>
            <Typography
              sx={{
                minWidth: { xs: 28, sm: 34 },
                textAlign: "center",
                fontSize: "12px",
                fontWeight: 600,
                userSelect: "none",
              }}
            >
              {item.quantity}
            </Typography>
            <IconButton
              onClick={() =>
                onUpdate(item.lineKey, item.quantity + 1)
              }
              aria-label="Increase quantity"
              size="small"
              sx={{
                borderRadius: 0,
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                color: C.text,
                "&:hover": { backgroundColor: C.hover },
              }}
            >
              <Add sx={{ fontSize: 12 }} />
            </IconButton>
          </Box>

          {/* Price */}
          <Box sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "15px" },
                fontWeight: 700,
                color: C.text,
                lineHeight: 1,
              }}
            >
              {formatPrice(item.price * item.quantity)}
            </Typography>
            {savings > 0 && (
              <Typography
                sx={{
                  fontSize: "9px",
                  color: "#1A7A4A",
                  fontWeight: 600,
                  mt: 0.3,
                }}
              >
                saving {formatPrice(savings)}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Move to wishlist */}
        <Button
          size="small"
          startIcon={<FavoriteBorder sx={{ fontSize: "11px !important" }} />}
          sx={{
            alignSelf: "flex-start",
            color: C.muted,
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "none",
            p: 0,
            minWidth: 0,
            mt: 0.4,
            "&:hover": {
              color: C.dark,
              backgroundColor: "transparent",
            },
          }}
        >
          Move to wishlist
        </Button>
      </Box>
    </Box>
  );
}

/* =========================================================
   EMPTY BAG
========================================================= */
function EmptyBag({ onShop }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 10, md: 14 },
        px: 2,
      }}
    >
      <ShoppingBagOutlined
        sx={{
          fontSize: { xs: 60, md: 80 },
          color: "#CCCCCC",
          mb: 2,
        }}
      />
      <Typography
        sx={{
          fontFamily: "Georgia, serif",
          fontSize: { xs: "28px", sm: "36px", md: "42px" },
          fontWeight: 400,
          color: C.text,
          mb: 1.5,
        }}
      >
        Your bag is empty
      </Typography>
      <Typography
        sx={{
          fontSize: "13px",
          color: C.muted,
          mb: 4,
          maxWidth: 380,
          mx: "auto",
          lineHeight: 1.75,
        }}
      >
        Looks like you haven&apos;t added anything yet. Let&apos;s fix that.
      </Typography>
      <Button
        variant="contained"
        endIcon={<ArrowForward />}
        onClick={onShop}
        sx={{
          backgroundColor: C.dark,
          color: C.white,
          borderRadius: "2px",
          px: 4,
          py: 1.5,
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          transition: "background-color 0.25s ease, transform 0.2s ease",
          "&:hover": {
            backgroundColor: "#2a2a2a",
            transform: "translateY(-1px)",
          },
          "&:active": { transform: "translateY(0)" },
        }}
      >
        CONTINUE SHOPPING
      </Button>
    </Box>
  );
}

/* =========================================================
   BAG PAGE
========================================================= */
export default function BagPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState(false);

  /* ── Promo logic ──────────────────────────────────── */
  const discountPct = appliedPromo ? PROMO_CODES[appliedPromo] : 0;
  const discountAmount = Math.round((subtotal * discountPct) / 100);
  const deliveryCharge = subtotal - discountAmount >= 999 ? 0 : 99;
  const total = subtotal - discountAmount + deliveryCharge;
  const totalSavings =
    items.reduce((acc, i) => {
      const orig = i.originalPrice ?? i.price;
      return acc + (orig - i.price) * i.quantity;
    }, 0) + discountAmount;

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError("");
      setPromoSuccess(true);
      setTimeout(() => setPromoSuccess(false), 3000);
    } else {
      setPromoError("Invalid promo code. Try ROXVORA10.");
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoError("");
  };

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

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
      <Box
        sx={{
          borderBottom: `1px solid ${C.border}`,
          backgroundColor: C.white,
        }}
      >
        <Container maxWidth={false} sx={{ ...wrap, py: 1.5 }}>
          <Breadcrumbs
            separator={
              <NavigateNext sx={{ fontSize: 13, color: "#BBBBBB" }} />
            }
          >
            <Link
              component="button"
              onClick={() => navigate("/")}
              underline="hover"
              sx={{
                fontSize: "9px",
                letterSpacing: "0.8px",
                color: C.muted,
                cursor: "pointer",
                border: "none",
                background: "none",
                p: 0,
                fontFamily: "inherit",
              }}
            >
              HOME
            </Link>
            <Link
              component="button"
              onClick={() => navigate("/shop")}
              underline="hover"
              sx={{
                fontSize: "9px",
                letterSpacing: "0.8px",
                color: C.muted,
                cursor: "pointer",
                border: "none",
                background: "none",
                p: 0,
                fontFamily: "inherit",
              }}
            >
              SHOP
            </Link>
            <Typography
              sx={{
                fontSize: "9px",
                letterSpacing: "0.8px",
                color: C.text,
                fontWeight: 600,
              }}
            >
              YOUR BAG
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth={false} sx={{ ...wrap, py: { xs: 4, sm: 5, md: 7 } }}>
        {/* Heading */}
        <Reveal delay={0} direction="up" distance={20} duration={0.6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1.5,
              mb: { xs: 4, sm: 5 },
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: {
                  xs: "34px",
                  sm: "46px",
                  md: "56px",
                  lg: "64px",
                },
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: { xs: "-0.5px", md: "-1px" },
                color: C.text,
              }}
            >
              YOUR BAG
            </Typography>
            {items.length > 0 && (
              <Typography
                sx={{
                  fontSize: { xs: "13px", sm: "15px" },
                  fontWeight: 600,
                  color: C.muted,
                }}
              >
                ({itemCount} item{itemCount !== 1 ? "s" : ""})
              </Typography>
            )}
          </Box>
        </Reveal>

        {items.length === 0 ? (
          <EmptyBag onShop={() => navigate("/shop")} />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr",
                lg: "1fr 380px",
                xl: "1fr 420px",
              },
              gap: { xs: 4, md: 5, lg: 6 },
              alignItems: "start",
            }}
          >
            {/* ── LEFT: Cart items ─────────────────────────── */}
            <Box>
              <Reveal delay={0.06} direction="up" distance={18} duration={0.6}>
                <Box
                  sx={{
                    backgroundColor: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: "2px",
                    px: { xs: 2, sm: 3 },
                    pt: { xs: 0.5, sm: 1 },
                    pb: { xs: 1, sm: 1.5 },
                  }}
                >
                  {items.map((item) => (
                    <CartItemRow
                      key={item.lineKey}
                      item={item}
                      onUpdate={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </Box>
              </Reveal>

              {/* Continue shopping */}
              <Reveal delay={0.12} direction="up" distance={14} duration={0.5}>
                <Button
                  startIcon={<ArrowForward sx={{ transform: "rotate(180deg)" }} />}
                  onClick={() => navigate("/shop")}
                  sx={{
                    mt: 2.5,
                    color: C.muted,
                    fontSize: "10px",
                    letterSpacing: "0.8px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    p: 0,
                    "&:hover": {
                      color: C.dark,
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  CONTINUE SHOPPING
                </Button>
              </Reveal>
            </Box>

            {/* ── RIGHT: Order summary ─────────────────────── */}
            <Reveal delay={0.14} direction="up" distance={20} duration={0.65}>
              <Box
                sx={{
                  position: { lg: "sticky" },
                  top: { lg: 88 },
                  backgroundColor: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: "2px",
                  p: { xs: 2.5, sm: 3 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: C.text,
                    mb: 2.5,
                    pb: 2,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  ORDER SUMMARY
                </Typography>

                {/* Line items */}
                <Stack spacing={1.2} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "12px", color: C.muted }}
                    >
                      Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})
                    </Typography>
                    <Typography
                      sx={{ fontSize: "12px", fontWeight: 600, color: C.text }}
                    >
                      {formatPrice(subtotal)}
                    </Typography>
                  </Box>

                  {discountAmount > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "12px", color: "#1A7A4A" }}
                      >
                        Promo ({appliedPromo}) −{discountPct}%
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#1A7A4A",
                        }}
                      >
                        −{formatPrice(discountAmount)}
                      </Typography>
                    </Box>
                  )}

                  {totalSavings > discountAmount && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "12px", color: "#1A7A4A" }}
                      >
                        Product savings
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#1A7A4A",
                        }}
                      >
                        −{formatPrice(totalSavings - discountAmount)}
                      </Typography>
                    </Box>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "12px", color: C.muted }}
                    >
                      Delivery
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: deliveryCharge === 0 ? "#1A7A4A" : C.text,
                      }}
                    >
                      {deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
                    </Typography>
                  </Box>
                </Stack>

                {deliveryCharge > 0 && (
                  <Box
                    sx={{
                      backgroundColor: "#FEF9EE",
                      border: "1px solid #F0E4C0",
                      borderRadius: "2px",
                      px: 1.5,
                      py: 1,
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        color: "#8A6520",
                        lineHeight: 1.5,
                      }}
                    >
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        Add {formatPrice(999 - (subtotal - discountAmount))} more
                      </Box>{" "}
                      to get free delivery.
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ borderColor: C.border, mb: 2 }} />

                {/* Total */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: C.text,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    TOTAL
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "20px", sm: "22px" },
                      fontWeight: 700,
                      color: C.text,
                    }}
                  >
                    {formatPrice(total)}
                  </Typography>
                </Box>

                {/* Promo code */}
                <Box sx={{ mb: 2.5 }}>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      letterSpacing: "1.2px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: C.text,
                      mb: 1,
                    }}
                  >
                    PROMO CODE
                  </Typography>

                  {appliedPromo ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#EDFAF3",
                        border: "1px solid #B8E8CE",
                        borderRadius: "2px",
                        px: 1.5,
                        py: 0.9,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.7 }}
                      >
                        <CheckCircleOutlined
                          sx={{ fontSize: 15, color: "#1A7A4A" }}
                        />
                        <Typography
                          sx={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#1A7A4A",
                          }}
                        >
                          {appliedPromo} applied — {discountPct}% off
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={handleRemovePromo}
                        aria-label="Remove promo code"
                        sx={{
                          p: 0.2,
                          color: "#1A7A4A",
                          "&:hover": { backgroundColor: "transparent" },
                        }}
                      >
                        <Close sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", gap: 0.8 }}>
                      <TextField
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value.toUpperCase());
                          setPromoError("");
                        }}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleApplyPromo()
                        }
                        placeholder="Enter code"
                        size="small"
                        error={!!promoError}
                        helperText={promoError}
                        sx={{
                          flex: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "2px",
                            fontSize: "11px",
                            "& fieldset": { borderColor: C.border },
                            "&:hover fieldset": { borderColor: "#BBBBB0" },
                            "&.Mui-focused fieldset": {
                              borderColor: C.dark,
                            },
                          },
                          "& .MuiFormHelperText-root": {
                            fontSize: "9px",
                            mx: 0,
                          },
                          "& input": { py: "8px" },
                        }}
                      />
                      <Button
                        onClick={handleApplyPromo}
                        variant="outlined"
                        sx={{
                          borderColor: C.border,
                          color: C.text,
                          borderRadius: "2px",
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                          px: 1.5,
                          whiteSpace: "nowrap",
                          alignSelf: "flex-start",
                          height: 37,
                          "&:hover": {
                            borderColor: C.dark,
                            backgroundColor: C.hover,
                          },
                        }}
                      >
                        APPLY
                      </Button>
                    </Box>
                  )}
                </Box>

                {/* Checkout CTA */}
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/checkout")}
                  sx={{
                    backgroundColor: C.dark,
                    color: C.white,
                    borderRadius: "2px",
                    py: 1.6,
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    mb: 1.2,
                    transition:
                      "background-color 0.25s ease, transform 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#2a2a2a",
                      transform: "translateY(-1px)",
                    },
                    "&:active": { transform: "translateY(0)" },
                  }}
                >
                  PROCEED TO CHECKOUT
                </Button>

                {/* Trust badges */}
                <Stack
                  spacing={0.8}
                  sx={{ mt: 1.5 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <LockOutlined sx={{ fontSize: 13, color: C.muted }} />
                    <Typography sx={{ fontSize: "9px", color: C.muted }}>
                      Secure 256-bit SSL checkout
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <LocalShippingOutlined
                      sx={{ fontSize: 13, color: C.muted }}
                    />
                    <Typography sx={{ fontSize: "9px", color: C.muted }}>
                      Free shipping above ₹999 · Easy 14-day returns
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Reveal>
          </Box>
        )}
      </Container>
    </Box>
  );
}
