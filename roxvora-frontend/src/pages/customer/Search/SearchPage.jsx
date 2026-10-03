import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import ProductCard from "../../../components/common/ProductCard";
import Reveal from "../../../components/common/Reveal";
import { ALL_PRODUCTS } from "../../../data/products";

const C = {
  bg: "#F8F6F1",
  text: "#111111",
  muted: "#666666",
  border: "#E6E2DA",
  white: "#FFFFFF",
};

const wrap = {
  width: "100%",
  maxWidth: "1560px",
  mx: "auto",
  px: { xs: 2, sm: 3, md: 5, lg: 7, xl: 8 },
};

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: C.bg,
        color: C.text,
      }}
    >
      <Container maxWidth={false} sx={{ ...wrap, pt: { xs: 6, md: 8 }, pb: { xs: 8, md: 12 } }}>
        {/* Heading */}
        <Reveal delay={0} direction="up" distance={20} duration={0.6}>
          <Typography
            component="h1"
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: { xs: "36px", sm: "52px", md: "64px", lg: "72px" },
              fontWeight: 400,
              lineHeight: 0.94,
              letterSpacing: { xs: "-0.5px", md: "-1.5px" },
              color: C.text,
              mb: { xs: 4, md: 6 },
            }}
          >
            SEARCH
          </Typography>
        </Reveal>

        {/* Search input */}
        <Reveal delay={0.1} direction="up" distance={16} duration={0.55}>
          <OutlinedInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories…"
            autoFocus
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <Search sx={{ fontSize: 22, color: C.muted }} />
              </InputAdornment>
            }
            endAdornment={
              query && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setQuery("")} size="small">
                    <Close sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              )
            }
            sx={{
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              backgroundColor: C.white,
              borderRadius: "2px",
              mb: 1,
              "& fieldset": { borderColor: C.border },
              "&:hover fieldset": { borderColor: "#BBBBBB" },
              "&.Mui-focused fieldset": { borderColor: C.text },
              "& input": { py: { xs: "14px", sm: "16px" } },
            }}
          />
        </Reveal>

        {/* Result count */}
        {query.trim() && (
          <Reveal delay={0} direction="none" duration={0.4}>
            <Typography sx={{ fontSize: "11px", color: C.muted, mb: 4, mt: 1 }}>
              {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query.trim()}&quot;
            </Typography>
          </Reveal>
        )}

        {/* Empty / idle state */}
        {!query.trim() && (
          <Reveal delay={0.18} direction="up" distance={14} duration={0.5}>
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "14px" },
                color: C.muted,
                mt: 2,
                lineHeight: 1.8,
              }}
            >
              Start typing to search across all{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color: C.text,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => navigate("/shop")}
              >
                {ALL_PRODUCTS.length} products
              </Box>{" "}
              — T-Shirts, Shirts, Trousers, Jackets, Women&apos;s, Accessories.
            </Typography>
          </Reveal>
        )}

        {/* No results */}
        {query.trim() && results.length === 0 && (
          <Reveal delay={0} direction="up" distance={16} duration={0.5}>
            <Box sx={{ textAlign: "center", py: { xs: 6, md: 10 } }}>
              <Typography
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: { xs: "26px", sm: "34px" },
                  fontWeight: 400,
                  color: C.text,
                  mb: 1.5,
                }}
              >
                No results found
              </Typography>
              <Typography sx={{ fontSize: "13px", color: C.muted, lineHeight: 1.75 }}>
                Try a different search term or browse our categories.
              </Typography>
            </Box>
          </Reveal>
        )}

        {/* Results grid */}
        {results.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0,1fr))",
                sm: "repeat(3, minmax(0,1fr))",
                md: "repeat(3, minmax(0,1fr))",
                lg: "repeat(4, minmax(0,1fr))",
                xl: "repeat(5, minmax(0,1fr))",
              },
              gap: {
                xs: "14px 10px",
                sm: "20px 16px",
                md: "24px 18px",
                lg: "28px 22px",
              },
              alignItems: "stretch",
              mt: 1,
            }}
          >
            {results.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} reveal />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
