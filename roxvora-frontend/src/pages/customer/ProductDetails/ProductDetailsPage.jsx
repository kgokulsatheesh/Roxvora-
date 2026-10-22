import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiHeart, FiSend, FiChevronLeft, FiChevronRight, FiChevronUp, FiChevronDown,
  FiStar, FiShoppingCart, FiX, FiCheck, FiShield, FiTruck, FiRotateCcw, FiAward, FiInfo
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

/* -------------------------------------------------------------------------- */
/*  DATA                                                                       */
/* -------------------------------------------------------------------------- */
const U = (id) => `https://images.unsplash.com/${id}?w=900&q=80`;

const PRODUCT_DATABASE = {
  1: {
    id: 1,
    brand: 'Gulabi Jaipur',
    title: 'Gulabi Jaipur Women Fit and Flare Maxi/Full Length Dress',
    breadcrumb: ['Clothing and Accessories', 'Dresses and Gowns', 'Dresses', "Women's Dresses", "Gulabi Jaipur Women's Dresses"],
    rating: 3.8,
    ratingCount: 557,
    mrp: 1499,
    discount: 69,
    description: 'Beautiful fit and flare maxi dress crafted from breathable cotton fabric with traditional block prints, offering effortless comfort and style for festive or casual occasions.',
    highlights: [
      '100% Premium Breathable Cotton Fabric',
      'Traditional Jaipuri Hand Block Print Design',
      'Fit and flare silhouette with 3/4 sleeves',
      'Gentle machine wash or hand wash recommended'
    ],
    sizes: [
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
      { label: 'XXL', inStock: false },
    ],
    ad: {
      title: 'Gujari Women Fit and Flare Purple Midi/Calf Length Dress',
      price: 427, mrp: 1499, off: 72,
      img: U('photo-1572804013309-59a88b7e92f1'),
    },
    colors: [
      {
        name: 'Blue', hex: '#1f4e79', price: 464,
        images: [
          U('photo-1572804013309-59a88b7e92f1'), U('photo-1515372039744-b8f02a3ae446'),
          U('photo-1490481651871-ab68de25d43d'), U('photo-1539109136881-3be0616acf4b'),
        ],
      },
      {
        name: 'Light Blue', hex: '#9dc3e6', price: 479,
        images: [
          U('photo-1515372039744-b8f02a3ae446'), U('photo-1572804013309-59a88b7e92f1'),
          U('photo-1539109136881-3be0616acf4b'), U('photo-1490481651871-ab68de25d43d'),
        ],
      },
      {
        name: 'Pink', hex: '#e8a5c8', price: 489,
        images: [
          U('photo-1509631179647-0177331693ae'), U('photo-1554412933-514a83d2f3c8'),
          U('photo-1496747611176-843222e1e57c'), U('photo-1515886657613-9f3515b0c78f'),
        ],
      },
      {
        name: 'Peach', hex: '#f4b393', price: 499,
        images: [
          U('photo-1496747611176-843222e1e57c'), U('photo-1509631179647-0177331693ae'),
          U('photo-1515886657613-9f3515b0c78f'), U('photo-1554412933-514a83d2f3c8'),
        ],
      },
      {
        name: 'Rose Floral', hex: '#d9667f', price: 509,
        images: [
          U('photo-1554412933-514a83d2f3c8'), U('photo-1496747611176-843222e1e57c'),
          U('photo-1509631179647-0177331693ae'), U('photo-1539109136881-3be0616acf4b'),
        ],
      },
      {
        name: 'Green', hex: '#4f8a5b', price: 459,
        images: [
          U('photo-1490481651871-ab68de25d43d'), U('photo-1539109136881-3be0616acf4b'),
          U('photo-1572804013309-59a88b7e92f1'), U('photo-1515372039744-b8f02a3ae446'),
        ],
      },
    ],
  },
};

const rupee = (n) => `₹${n.toLocaleString('en-IN')}`;

/* -------------------------------------------------------------------------- */
/*  Hook: tracks scroll edges                                                  */
/* -------------------------------------------------------------------------- */
const useScrollEdges = (ref, deps = []) => {
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, [measure, ...deps]);

  return edges;
};

