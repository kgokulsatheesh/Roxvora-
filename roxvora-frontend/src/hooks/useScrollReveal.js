import { useEffect, useRef } from "react";

/**
 * useScrollReveal
 *
 * Attaches an IntersectionObserver to a container ref.
 * Every child element inside that container that carries the
 * class "reveal" will have "revealed" added once it enters
 * the viewport — triggering the CSS animation defined in
 * style.css.
 *
 * Usage:
 *   const sectionRef = useScrollReveal();
 *   <div ref={sectionRef}>
 *     <div className="reveal reveal-fade-up">…</div>
 *   </div>
 *
 * Options (all optional):
 *   threshold  – 0-1, how much of the element must be visible  (default 0.12)
 *   rootMargin – IntersectionObserver rootMargin               (default "0px 0px -60px 0px")
 *   once       – remove observer after first reveal            (default true)
 */
export default function useScrollReveal({
  threshold = 0.12,
  rootMargin = "0px 0px -60px 0px",
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Collect every .reveal child (including deeply nested)
    const targets = Array.from(container.querySelectorAll(".reveal"));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            // Allow re-animation on scroll back up
            entry.target.classList.remove("revealed");
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}


/**
 * useRevealRef
 *
 * A lighter variant for a single element (not a container).
 * Attach directly to the element you want to animate.
 *
 * Usage:
 *   const ref = useRevealRef();
 *   <div ref={ref} className="reveal reveal-zoom">…</div>
 */
export function useRevealRef({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          if (once) observer.disconnect();
        } else if (!once) {
          el.classList.remove("revealed");
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
