import React from "react";
import Box from "@mui/material/Box";
import { useReveal } from "../../hooks/useReveal";

/* =========================================================
   <Reveal>  — Scroll-triggered animation wrapper
   ─────────────────────────────────────────────────────────
   Props:
     delay     seconds before animation starts  (default 0)
     direction "up" | "down" | "left" | "right" | "none" | "scale"
     distance  translateX/Y distance in px       (default 30)
     duration  transition duration in seconds    (default 0.65)
     threshold IntersectionObserver threshold    (default 0.1)
     rootMargin                                  (default "0px 0px -40px 0px")
     sx        MUI sx prop passed to wrapper Box
     style     inline style
     component HTML element or MUI component    (default "div")

   Usage:
     <Reveal delay={0.2} direction="up" distance={30}>
       <Typography>Hello</Typography>
     </Reveal>
========================================================= */

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 0.65,
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  style = {},
  sx = {},
  component = "div",
}) {
  const [ref, visible] = useReveal({ threshold, rootMargin });

  const hiddenMap = {
    up: { opacity: 0, transform: `translateY(${distance}px)` },
    down: { opacity: 0, transform: `translateY(-${distance}px)` },
    left: { opacity: 0, transform: `translateX(-${distance}px)` },
    right: { opacity: 0, transform: `translateX(${distance}px)` },
    none: { opacity: 0, transform: "none" },
    scale: { opacity: 0, transform: "scale(0.93)" },
  };

  const hidden = hiddenMap[direction] ?? hiddenMap.up;
  const shown = {
    opacity: 1,
    transform: "translateY(0) translateX(0) scale(1)",
  };

  return (
    <Box
      ref={ref}
      component={component}
      sx={sx}
      style={{
        ...style,
        ...(visible ? shown : hidden),
        transition: visible
          ? `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`
          : "none",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Box>
  );
}