/* -------------------------------------------------------------------------- */
/*  Colour carousel                                                           */
/* -------------------------------------------------------------------------- */
const ColorCarousel = ({ colors, selected, onSelect, onHover }) => {
  const trackRef = useRef(null);
  const { start, end } = useScrollEdges(trackRef, [colors.length]);

  const scrollByPage = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  useEffect(() => {
    const node = trackRef.current?.querySelector('[aria-checked="true"]');
    node?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
  }, [selected.name]);

  const onKeyDown = (e) => {
    const i = colors.findIndex((c) => c.name === selected.name);
    if (e.key === 'ArrowRight') { e.preventDefault(); onSelect(colors[(i + 1) % colors.length]); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); onSelect(colors[(i - 1 + colors.length) % colors.length]); }
  };

  const ArrowBtn = ({ dir, hidden }) => (
    <button
      type="button"
      aria-label={dir < 0 ? 'Previous colours' : 'Next colours'}
      onClick={() => scrollByPage(dir)}
      className={`absolute top-1/2 z-10 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full
        bg-white text-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,.25)] transition
        hover:scale-105 active:scale-95 ${dir < 0 ? 'left-1' : 'right-1'}
        ${hidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      {dir < 0 ? <FiChevronLeft className="h-5 w-5" /> : <FiChevronRight className="h-5 w-5" />}
    </button>
  );

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="radiogroup"
        aria-label="Select colour"
        onKeyDown={onKeyDown}
        className="flex gap-3 overflow-x-auto scroll-smooth py-1 pr-1 snap-x snap-mandatory
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {colors.map((c) => {
          const active = c.name === selected.name;
          return (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={c.name}
              title={c.name}
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(c)}
              onMouseEnter={() => onHover(c)}
              className={`snap-start shrink-0 rounded-2xl border-2 p-[3px] transition-all
                ${active ? 'border-neutral-950 ring-2 ring-neutral-950/20' : 'border-neutral-300 hover:border-neutral-500'}`}
            >
              <span className="block h-[104px] w-[88px] overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src={c.images[0]}
                  alt={c.name}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover object-top"
                />
              </span>
            </button>
          );
        })}
      </div>
      <ArrowBtn dir={-1} hidden={start} />
      <ArrowBtn dir={1} hidden={end} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */
const ProductDetailPage = () => {
  const { id } = useParams();
  const product = PRODUCT_DATABASE[id] || PRODUCT_DATABASE[1];

  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [offersOpen, setOffersOpen] = useState(true);
  const [cartState, setCartState] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    setColor(product.colors[0]);
    setSize(null);
    setCartState('idle');
  }, [product]);

  const preloaded = useRef(new Set());
  const preload = useCallback((c) => {
    if (preloaded.current.has(c.name)) return;
    preloaded.current.add(c.name);
    c.images.forEach((src) => { const im = new Image(); im.src = src; });
  }, []);

  useEffect(() => { product.colors.forEach(preload); }, [product, preload]);

  const price = color.price;

  const needSize = () => {
    if (!size) { setSizeError(true); return true; }
    return false;
  };

  const addToCart = () => {
    if (needSize()) return;
    setCartState('loading');
    setTimeout(() => {
      setCartState('success');
    }, 900);
  };

  const buyNow = () => {
    if (!needSize()) alert(`Proceeding to checkout: ${color.name} / ${size} – ${rupee(price)}`);
  };

  const breadcrumb = useMemo(
    () => ['Home', ...product.breadcrumb, product.title.replace(/^Gulabi Jaipur /, '').replace('Maxi/Full', `${color.name} Maxi/Full`)],
    [product, color.name],
  );

  useEffect(() => {
    if (lightbox === null) return undefined;
    const imgs = color.images;
    const h = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % imgs.length);
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [lightbox, color]);

  return (
    <div className="min-h-screen bg-white font-[Inter,system-ui,sans-serif] text-neutral-900">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1500px] px-6 pt-3 text-[14px] text-neutral-500">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {breadcrumb.map((b, i) => (
            <li key={b + i} className="flex items-center gap-2">
              {i < breadcrumb.length - 1 ? (
                <>
                  <Link to={i === 0 ? '/' : '/shop'} className="hover:text-neutral-900">{b}</Link>
                  <span aria-hidden>/</span>
                </>
              ) : (
                <span className="text-neutral-800 font-medium truncate max-w-[300px]">{b}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Main Grid Container with Even Alignment */}
      <div className="mx-auto grid max-w-[1500px] gap-10 px-6 pb-32 pt-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        
        {/* ------------------------------ GALLERY ------------------------------ */}
        <section aria-label="Product images" className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={color.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-2 gap-4"
            >
              {color.images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f3e9e1] shadow-sm
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                  aria-label={`Open ${color.name} image ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`${product.title} – ${color.name} ${i + 1}`}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Wishlist & Share action buttons fixed over images */}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-3">
            <button
              type="button"
              aria-pressed={liked}
              aria-label="Add to wishlist"
              onClick={() => setLiked((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-md transition hover:scale-105"
            >
              <FiHeart className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : 'text-neutral-700'}`} />
            </button>
            <button
              type="button"
              aria-label="Share"
              onClick={() => navigator.share?.({ title: product.title, url: window.location.href }).catch(() => {})}
              className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-md transition hover:scale-105"
            >
              <FiSend className="h-5 w-5 text-neutral-700" />
            </button>
          </div>
        </section>

        {/* ------------------------------ DETAILS PANEL ------------------------------ */}
        <section className="min-w-0 space-y-6">
          
          {/* Sponsored strip */}
          <a
            href="#sponsored"
            className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-3 border border-neutral-200/60 transition hover:bg-neutral-100/80"
          >
            <img src={product.ad.img} alt="" className="h-[54px] w-[44px] rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-neutral-800">{product.ad.title}</p>
              <p className="text-sm mt-0.5">
                <span className="font-bold text-emerald-700">↓{product.ad.off}%</span>{' '}
                <span className="text-neutral-400 line-through">₹{product.ad.mrp.toLocaleString('en-IN')}</span>{' '}
                <span className="font-semibold text-neutral-900">{rupee(product.ad.price)}</span>
              </p>
            </div>
            <span className="rounded-lg bg-neutral-900 px-2 py-1 text-[10px] font-black tracking-wider text-white">AD</span>
          </a>

          {/* Title + rating */}
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl font-semibold leading-snug text-neutral-900">
              {product.title.replace('Maxi/Full', `${color.name} Maxi/Full`)}
            </h1>
            <div className="inline-flex items-center gap-2 rounded-xl bg-neutral-100 px-3 py-1.5 text-sm font-medium">
              <span className="font-bold text-neutral-900">{product.rating}</span>
              <FiStar className="h-4 w-4 fill-emerald-700 text-emerald-700" />
              <span className="h-4 w-px bg-neutral-300" />
              <span className="text-neutral-500">{product.ratingCount} ratings</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 rounded-2xl bg-neutral-50/70 p-4 border border-neutral-100">
            <span className="text-3xl font-extrabold text-emerald-700">↓{product.discount}%</span>
            <span className="text-2xl text-neutral-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={price}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900"
              >
                {rupee(price)}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Selected colour + carousel */}
          <div className="space-y-3 pt-2">
            <p className="text-base font-semibold text-neutral-950">
              Selected Color: <span className="uppercase text-emerald-700">{color.name}</span>
            </p>
            <ColorCarousel colors={product.colors} selected={color} onSelect={setColor} onHover={preload} />
          </div>

          {/* Size */}
          <div className="space-y-3 pt-2">
            <div className="flex items-baseline justify-between">
              <span className="text-base font-semibold text-neutral-950">Select Size</span>
              <button type="button" className="text-sm font-medium text-blue-600 hover:underline">Size Chart</button>
            </div>
            <div role="radiogroup" aria-label="Select size" className="flex flex-wrap gap-3">
              {product.sizes.map((s) => {
                const active = size === s.label;
                return (
                  <button
                    key={s.label}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    disabled={!s.inStock}
                    onClick={() => { setSize(s.label); setSizeError(false); }}
                    className={`relative h-12 min-w-[58px] overflow-hidden rounded-xl border px-4 text-base font-medium transition
                      ${active ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm' : 'border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900'}
                      ${!s.inStock ? 'cursor-not-allowed bg-neutral-100 text-neutral-400 hover:border-neutral-300' : ''}`}
                  >
                    {s.label}
                    {!s.inStock && (
                      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top_right,transparent_48%,#d4d4d4_50%,transparent_52%)]" />
                    )}
                  </button>
                );
              })}
            </div>
            {sizeError && <p role="alert" className="text-xs font-semibold text-red-600">Please select a size to proceed</p>}
          </div>

          {/* Offers Accordion */}
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/50 shadow-sm">
            <button
              type="button"
              aria-expanded={offersOpen}
              onClick={() => setOffersOpen((v) => !v)}
              className="flex w-full items-center gap-3 bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-3.5 text-left text-white"
            >
              <span className="-rotate-3 rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] font-black italic leading-none">
                WOW!<br />DEAL
              </span>
              <span className="flex-1 text-base font-semibold">Apply offers for maximum savings</span>
              {offersOpen ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
            </button>
            <AnimatePresence initial={false}>
              {offersOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden px-4 text-sm text-neutral-700"
                >
                  <li className="pt-3">10% off with Bank Credit Cards (up to ₹100)</li>
                  <li className="pb-3">Extra ₹30 off on prepaid online payments</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Peace of mind guarantee blocks */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5">
              <FiShield className="h-5 w-5 text-emerald-700 shrink-0" />
              <span className="text-xs font-semibold text-neutral-800">100% Secure Payments</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5">
              <FiRotateCcw className="h-5 w-5 text-emerald-700 shrink-0" />
              <span className="text-xs font-semibold text-neutral-800">14-Day Easy Returns</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5">
              <FiAward className="h-5 w-5 text-emerald-700 shrink-0" />
              <span className="text-xs font-semibold text-neutral-800">Verified Authentic</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5">
              <FiTruck className="h-5 w-5 text-emerald-700 shrink-0" />
              <span className="text-xs font-semibold text-neutral-800">Fast Home Delivery</span>
            </div>
          </div>

          {/* Product Highlights */}
          <div className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <FiInfo className="h-4 w-4 text-emerald-700" /> Product Highlights & Specs
            </h3>
            <p className="text-sm font-light text-neutral-600 leading-relaxed">{product.description}</p>
            <ul className="space-y-1.5 pt-2 border-t border-neutral-100">
              {product.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* ------------------------------ STICKY ACTION BAR ------------------------------ */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur lg:left-auto lg:right-0 lg:w-[calc(50%-1rem)] lg:border-t-0 lg:bg-transparent lg:px-6 lg:backdrop-blur-0">
        <div className="mx-auto flex max-w-xl gap-3 lg:max-w-none">
          
          {/* Add to Cart button with Gpay style Success / Loading state */}
          <button
            type="button"
            onClick={addToCart}
            disabled={cartState === 'loading'}
            className={`relative flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-neutral-300 bg-white text-base font-semibold shadow-sm transition hover:border-neutral-900 active:scale-[.99] overflow-hidden
              ${cartState === 'success' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : ''}`}
          >
            <AnimatePresence mode="wait">
              {cartState === 'idle' && (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <FiShoppingCart className="h-5 w-5" /> Add to cart
                </motion.span>
              )}
              {cartState === 'loading' && (
                <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" /> Adding...
                </motion.span>
              )}
              {cartState === 'success' && (
                <motion.span key="success" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 font-bold">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm"
                  >
                    <FiCheck className="h-4 w-4 stroke-[3]" />
                  </motion.div>
                  Added to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={buyNow}
            className="h-14 flex-1 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-400 text-base font-bold shadow-sm transition hover:brightness-95 active:scale-[.99]"
          >
            Buy at {rupee(price)}
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <button
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white shadow-lg transition hover:scale-105"
            >
              <FiX className="h-5 w-5" />
            </button>
            <button
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + color.images.length) % color.images.length); }}
              className="absolute left-5 grid h-12 w-12 place-items-center rounded-full bg-white shadow-lg transition hover:scale-105"
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>
            <img
              src={color.images[lightbox]}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-full rounded-2xl object-contain"
            />
            <button
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % color.images.length); }}
              className="absolute right-5 grid h-12 w-12 place-items-center rounded-full bg-white shadow-lg transition hover:scale-105"
            >
              <FiChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;