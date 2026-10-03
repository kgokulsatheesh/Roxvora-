import { useRef, useState, useEffect } from "react";

/* =========================================================
   useReveal — single-element IntersectionObserver hook
   ─────────────────────────────────────────────────────────
   Returns [ref, isVisible].
   Attach ref to the DOM node you want to watch.
   Once the element enters the viewport, isVisible becomes
   true and stays true (fire-once).
========================================================= */
export function useReveal({
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
} = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}

export default useReveal;
