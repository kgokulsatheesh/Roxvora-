import React, { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Link,
  Drawer,
  Divider,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Chip,
  Stack,
  Pagination,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import {
  NavigateNext,
  FilterList,
  Close,
  Search,
  ExpandMore,
  ExpandLess,
  TuneOutlined,
} from "@mui/icons-material";
import ProductCard from "../../../components/common/ProductCard";
import Reveal from "../../../components/common/Reveal";
import {
  CATEGORIES,
  PRODUCTS_BY_CATEGORY,
  formatPrice,
} from "../../../data/products";

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
};

const wrap = {
  width: "100%",
  maxWidth: "1560px",
  mx: "auto",
  px: { xs: 2, sm: 3, md: 5, lg: 7, xl: 8 },
};

const PRODUCTS_PER_PAGE = 6;

/* =========================================================
   SORT OPTIONS
========================================================= */
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "discount", label: "Biggest Discount" },
];

/* =========================================================
   FILTER SECTION (collapsible)
========================================================= */
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box sx={{ borderBottom: `1px solid ${C.border}`, pb: 2, mb: 2 }}>
      <Box
        component="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          p: 0,
          mb: open ? 1.5 : 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            letterSpacing: "1.5px",
            fontWeight: 700,
            color: C.text,
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
        {open ? (
          <ExpandLess sx={{ fontSize: 16, color: C.muted }} />
        ) : (
          <ExpandMore sx={{ fontSize: 16, color: C.muted }} />
        )}
      </Box>
      <Collapse in={open}>{children}</Collapse>
    </Box>
  );
}

