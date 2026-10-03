import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

/* =========================================================
   SIMPLE PLACEHOLDER PAGE
   Used for routes that don't have a full implementation yet.
========================================================= */
export default function SimplePage({ title = "Coming Soon", description = "" }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "70vh",
        backgroundColor: "#F8F6F1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
      }}
    >
      <Box sx={{ textAlign: "center", maxWidth: 520 }}>
        <Typography
          sx={{
            fontSize: { xs: "8px", sm: "9px" },
            letterSpacing: "2.5px",
            fontWeight: 600,
            color: "#999",
            textTransform: "uppercase",
            mb: 1.5,
          }}
        >
          ROXVORA
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: { xs: "34px", sm: "46px", md: "56px" },
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: { xs: "-0.5px", md: "-1px" },
            color: "#111111",
            mb: 2,
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            sx={{
              fontSize: { xs: "12px", sm: "13px" },
              color: "#666666",
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            {description}
          </Typography>
        )}

        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#111111",
            color: "#FFFFFF",
            borderRadius: "2px",
            px: 4,
            py: 1.4,
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            mr: 1.5,
            transition: "background-color 0.25s ease, transform 0.2s ease",
            "&:hover": { backgroundColor: "#2a2a2a", transform: "translateY(-1px)" },
            "&:active": { transform: "translateY(0)" },
          }}
        >
          GO HOME
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/shop")}
          sx={{
            borderColor: "#E6E2DA",
            color: "#111111",
            borderRadius: "2px",
            px: 4,
            py: 1.4,
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            transition: "border-color 0.2s ease",
            "&:hover": { borderColor: "#111111", backgroundColor: "#F3F1EC" },
          }}
        >
          SHOP NOW
        </Button>
      </Box>
    </Box>
  );
}
