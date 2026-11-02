import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  FiX, FiSearch, FiShoppingBag, FiHeart,
  FiChevronDown, FiChevronRight, FiUser, FiLogIn,
  FiHome, FiTag, FiStar, FiPackage, FiMail, FiArrowRight,
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectCartItems } from '@store/slices/cartSlice';
import { selectWishlistItems } from '@store/slices/wishlistSlice';
import { selectIsAuthenticated, selectUser } from '@store/slices/authSlice';
import { selectProducts } from '@store/slices/productSlice';
import { formatCurrency } from '@utils/formatCurrency';

/* ─────────────────────────────────────────────────────────
   BRAND TOKENS
───────────────────────────────────────────────────────── */
const BRAND = '#173b36';
const GOLD = '#b08d57';
const RULE = '#ede9e3';
const MUTED = '#9a8c7c';
const CHIP_BG = '#f0ede8';

/* ─────────────────────────────────────────────────────────
   NAV DATA
───────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: FiHome },
  { label: 'Women', href: '/shop/women', icon: FiUser, subs: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Knitwear'] },
  { label: 'Men', href: '/shop/men', icon: FiUser, subs: ['Tops', 'Bottoms', 'Outerwear', 'Shoes'] },
  { label: 'Kids', href: '/shop/kids', icon: FiHeart, subs: ['Boys', 'Girls', 'Baby', 'Toys'] },
  { label: 'Accessories', href: '/shop/accessories', icon: FiShoppingBag, subs: ['Accessories', 'Bags', 'Shoes'] },
  { label: 'Sale', href: '/shop/sale', icon: FiTag },
  { label: 'New Arrivals', href: '/shop/new', icon: FiStar },
  { label: 'Contact', href: '/contact', icon: FiMail },
];

const slugify = (t) =>
  t.toLowerCase().replace(/%/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/* ─────────────────────────────────────────────────────────
   INLINE SEARCH PANEL  (rendered inside the portal)
───────────────────────────────────────────────────────── */
const InlineSearch = ({ products, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // autofocus when shown
    setTimeout(() => inputRef.current?.focus(), 60);
  }, []);

  const results = query.trim().length > 1
    ? products.filter(p =>
      p.name?.toLowerCase().includes(query.toLowerCase()) ||
      p.category?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6)
    : [];

  const go = (path) => { onClose(); onNavigate(path); };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, bottom: 0,
      width: 'min(90vw, 340px)',
      zIndex: 1300,
      background: '#fff',
      display: 'flex', flexDirection: 'column',
      boxShadow: '12px 0 48px rgba(0,0,0,0.16)',
    }}>
      {/* Search bar header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '16px 14px',
        borderBottom: `1px solid ${RULE}`,
        flexShrink: 0,
      }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 14px', borderRadius: 12,
          background: CHIP_BG,
        }}>
          <FiSearch size={15} style={{ color: '#888', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, categories…"
            aria-label="Search"
            style={{
              flex: 1, border: 'none', background: 'transparent',
              fontSize: 14, color: '#333', outline: 'none',
              minWidth: 0,
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && query.trim()) {
                go(`/search?q=${encodeURIComponent(query.trim())}`);
              }
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: MUTED, lineHeight: 1 }}
            >
              <FiX size={14} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 600, color: BRAND, padding: '4px 2px',
            flexShrink: 0,
          }}
        >
          Cancel
        </button>
      </div>

      {/* Results / suggestions */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px' }}>
        {results.length > 0 ? (
          <>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED, marginBottom: 8 }}>
              Results
            </p>
            {results.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => go(`/product/${p.slug ?? p.id}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  width: '100%', padding: '10px 8px', borderRadius: 10,
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = CHIP_BG)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <img
                  src={p.images?.[0] ?? p.image ?? ''}
                  alt=""
                  aria-hidden="true"
                  style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0, background: CHIP_BG }}
                />
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#222', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name}
                  </span>
                  <span style={{ fontSize: 12, color: MUTED }}>{formatCurrency(p.price)}</span>
                </span>
              </button>
            ))}
          </>
        ) : (
          <>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED, marginBottom: 10 }}>
              Popular Categories
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Women', 'Men', 'Kids', 'Accessories', 'Sale', 'New Arrivals'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => go(`/shop/${cat.toLowerCase().replace(/ /g, '-')}`)}
                  style={{
                    padding: '7px 14px', borderRadius: 20,
                    background: CHIP_BG, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, color: '#444',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = BRAND; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = CHIP_BG; e.currentTarget.style.color = '#444'; }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   NAV ROW
   - ALL rows use the same 3-column grid: [icon] [label] [chevron]
   - button rows get textAlign:'left' to prevent browser centering
   - clicking a parent header navigates immediately AND closes
───────────────────────────────────────────────────────── */
const NavRow = ({ item, onClose, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const hasSubs = !!item.subs?.length;
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

  /* Base grid row — shared by both <button> and <Link> */
  const rowBase = {
    display: 'grid',
    gridTemplateColumns: '44px 1fr 24px',   /* fixed icon column | label | chevron */
    alignItems: 'center',
    width: '100%',
    padding: '9px 12px 9px 10px',
    borderRadius: 13,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'left',            /* FIX: prevents <button> centring its text */
    transition: 'background 0.18s',
    background: isActive ? `${BRAND}14` : 'transparent',
    color: isActive ? BRAND : '#2a2a2a',
    boxSizing: 'border-box',
  };

  /* Icon chip — same fixed size on every row */
  const IconChip = () => (
    <span style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: 32, height: 32, borderRadius: 10,
      background: isActive ? BRAND : CHIP_BG,
      color: isActive ? '#fff' : MUTED,
      transition: 'background 0.18s, color 0.18s',
      flexShrink: 0,
    }}>
      <item.icon size={15} />
    </span>
  );

  /* Label text — always left-aligned, padded from icon */
  const LabelText = () => (
    <span style={{
      fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
      paddingLeft: 10,
      color: 'inherit',
      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      textAlign: 'left',
    }}>
      {item.label}
    </span>
  );

  if (hasSubs) {
    return (
      <li>
        {/*
          Clicking the row:
          - navigates to the category page immediately (closes drawer)
          - tapping the chevron only toggles the accordion
        */}
        <div style={{ ...rowBase, display: 'grid' }}>
          {/* Left: icon + label — clickable area that navigates */}
          <button
            type="button"
            onClick={() => { onClose(); onNavigate(item.href); }}
            aria-label={`Go to ${item.label}`}
            style={{
              display: 'contents',   /* merges into parent grid */
              background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            <IconChip />
            <LabelText />
          </button>

          {/* Right: chevron — toggles sub-list */}
          <button
            type="button"
            onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
            aria-expanded={open}
            aria-label={open ? `Collapse ${item.label}` : `Expand ${item.label}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              width: 24, height: 24, padding: 0,
            }}
          >
            <FiChevronDown
              size={15}
              style={{
                color: MUTED,
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s',
              }}
            />
          </button>
        </div>

        {/* Accordion sub-list */}
        <div style={{
          overflow: 'hidden',
          maxHeight: open ? `${(item.subs.length + 1) * 44 + 12}px` : 0,
          transition: 'max-height 0.28s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <ul style={{ margin: 0, padding: '4px 10px 8px 54px', listStyle: 'none' }}>
            {item.subs.map(sub => {
              const to = `${item.href}/${slugify(sub)}`;
              const subActive = pathname === to;
              return (
                <li key={sub}>
                  <Link
                    to={to}
                    onClick={onClose}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '9px 10px', borderRadius: 10,
                      textDecoration: 'none', fontSize: 14,
                      fontWeight: subActive ? 600 : 400,
                      color: subActive ? BRAND : '#555',
                      background: subActive ? `${BRAND}12` : 'transparent',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => !subActive && (e.currentTarget.style.background = CHIP_BG)}
                    onMouseLeave={e => !subActive && (e.currentTarget.style.background = 'transparent')}
                  >
                    <FiChevronRight size={12} style={{ color: MUTED, flexShrink: 0 }} />
                    {sub}
                  </Link>
                </li>
              );
            })}

            {/* View all */}
            <li>
              <Link
                to={item.href}
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 10px', borderRadius: 10,
                  textDecoration: 'none', fontSize: 13, fontWeight: 700,
                  color: BRAND, transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = `${BRAND}10`)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <FiArrowRight size={12} style={{ flexShrink: 0 }} />
                View all {item.label}
              </Link>
            </li>
          </ul>
        </div>
      </li>
    );
  }

  /* ── Simple direct link ── */
  return (
    <li>
      <Link
        to={item.href}
        onClick={onClose}
        style={rowBase}
        onMouseEnter={e => !isActive && (e.currentTarget.style.background = CHIP_BG)}
        onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
      >
        <IconChip />
        <LabelText />
        <span />   {/* empty 3rd column keeps grid intact */}
      </Link>
    </li>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
const MobileNavbar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const drawerRef = useRef(null);

  const cartItems = useSelector(selectCartItems) || [];
  const wishItems = useSelector(selectWishlistItems) || [];
  const products = useSelector(selectProducts) || [];
  const isAuth = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 1), 0);
  const wishCount = wishItems.length;

  /* Navigate + close helper */
  const go = (path) => { onClose?.(); navigate(path); };

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* close on route change */
  useEffect(() => { onClose?.(); }, [pathname]);

  /* Escape key */
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') {
        if (searchOpen) setSearchOpen(false);
        else onClose?.();
      }
    };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose, searchOpen]);

  /* auto-focus first element */
  useEffect(() => {
    if (isOpen && !searchOpen && drawerRef.current) {
      drawerRef.current.querySelector('button, a')?.focus();
    }
  }, [isOpen, searchOpen]);

  return createPortal(
    <>
      {/* ── BACKDROP ── */}
      <div
        aria-hidden="true"
        onClick={() => { if (searchOpen) setSearchOpen(false); else onClose?.(); }}
        style={{
          position: 'fixed', inset: 0, zIndex: 1100,
          background: 'rgba(10,20,18,0.52)',
          backdropFilter: 'blur(5px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.32s',
        }}
      />

      {/* ── INLINE SEARCH PANEL ── (slides in over the nav drawer) */}
      {isOpen && searchOpen && (
        <InlineSearch
          products={products}
          onClose={() => setSearchOpen(false)}
          onNavigate={go}
        />
      )}

      {/* ── MAIN DRAWER PANEL ── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          zIndex: 1200,
          width: 'min(90vw, 340px)',
          background: '#fff',
          boxShadow: '12px 0 48px rgba(0,0,0,0.16)',
          display: 'flex', flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.36s cubic-bezier(0.32,0.72,0,1)',
          willChange: 'transform',
        }}
      >

        {/* ═══ 1. HEADER ═══ */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 16px 16px',
          borderBottom: `1px solid ${RULE}`,
          flexShrink: 0,
        }}>
          <button
            type="button"
            onClick={() => go('/')}
            aria-label="Go to homepage"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              gap: 3, padding: 0,
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.22em', lineHeight: 1, color: BRAND }}>
              ROXVORA
            </span>
            <span style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: '0.2em', lineHeight: 1, color: MUTED, textTransform: 'uppercase' }}>
              Premium Fashion
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: '50%',
              background: CHIP_BG, border: 'none', cursor: 'pointer', color: '#555',
              transition: 'background 0.18s', flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e4e0da')}
            onMouseLeave={e => (e.currentTarget.style.background = CHIP_BG)}
          >
            <FiX size={17} />
          </button>
        </div>

        {/* ═══ 2. QUICK ACTIONS ═══ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 44px 44px',
          alignItems: 'center',
          gap: 8,
          padding: '14px 16px',
          borderBottom: `1px solid ${RULE}`,
          flexShrink: 0,
        }}>
          {/* Search pill — opens inline search panel */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', borderRadius: 12,
              background: CHIP_BG, border: 'none', cursor: 'pointer',
              color: '#888', transition: 'background 0.18s', textAlign: 'left',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e4e0da')}
            onMouseLeave={e => (e.currentTarget.style.background = CHIP_BG)}
          >
            <FiSearch size={15} style={{ flexShrink: 0, color: '#666' }} />
            <span style={{ fontSize: 14, color: '#aaa', fontWeight: 400 }}>Search…</span>
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            onClick={onClose}
            aria-label={`Cart${cartCount > 0 ? ` (${cartCount})` : ''}`}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: 12,
              background: CHIP_BG, textDecoration: 'none', color: '#444',
              transition: 'background 0.18s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e4e0da')}
            onMouseLeave={e => (e.currentTarget.style.background = CHIP_BG)}
          >
            <FiShoppingBag size={18} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 18, height: 18, borderRadius: '50%',
                background: BRAND, color: '#fff',
                fontSize: 10, fontWeight: 700, lineHeight: 1,
              }}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            onClick={onClose}
            aria-label={`Wishlist${wishCount > 0 ? ` (${wishCount})` : ''}`}
            style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: 12,
              background: CHIP_BG, textDecoration: 'none', color: '#444',
              transition: 'background 0.18s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e4e0da')}
            onMouseLeave={e => (e.currentTarget.style.background = CHIP_BG)}
          >
            <FiHeart size={18} />
            {wishCount > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 18, height: 18, borderRadius: '50%',
                background: GOLD, color: '#fff',
                fontSize: 10, fontWeight: 700, lineHeight: 1,
              }}>
                {wishCount > 9 ? '9+' : wishCount}
              </span>
            )}
          </Link>
        </div>

        {/* ═══ 3. BROWSE LABEL ═══ */}
        <div style={{ padding: '14px 16px 6px', flexShrink: 0 }}>
          <span style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: MUTED,
          }}>
            Browse
          </span>
        </div>

        {/* ═══ 4. NAV LIST ═══ */}
        <nav
          aria-label="Main navigation"
          style={{
            flex: 1, overflowY: 'auto', overflowX: 'hidden',
            padding: '0 8px 12px',
            scrollbarWidth: 'none',
          }}
        >
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {NAV_ITEMS.map(item => (
              <NavRow
                key={item.href}
                item={item}
                onClose={onClose}
                onNavigate={(path) => go(path)}
              />
            ))}
          </ul>
        </nav>

        {/* ═══ 5. FOOTER ═══ */}
        <div style={{
          flexShrink: 0,
          padding: '14px 16px',
          borderTop: `1px solid ${RULE}`,
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {isAuth ? (
            <Link
              to="/account"
              onClick={onClose}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 14,
                background: `${BRAND}0f`, textDecoration: 'none',
                transition: 'background 0.18s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = `${BRAND}18`)}
              onMouseLeave={e => (e.currentTarget.style.background = `${BRAND}0f`)}
            >
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 10,
                background: BRAND, color: '#fff', flexShrink: 0,
              }}>
                <FiUser size={16} />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: BRAND, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.name || 'My Account'}
                </span>
                <span style={{ display: 'block', fontSize: 11, color: MUTED, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.email}
                </span>
              </span>
              <FiChevronRight size={15} style={{ color: MUTED, flexShrink: 0 }} />
            </Link>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Link
                to="/login"
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 7, padding: '11px 0', borderRadius: 12,
                  border: `1.5px solid ${RULE}`,
                  textDecoration: 'none', fontSize: 14, fontWeight: 700,
                  color: BRAND, background: '#fff',
                  transition: 'border-color 0.18s, background 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = BRAND; e.currentTarget.style.background = `${BRAND}08`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = RULE; e.currentTarget.style.background = '#fff'; }}
              >
                <FiLogIn size={15} />
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 7, padding: '11px 0', borderRadius: 12,
                  border: `1.5px solid ${BRAND}`,
                  textDecoration: 'none', fontSize: 14, fontWeight: 700,
                  color: '#fff', background: BRAND,
                  transition: 'background 0.18s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f2a26')}
                onMouseLeave={e => (e.currentTarget.style.background = BRAND)}
              >
                Sign Up
              </Link>
            </div>
          )}

          <Link
            to="/account/orders"
            onClick={onClose}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 4px', borderRadius: 8,
              textDecoration: 'none', fontSize: 13, fontWeight: 500,
              color: MUTED, transition: 'color 0.18s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = BRAND)}
            onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
          >
            <FiPackage size={14} style={{ flexShrink: 0 }} />
            <span>Track my orders</span>
          </Link>
        </div>

      </div>
    </>,
    document.body
  );
};

export default MobileNavbar;