/* =========================================================
   FILTER PANEL CONTENT
   Used inside both sidebar and mobile drawer
========================================================= */
function FilterPanelContent({
  products,
  priceRange,
  setPriceRange,
  maxPrice,
  selectedSizes,
  toggleSize,
  selectedColors,
  toggleColor,
  inStockOnly,
  setInStockOnly,
  onReset,
}) {
  /* Derive unique sizes + colors from all products in category */
  const allSizes = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return [...set];
  }, [products]);

  const allColors = useMemo(() => {
    const map = new Map();
    products.forEach((p) =>
      p.colors.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      })
    );
    return [...map.entries()].map(([name, hex]) => ({ name, hex }));
  }, [products]);

  return (
    <Box sx={{ pt: 1 }}>
      {/* Reset */}
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
            fontSize: "10px",
            letterSpacing: "1.5px",
            fontWeight: 700,
            color: C.text,
            textTransform: "uppercase",
          }}
        >
          FILTERS
        </Typography>
        <Button
          onClick={onReset}
          sx={{
            fontSize: "9px",
            color: C.muted,
            textTransform: "none",
            p: 0,
            minWidth: 0,
            "&:hover": { color: C.dark, backgroundColor: "transparent" },
          }}
        >
          Clear all
        </Button>
      </Box>

      {/* Price */}
      <FilterSection title="Price">
        <Box sx={{ px: 0.5 }}>
          <Slider
            value={priceRange}
            onChange={(_, v) => setPriceRange(v)}
            min={0}
            max={maxPrice}
            step={100}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => formatPrice(v)}
            sx={{
              color: C.dark,
              "& .MuiSlider-thumb": {
                width: 14,
                height: 14,
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "0 0 0 6px rgba(17,17,17,0.14)",
                },
              },
              "& .MuiSlider-rail": { backgroundColor: C.border },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 0.5,
            }}
          >
            <Typography sx={{ fontSize: "10px", color: C.muted }}>
              {formatPrice(priceRange[0])}
            </Typography>
            <Typography sx={{ fontSize: "10px", color: C.muted }}>
              {formatPrice(priceRange[1])}
            </Typography>
          </Box>
        </Box>
      </FilterSection>

      {/* Size */}
      {allSizes.length > 0 && (
        <FilterSection title="Size">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
            {allSizes.map((size) => (
              <Box
                key={size}
                component="button"
                onClick={() => toggleSize(size)}
                aria-pressed={selectedSizes.includes(size)}
                sx={{
                  px: 1.4,
                  py: 0.6,
                  fontSize: "10px",
                  fontWeight: selectedSizes.includes(size) ? 700 : 500,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  backgroundColor: selectedSizes.includes(size)
                    ? C.dark
                    : "transparent",
                  color: selectedSizes.includes(size) ? C.white : C.text,
                  border: `1px solid ${
                    selectedSizes.includes(size) ? C.dark : C.border
                  }`,
                  borderRadius: "2px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: C.dark,
                    backgroundColor: selectedSizes.includes(size)
                      ? C.dark
                      : C.hover,
                  },
                }}
              >
                {size}
              </Box>
            ))}
          </Box>
        </FilterSection>
      )}

      {/* Color */}
      {allColors.length > 0 && (
        <FilterSection title="Colour">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {allColors.map((color) => {
              const active = selectedColors.includes(color.name);
              return (
                <Box
                  key={color.name}
                  component="button"
                  onClick={() => toggleColor(color.name)}
                  aria-pressed={active}
                  title={color.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.7,
                    px: 1,
                    py: 0.5,
                    fontSize: "9px",
                    fontWeight: active ? 700 : 500,
                    cursor: "pointer",
                    backgroundColor: active ? C.hover : "transparent",
                    color: C.text,
                    border: `1px solid ${active ? C.dark : C.border}`,
                    borderRadius: "2px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: C.dark,
                      backgroundColor: C.hover,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: color.hex,
                      border: "1px solid rgba(0,0,0,0.15)",
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={{ fontSize: "9px", lineHeight: 1 }}>
                    {color.name}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </FilterSection>
      )}

      {/* Availability */}
      <FilterSection title="Availability" defaultOpen={false}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                size="small"
                sx={{
                  color: C.border,
                  "&.Mui-checked": { color: C.dark },
                  p: 0.5,
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: "11px", color: C.text }}>
                In Stock Only
              </Typography>
            }
          />
        </FormGroup>
      </FilterSection>
    </Box>
  );
}

/* =========================================================
   ACTIVE FILTER CHIPS
========================================================= */
function ActiveFilters({
  selectedSizes,
  toggleSize,
  selectedColors,
  toggleColor,
  inStockOnly,
  setInStockOnly,
  priceRange,
  maxPrice,
  onReset,
}) {
  const chips = [
    ...selectedSizes.map((s) => ({
      label: `Size: ${s}`,
      onDelete: () => toggleSize(s),
    })),
    ...selectedColors.map((c) => ({
      label: `Colour: ${c}`,
      onDelete: () => toggleColor(c),
    })),
    ...(inStockOnly
      ? [{ label: "In Stock", onDelete: () => setInStockOnly(false) }]
      : []),
    ...(priceRange[0] > 0 || priceRange[1] < maxPrice
      ? [
          {
            label: `${formatPrice(priceRange[0])} – ${formatPrice(
              priceRange[1]
            )}`,
            onDelete: onReset,
          },
        ]
      : []),
  ];

  if (chips.length === 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 0.8,
        mb: 2.5,
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "9px",
          letterSpacing: "1px",
          color: C.muted,
          textTransform: "uppercase",
          fontWeight: 600,
          mr: 0.5,
        }}
      >
        Active:
      </Typography>
      {chips.map((chip) => (
        <Chip
          key={chip.label}
          label={chip.label}
          onDelete={chip.onDelete}
          size="small"
          sx={{
            backgroundColor: C.dark,
            color: C.white,
            fontSize: "9px",
            height: 24,
            borderRadius: "2px",
            "& .MuiChip-deleteIcon": {
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              "&:hover": { color: C.white },
            },
          }}
        />
      ))}
      <Button
        onClick={onReset}
        sx={{
          fontSize: "9px",
          color: C.muted,
          textTransform: "none",
          p: 0,
          minWidth: 0,
          "&:hover": { color: C.dark, backgroundColor: "transparent" },
        }}
      >
        Clear all
      </Button>
    </Box>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */
function EmptyState({ onReset }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 8, md: 12 },
        px: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Georgia, serif",
          fontSize: { xs: "28px", sm: "36px" },
          fontWeight: 400,
          color: C.text,
          mb: 1.5,
        }}
      >
        No products found
      </Typography>
      <Typography
        sx={{
          fontSize: "13px",
          color: C.muted,
          mb: 3,
          maxWidth: 360,
          mx: "auto",
          lineHeight: 1.7,
        }}
      >
        Try adjusting your filters or search term to find what you're looking
        for.
      </Typography>
      <Button
        variant="contained"
        onClick={onReset}
        sx={{
          backgroundColor: C.dark,
          color: C.white,
          borderRadius: "2px",
          px: 3.5,
          py: 1.3,
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          "&:hover": { backgroundColor: "#2a2a2a" },
        }}
      >
        CLEAR FILTERS
      </Button>
    </Box>
  );
}

/* =========================================================
   CATEGORY PAGE
========================================================= */
export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  /* ── Category meta ──────────────────────────────────── */
  const category = CATEGORIES.find((c) => c.slug === slug);
  const rawProducts = PRODUCTS_BY_CATEGORY[slug] ?? [];

  /* ── Responsive ─────────────────────────────────────── */
  const isDesktop = useMediaQuery("(min-width:960px)");

  /* ── Filter state ───────────────────────────────────── */
  const maxPrice = useMemo(
    () => Math.max(...rawProducts.map((p) => p.originalPrice), 1000),
    [rawProducts]
  );

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);

  /* ── Filter toggles ─────────────────────────────────── */
  const toggleSize = useCallback((s) => {
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
    setPage(1);
  }, []);

  const toggleColor = useCallback((c) => {
    setSelectedColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setSearch("");
    setSort("featured");
    setPriceRange([0, maxPrice]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setInStockOnly(false);
    setPage(1);
  }, [maxPrice]);

  /* ── Filtered + sorted products ─────────────────────── */
  const filtered = useMemo(() => {
    let list = [...rawProducts];

    /* search */
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    /* price */
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    /* size */
    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        selectedSizes.some((s) => p.sizes.includes(s))
      );
    }

    /* color */
    if (selectedColors.length > 0) {
      list = list.filter((p) =>
        selectedColors.some((c) => p.colors.some((pc) => pc.name === c))
      );
    }

    /* stock */
    if (inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    /* sort */
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        list.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    return list;
  }, [
    rawProducts,
    search,
    priceRange,
    selectedSizes,
    selectedColors,
    inStockOnly,
    sort,
  ]);

  /* ── Pagination ─────────────────────────────────────── */
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (_, v) => {
    setPage(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── 404 guard ──────────────────────────────────────── */
  if (!category) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
          p: 4,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: { xs: "32px", md: "44px" },
            color: C.text,
          }}
        >
          Category not found
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

  /* ── Filter panel props (shared between sidebar + drawer) */
  const filterProps = {
    products: rawProducts,
    priceRange,
    setPriceRange: (v) => { setPriceRange(v); setPage(1); },
    maxPrice,
    selectedSizes,
    toggleSize,
    selectedColors,
    toggleColor,
    inStockOnly,
    setInStockOnly: (v) => { setInStockOnly(v); setPage(1); },
    onReset: resetFilters,
  };

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
      {/* ── CATEGORY HERO ──────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 320, sm: 380, md: 440, lg: 480 },
          overflow: "hidden",
          backgroundColor: C.dark,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          component="img"
          src={category.image}
          alt={category.label}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            opacity: 0.55,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        <Container
          maxWidth={false}
          sx={{ ...wrap, position: "relative", zIndex: 2, pb: { xs: 4, md: 5 } }}
        >
          {/* Breadcrumb */}
          <Reveal delay={0} direction="up" distance={14} duration={0.5}>
            <Breadcrumbs
              separator={
                <NavigateNext
                  sx={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}
                />
              }
              sx={{ mb: 2 }}
            >
              <Link
                component="button"
                onClick={() => navigate("/")}
                underline="hover"
                sx={{
                  fontSize: "9px",
                  letterSpacing: "1px",
                  color: "rgba(255,255,255,0.5)",
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
                  letterSpacing: "1px",
                  color: "rgba(255,255,255,0.5)",
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
                  letterSpacing: "1px",
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 600,
                }}
              >
                {category.label.toUpperCase()}
              </Typography>
            </Breadcrumbs>
          </Reveal>

          <Reveal delay={0.1} direction="up" distance={24} duration={0.65}>
            <Typography
              sx={{
                fontSize: { xs: "7px", sm: "8px" },
                letterSpacing: "2.5px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                mb: 1,
                textTransform: "uppercase",
              }}
            >
              {category.eyebrow}
            </Typography>
          </Reveal>

          <Reveal delay={0.18} direction="up" distance={30} duration={0.7}>
            <Typography
              component="h1"
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: {
                  xs: "42px",
                  sm: "56px",
                  md: "68px",
                  lg: "78px",
                },
                lineHeight: 0.93,
                letterSpacing: { xs: "-1px", md: "-1.5px" },
                color: C.white,
                fontWeight: 400,
                mb: 1.5,
              }}
            >
              {category.headline}
            </Typography>
          </Reveal>

          <Reveal delay={0.28} direction="up" distance={16} duration={0.55}>
            <Typography
              sx={{
                fontSize: { xs: "11px", sm: "12px", md: "13px" },
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.75,
                maxWidth: 520,
              }}
            >
              {category.description}
            </Typography>
          </Reveal>
        </Container>
      </Box>

      {/* ── CONTENT AREA ───────────────────────────────────── */}
      <Container maxWidth={false} sx={{ ...wrap, py: { xs: 5, sm: 6, md: 8 } }}>
        {/* ── Toolbar: search + sort + filter toggle ──────── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5 },
            mb: { xs: 2.5, sm: 3 },
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <OutlinedInput
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search products…"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <Search sx={{ fontSize: 16, color: C.muted }} />
              </InputAdornment>
            }
            endAdornment={
              search && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => { setSearch(""); setPage(1); }}
                    sx={{ color: C.muted }}
                  >
                    <Close sx={{ fontSize: 14 }} />
                  </IconButton>
                </InputAdornment>
              )
            }
            sx={{
              flex: { xs: "1 1 auto", sm: "0 0 240px", md: "0 0 280px" },
              fontSize: "12px",
              backgroundColor: C.white,
              borderRadius: "2px",
              "& fieldset": { borderColor: C.border },
              "&:hover fieldset": { borderColor: "#BBBBB0" },
              "&.Mui-focused fieldset": { borderColor: C.dark },
              "& input": { py: "8px" },
            }}
          />

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Product count */}
          <Typography
            sx={{
              fontSize: "11px",
              color: C.muted,
              whiteSpace: "nowrap",
              display: { xs: "none", sm: "block" },
            }}
          >
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </Typography>

          {/* Sort */}
          <Select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            size="small"
            sx={{
              fontSize: "11px",
              borderRadius: "2px",
              minWidth: { xs: 140, sm: 170 },
              backgroundColor: C.white,
              "& fieldset": { borderColor: C.border },
              "&:hover fieldset": { borderColor: "#BBBBB0" },
              "&.Mui-focused fieldset": { borderColor: C.dark },
              "& .MuiSelect-select": { py: "7px" },
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <MenuItem
                key={o.value}
                value={o.value}
                sx={{ fontSize: "11px" }}
              >
                {o.label}
              </MenuItem>
            ))}
          </Select>

          {/* Filter toggle (mobile / tablet) */}
          {!isDesktop && (
            <Button
              startIcon={<TuneOutlined />}
              onClick={() => setDrawerOpen(true)}
              variant="outlined"
              sx={{
                borderColor: C.border,
                color: C.text,
                borderRadius: "2px",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                px: 1.5,
                py: 0.8,
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: C.dark,
                  backgroundColor: C.hover,
                },
              }}
            >
              FILTERS
            </Button>
          )}
        </Box>

        {/* ── Active filter chips ─────────────────────────── */}
        <ActiveFilters
          selectedSizes={selectedSizes}
          toggleSize={toggleSize}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          priceRange={priceRange}
          maxPrice={maxPrice}
          onReset={resetFilters}
        />

        {/* ── Main content: sidebar + product grid ────────── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "220px 1fr",
              lg: "240px 1fr",
              xl: "260px 1fr",
            },
            gap: { xs: 0, md: 5, lg: 6 },
            alignItems: "start",
          }}
        >
          {/* DESKTOP SIDEBAR */}
          {isDesktop && (
            <Box
              sx={{
                position: "sticky",
                top: 88,
                borderRight: `1px solid ${C.border}`,
                pr: { md: 3, lg: 4 },
              }}
            >
              <FilterPanelContent {...filterProps} />
            </Box>
          )}

          {/* PRODUCT GRID + PAGINATION */}
          <Box>
            {/* Mobile product count */}
            <Typography
              sx={{
                fontSize: "11px",
                color: C.muted,
                mb: 2,
                display: { xs: "block", sm: "none" },
              }}
            >
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </Typography>

            {paginated.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, minmax(0,1fr))",
                    sm: "repeat(2, minmax(0,1fr))",
                    md: "repeat(2, minmax(0,1fr))",
                    lg: "repeat(3, minmax(0,1fr))",
                    xl: "repeat(3, minmax(0,1fr))",
                  },
                  gap: {
                    xs: "14px 10px",
                    sm: "20px 16px",
                    md: "24px 18px",
                    lg: "28px 22px",
                  },
                  alignItems: "stretch",
                }}
              >
                {paginated.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    reveal
                  />
                ))}
              </Box>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Reveal
                delay={0}
                direction="up"
                distance={16}
                duration={0.5}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: { xs: 5, md: 7 },
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    shape="rounded"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontSize: "11px",
                        fontWeight: 600,
                        borderRadius: "2px",
                        color: C.muted,
                        border: `1px solid ${C.border}`,
                        "&:hover": {
                          backgroundColor: C.hover,
                          borderColor: C.dark,
                        },
                      },
                      "& .Mui-selected": {
                        backgroundColor: `${C.dark} !important`,
                        color: `${C.white} !important`,
                        borderColor: `${C.dark} !important`,
                      },
                    }}
                  />
                </Box>
              </Reveal>
            )}
          </Box>
        </Box>
      </Container>

      {/* ── MOBILE FILTER DRAWER ───────────────────────────── */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "88%", sm: 360 },
            maxWidth: 380,
            backgroundColor: C.bg,
            px: 3,
            py: 2,
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            pb: 2,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <Typography
            sx={{
              fontSize: "11px",
              letterSpacing: "1.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: C.text,
            }}
          >
            FILTER PRODUCTS
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="small"
            sx={{ color: C.muted }}
          >
            <Close sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <FilterPanelContent {...filterProps} />

        {/* Apply CTA */}
        <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${C.border}` }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setDrawerOpen(false)}
            sx={{
              backgroundColor: C.dark,
              color: C.white,
              borderRadius: "2px",
              py: 1.4,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              "&:hover": { backgroundColor: "#2a2a2a" },
            }}
          >
            VIEW {filtered.length} PRODUCT{filtered.length !== 1 ? "S" : ""}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
