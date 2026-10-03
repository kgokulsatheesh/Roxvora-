/* =========================================================
   ROXVORA — SHARED PRODUCT DATA
   ─────────────────────────────────────────────────────────
   All 6 categories with 6 products each.
   Each product has:
     id, name, category, categorySlug, price, originalPrice,
     discount, rating, reviewCount, images[], colors[],
     sizes[], stock, description, details[], specs{}
========================================================= */

/* ── helpers ─────────────────────────────────────────── */
const pct = (original, sale) =>
  Math.round(((original - sale) / original) * 100);

/* =========================================================
   T-SHIRTS
========================================================= */
const tshirts = [
  {
    id: "ts-001",
    name: "Oversized Essential Tee",
    category: "T-Shirts",
    categorySlug: "t-shirts",
    price: 1299,
    originalPrice: 1999,
    discount: pct(1999, 1299),
    rating: 4.6,
    reviewCount: 284,
    stock: 18,
    colors: [
      { name: "Jet Black", hex: "#111111" },
      { name: "Chalk White", hex: "#F5F5F0" },
      { name: "Warm Grey", hex: "#9B9791" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "The essential tee reimagined. Cut from 100% organic heavyweight cotton in a relaxed oversized silhouette — this is the foundation of any modern wardrobe.",
    details: [
      "100% organic heavyweight cotton (240 GSM)",
      "Relaxed oversized fit",
      "Dropped shoulders",
      "Ribbed crew neck",
      "Pre-washed for softness",
    ],
    specs: {
      Fabric: "100% Organic Cotton",
      Weight: "240 GSM",
      Fit: "Oversized",
      Care: "Machine wash cold, tumble dry low",
      Origin: "Made in India",
    },
  },
  {
    id: "ts-002",
    name: "Graphic Drop Shoulder Tee",
    category: "T-Shirts",
    categorySlug: "t-shirts",
    price: 1499,
    originalPrice: 2199,
    discount: pct(2199, 1499),
    rating: 4.4,
    reviewCount: 176,
    stock: 12,
    colors: [
      { name: "Vintage Black", hex: "#1A1A1A" },
      { name: "Stone", hex: "#C8C2B8" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Statement graphics on heavyweight cotton. A bold drop-shoulder cut with precision screen-printed artwork that doesn't wash out.",
    details: [
      "220 GSM heavyweight cotton",
      "Drop shoulder construction",
      "Water-based screen print",
      "Crew neck with clean finish",
      "Boxy fit",
    ],
    specs: {
      Fabric: "100% Cotton",
      Weight: "220 GSM",
      Fit: "Boxy / Drop Shoulder",
      Care: "Machine wash cold inside out",
      Origin: "Made in India",
    },
  },
  {
    id: "ts-003",
    name: "Longline Layering Tee",
    category: "T-Shirts",
    categorySlug: "t-shirts",
    price: 1199,
    originalPrice: 1799,
    discount: pct(1799, 1199),
    rating: 4.3,
    reviewCount: 142,
    stock: 22,
    colors: [
      { name: "Midnight", hex: "#0D0D0D" },
      { name: "Bone", hex: "#E8E3D9" },
      { name: "Slate", hex: "#6B7280" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Extended hem, clean drape. The longline tee is built for layering — wear alone or under an open shirt for an editorial edge.",
    details: [
      "Lightweight 180 GSM jersey",
      "Extended hem",
      "Side slits for movement",
      "Slim to regular fit",
      "Crew neck",
    ],
    specs: {
      Fabric: "95% Cotton, 5% Elastane",
      Weight: "180 GSM",
      Fit: "Slim / Longline",
      Care: "Machine wash 30°C",
      Origin: "Made in India",
    },
  },
  {
    id: "ts-004",
    name: "Polo Collar Tee",
    category: "T-Shirts",
    categorySlug: "t-shirts",
    price: 1599,
    originalPrice: 2299,
    discount: pct(2299, 1599),
    rating: 4.7,
    reviewCount: 319,
    stock: 8,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Ivory", hex: "#F8F5EE" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1625910513413-e41b44c26d24?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Elevated casualwear. The ribbed polo collar adds structured refinement to an otherwise relaxed tee — perfect for smart-casual dressing.",
    details: [
      "Pique cotton construction",
      "Ribbed polo collar",
      "Two-button placket",
      "Regular fit",
      "Side seams for shape",
    ],
    specs: {
      Fabric: "100% Pique Cotton",
      Weight: "200 GSM",
      Fit: "Regular",
      Care: "Machine wash cold",
      Origin: "Made in India",
    },
  },
  {
    id: "ts-005",
    name: "Washed Vintage Tee",
    category: "T-Shirts",
    categorySlug: "t-shirts",
    price: 1399,
    originalPrice: 1999,
    discount: pct(1999, 1399),
    rating: 4.5,
    reviewCount: 201,
    stock: 15,
    colors: [
      { name: "Faded Black", hex: "#2C2C2C" },
      { name: "Sand", hex: "#C8B89A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Intentionally worn-in. Enzyme-washed for a lived-in texture that looks and feels like your favourite vintage tee — from day one.",
    details: [
      "Enzyme-washed for vintage texture",
      "230 GSM mid-weight cotton",
      "Relaxed fit",
      "Crew neck",
      "Raw hem finish",
    ],
    specs: {
      Fabric: "100% Cotton",
      Weight: "230 GSM",
      Fit: "Relaxed",
      Care: "Machine wash cold, line dry",
      Origin: "Made in India",
    },
  },
  {
    id: "ts-006",
    name: "Ribbed Slim Tee",
    category: "T-Shirts",
    categorySlug: "t-shirts",
    price: 999,
    originalPrice: 1499,
    discount: pct(1499, 999),
    rating: 4.2,
    reviewCount: 98,
    stock: 30,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Charcoal", hex: "#3D3D3D" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1525171254930-643fc658b64e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "The slim rib tee. A body-conscious cut in fine-ribbed cotton that hugs the frame without restricting movement.",
    details: [
      "Fine rib knit construction",
      "Slim body-con fit",
      "Crew neck",
      "Stretch for comfort",
      "Versatile layering piece",
    ],
    specs: {
      Fabric: "95% Cotton, 5% Elastane",
      Weight: "160 GSM",
      Fit: "Slim / Body-Con",
      Care: "Machine wash 30°C",
      Origin: "Made in India",
    },
  },
];

/* =========================================================
   SHIRTS
========================================================= */
const shirts = [
  {
    id: "sh-001",
    name: "Relaxed Linen Shirt",
    category: "Shirts",
    categorySlug: "shirts",
    price: 1899,
    originalPrice: 2799,
    discount: pct(2799, 1899),
    rating: 4.8,
    reviewCount: 367,
    stock: 14,
    colors: [
      { name: "Natural", hex: "#E8DCC8" },
      { name: "Black", hex: "#111111" },
      { name: "Sage", hex: "#8A9E8A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Pure linen, naturally breathable. The relaxed linen shirt is designed for effortless warm-weather dressing — structured enough for dinner, casual enough for a weekend away.",
    details: [
      "100% premium European linen",
      "Relaxed fit with chest patch pocket",
      "Mother-of-pearl buttons",
      "Single cuff",
      "Curved hem",
    ],
    specs: {
      Fabric: "100% Linen",
      Fit: "Relaxed",
      Collar: "Classic spread",
      Care: "Hand wash or dry clean",
      Origin: "Made in India",
    },
  },
  {
    id: "sh-002",
    name: "Oxford Poplin Shirt",
    category: "Shirts",
    categorySlug: "shirts",
    price: 1999,
    originalPrice: 2999,
    discount: pct(2999, 1999),
    rating: 4.6,
    reviewCount: 221,
    stock: 20,
    colors: [
      { name: "White", hex: "#FAFAF8" },
      { name: "Light Blue", hex: "#BFD4E8" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "A boardroom essential. The Oxford poplin shirt is crafted from 100% Egyptian cotton with a fine basket weave — smart, versatile, and enduringly classic.",
    details: [
      "100% Egyptian cotton poplin",
      "Classic regular fit",
      "Button-down collar",
      "Chest pocket",
      "Straight hem",
    ],
    specs: {
      Fabric: "100% Egyptian Cotton",
      Fit: "Regular",
      Collar: "Button-down",
      Care: "Machine wash 40°C",
      Origin: "Made in India",
    },
  },
  {
    id: "sh-003",
    name: "Cuban Collar Camp Shirt",
    category: "Shirts",
    categorySlug: "shirts",
    price: 2199,
    originalPrice: 3199,
    discount: pct(3199, 2199),
    rating: 4.5,
    reviewCount: 158,
    stock: 9,
    colors: [
      { name: "Ecru", hex: "#F0EAD6" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1602810319250-a663f0af2f75?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Resort-ready editorial. The Cuban collar camp shirt blends relaxed vacation energy with the clean construction that ROXVORA is known for.",
    details: [
      "Viscose-linen blend",
      "Revere / Cuban collar",
      "Short sleeves",
      "Loose boxy fit",
      "Side seam pockets",
    ],
    specs: {
      Fabric: "55% Viscose, 45% Linen",
      Fit: "Loose / Boxy",
      Collar: "Cuban / Revere",
      Care: "Hand wash cold",
      Origin: "Made in India",
    },
  },
  {
    id: "sh-004",
    name: "Formal Slim Fit Shirt",
    category: "Shirts",
    categorySlug: "shirts",
    price: 1799,
    originalPrice: 2599,
    discount: pct(2599, 1799),
    rating: 4.7,
    reviewCount: 412,
    stock: 25,
    colors: [
      { name: "White", hex: "#FAFAF8" },
      { name: "Sky Blue", hex: "#C5D8EC" },
      { name: "Charcoal", hex: "#3A3A3A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Sharp precision tailoring. Cut close to the body from premium no-iron cotton — this formal slim-fit shirt takes you from office to occasion without compromise.",
    details: [
      "No-iron premium cotton",
      "Slim tailored fit",
      "Hidden placket",
      "French tuck friendly length",
      "Barrel cuffs",
    ],
    specs: {
      Fabric: "100% No-Iron Cotton",
      Fit: "Slim",
      Collar: "Semi-spread",
      Care: "Machine wash cold, hang dry",
      Origin: "Made in India",
    },
  },
  {
    id: "sh-005",
    name: "Denim Overshirt",
    category: "Shirts",
    categorySlug: "shirts",
    price: 2499,
    originalPrice: 3599,
    discount: pct(3599, 2499),
    rating: 4.4,
    reviewCount: 189,
    stock: 7,
    colors: [
      { name: "Indigo", hex: "#2F4070" },
      { name: "Washed Black", hex: "#2A2A2A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "The denim overshirt — a layering hero. Wear open as a jacket or buttoned up as a statement piece. Built from 8oz washed denim for a premium broken-in feel.",
    details: [
      "8oz washed Japanese denim",
      "Chest patch pockets",
      "Western-style pointed yoke",
      "Oversized layering fit",
      "Snap buttons",
    ],
    specs: {
      Fabric: "100% Cotton Denim",
      Weight: "8 oz",
      Fit: "Oversized",
      Care: "Machine wash cold inside out",
      Origin: "Made in India",
    },
  },
  {
    id: "sh-006",
    name: "Seersucker Resort Shirt",
    category: "Shirts",
    categorySlug: "shirts",
    price: 2099,
    originalPrice: 2999,
    discount: pct(2999, 2099),
    rating: 4.3,
    reviewCount: 94,
    stock: 11,
    colors: [
      { name: "White/Blue Stripe", hex: "#D4E4F0" },
      { name: "White/Black Stripe", hex: "#C8C8C8" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Summer textured dressing. Seersucker's puckered weave allows air to circulate, keeping you cool while the stripe pattern keeps you sharp.",
    details: [
      "100% cotton seersucker",
      "Puckered texture weave",
      "Notched collar",
      "Short sleeves",
      "Relaxed straight fit",
    ],
    specs: {
      Fabric: "100% Cotton",
      Fit: "Relaxed",
      Collar: "Notched",
      Care: "Machine wash 30°C",
      Origin: "Made in India",
    },
  },
];

/* =========================================================
   TROUSERS
========================================================= */
const trousers = [
  {
    id: "tr-001",
    name: "Tailored Slim Chino",
    category: "Trousers",
    categorySlug: "trousers",
    price: 2499,
    originalPrice: 3499,
    discount: pct(3499, 2499),
    rating: 4.7,
    reviewCount: 298,
    stock: 16,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Stone", hex: "#C8BC9E" },
      { name: "Navy", hex: "#1C2E4A" },
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Clean lines, precise fit. The tailored slim chino bridges the gap between casual and formal — the trouser you'll reach for every single day.",
    details: [
      "Stretch cotton blend",
      "Slim tailored fit through thigh",
      "Tapered leg",
      "Four-pocket construction",
      "Flat front",
    ],
    specs: {
      Fabric: "98% Cotton, 2% Elastane",
      Fit: "Slim / Tapered",
      Rise: "Mid rise",
      Care: "Machine wash cold",
      Origin: "Made in India",
    },
  },
  {
    id: "tr-002",
    name: "Wide Leg Trousers",
    category: "Trousers",
    categorySlug: "trousers",
    price: 2799,
    originalPrice: 3999,
    discount: pct(3999, 2799),
    rating: 4.5,
    reviewCount: 167,
    stock: 10,
    colors: [
      { name: "Ecru", hex: "#EDE5D0" },
      { name: "Black", hex: "#111111" },
      { name: "Camel", hex: "#C19A6B" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Volume and elegance. The wide-leg trouser delivers an effortlessly editorial silhouette — pair with a fitted tee or a structured overshirt.",
    details: [
      "Wool-blend suiting fabric",
      "Wide leg from hip to hem",
      "Pleated front",
      "Side adjusters",
      "Lightly lined",
    ],
    specs: {
      Fabric: "70% Polyester, 30% Viscose",
      Fit: "Wide / Relaxed",
      Rise: "High rise",
      Care: "Dry clean recommended",
      Origin: "Made in India",
    },
  },
  {
    id: "tr-003",
    name: "Cargo Utility Trousers",
    category: "Trousers",
    categorySlug: "trousers",
    price: 2999,
    originalPrice: 4199,
    discount: pct(4199, 2999),
    rating: 4.6,
    reviewCount: 243,
    stock: 13,
    colors: [
      { name: "Olive", hex: "#4A5240" },
      { name: "Black", hex: "#111111" },
      { name: "Sand", hex: "#C8B49A" },
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Function meets form. The cargo trouser is rebuilt for modern fashion — relaxed through the seat with a tapered hem and minimal hardware for a clean, contemporary look.",
    details: [
      "Heavy ripstop cotton",
      "Six-pocket cargo construction",
      "Relaxed fit through seat",
      "Tapered from knee",
      "Adjustable hem tabs",
    ],
    specs: {
      Fabric: "100% Ripstop Cotton",
      Fit: "Relaxed / Tapered",
      Rise: "Mid rise",
      Care: "Machine wash 40°C",
      Origin: "Made in India",
    },
  },
  {
    id: "tr-004",
    name: "Formal Dress Trousers",
    category: "Trousers",
    categorySlug: "trousers",
    price: 2299,
    originalPrice: 3499,
    discount: pct(3499, 2299),
    rating: 4.8,
    reviewCount: 389,
    stock: 20,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Navy", hex: "#1C2E4A" },
    ],
    sizes: ["28", "30", "32", "34", "36", "38", "40"],
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Boardroom authority. Cut from premium suiting fabric with a subtle sheen — these flat-front dress trousers define sharp occasion dressing.",
    details: [
      "Premium suiting fabric",
      "Flat front construction",
      "Slim fit through thigh",
      "Tapered to ankle",
      "Side adjusters at waistband",
    ],
    specs: {
      Fabric: "65% Polyester, 35% Viscose",
      Fit: "Slim / Formal",
      Rise: "Mid rise",
      Care: "Dry clean only",
      Origin: "Made in India",
    },
  },
  {
    id: "tr-005",
    name: "Linen Drawstring Trousers",
    category: "Trousers",
    categorySlug: "trousers",
    price: 2199,
    originalPrice: 3099,
    discount: pct(3099, 2199),
    rating: 4.4,
    reviewCount: 132,
    stock: 18,
    colors: [
      { name: "Natural", hex: "#E2D9C5" },
      { name: "Black", hex: "#111111" },
      { name: "Blue", hex: "#4A6FA5" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Easy, breathable luxury. Linen drawstring trousers for the man who knows comfort and style aren't mutually exclusive.",
    details: [
      "100% linen",
      "Elasticated drawstring waistband",
      "Relaxed wide leg",
      "Side pockets + back pocket",
      "Ankle length",
    ],
    specs: {
      Fabric: "100% Linen",
      Fit: "Relaxed",
      Rise: "Mid rise",
      Care: "Machine wash cold",
      Origin: "Made in India",
    },
  },
  {
    id: "tr-006",
    name: "Pleated Tapered Trousers",
    category: "Trousers",
    categorySlug: "trousers",
    price: 2699,
    originalPrice: 3799,
    discount: pct(3799, 2699),
    rating: 4.5,
    reviewCount: 177,
    stock: 11,
    colors: [
      { name: "Cream", hex: "#EDE8DC" },
      { name: "Charcoal", hex: "#3A3A3A" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Architectural tailoring. Double pleats add volume at the hip that tapers to a clean ankle — a statement in refined menswear.",
    details: [
      "Italian-inspired suiting fabric",
      "Double forward pleats",
      "High rise",
      "Tapered from knee to hem",
      "Turn-up hem option",
    ],
    specs: {
      Fabric: "80% Polyester, 20% Wool",
      Fit: "Pleated / Tapered",
      Rise: "High rise",
      Care: "Dry clean recommended",
      Origin: "Made in India",
    },
  },
];

/* =========================================================
   JACKETS
========================================================= */
const jackets = [
  {
    id: "jk-001",
    name: "Minimal Bomber Jacket",
    category: "Jackets",
    categorySlug: "jackets",
    price: 4999,
    originalPrice: 6999,
    discount: pct(6999, 4999),
    rating: 4.8,
    reviewCount: 312,
    stock: 8,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Olive", hex: "#4A5240" },
      { name: "Camel", hex: "#C19A6B" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "The modern bomber. Clean silhouette, premium satin shell, ribbed collar and cuffs — the ROXVORA bomber is the outerwear centrepiece of any seasonal wardrobe.",
    details: [
      "100% polyester satin shell",
      "Quilted lining",
      "Ribbed collar, cuffs and hem",
      "Two side zip pockets",
      "Inside chest pocket",
    ],
    specs: {
      Fabric: "100% Polyester (Shell), Polyester Lining",
      Fit: "Regular",
      Closure: "YKK zip",
      Care: "Machine wash cold, tumble dry low",
      Origin: "Made in India",
    },
  },
  {
    id: "jk-002",
    name: "Structured Blazer",
    category: "Jackets",
    categorySlug: "jackets",
    price: 5999,
    originalPrice: 8499,
    discount: pct(8499, 5999),
    rating: 4.9,
    reviewCount: 421,
    stock: 6,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Beige", hex: "#DDD0B8" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1600012953053-fc50a19db0bf?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Command the room. The ROXVORA structured blazer is cut from premium suiting fabric with a half canvas construction that shapes perfectly to the body.",
    details: [
      "Half-canvas construction",
      "Peak lapels",
      "Two-button fastening",
      "Chest welt pocket",
      "Two flap hip pockets",
    ],
    specs: {
      Fabric: "65% Polyester, 35% Viscose",
      Fit: "Slim / Structured",
      Lining: "Fully lined",
      Care: "Dry clean only",
      Origin: "Made in India",
    },
  },
  {
    id: "jk-003",
    name: "Coach Windbreaker",
    category: "Jackets",
    categorySlug: "jackets",
    price: 3999,
    originalPrice: 5499,
    discount: pct(5499, 3999),
    rating: 4.5,
    reviewCount: 198,
    stock: 14,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Navy", hex: "#1C2E4A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Lightweight protection with a streetwear edge. The coach windbreaker packs down small and keeps you sheltered — a utility piece elevated with premium detailing.",
    details: [
      "Nylon shell with DWR coating",
      "Snap button front",
      "Elastic hem and cuffs",
      "Kangaroo pocket",
      "Packable into chest pocket",
    ],
    specs: {
      Fabric: "100% Nylon (DWR coated)",
      Fit: "Regular",
      Closure: "Snap buttons",
      Care: "Machine wash cold",
      Origin: "Made in India",
    },
  },
  {
    id: "jk-004",
    name: "Overshirt Jacket",
    category: "Jackets",
    categorySlug: "jackets",
    price: 3499,
    originalPrice: 4999,
    discount: pct(4999, 3499),
    rating: 4.4,
    reviewCount: 154,
    stock: 17,
    colors: [
      { name: "Stone", hex: "#C8BC9E" },
      { name: "Black", hex: "#111111" },
      { name: "Olive", hex: "#5A6040" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "The shirt-jacket hybrid. Thick enough to wear as outerwear, structured enough to anchor any outfit — the overshirt jacket is the most versatile layer you can own.",
    details: [
      "Heavyweight brushed cotton twill",
      "Regular fit",
      "Chest and hip pockets",
      "Single-button cuffs",
      "Shirt collar",
    ],
    specs: {
      Fabric: "100% Brushed Cotton",
      Fit: "Regular",
      Closure: "Button front",
      Care: "Machine wash 30°C",
      Origin: "Made in India",
    },
  },
  {
    id: "jk-005",
    name: "Leather Moto Jacket",
    category: "Jackets",
    categorySlug: "jackets",
    price: 9999,
    originalPrice: 13999,
    discount: pct(13999, 9999),
    rating: 4.9,
    reviewCount: 276,
    stock: 4,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Cognac", hex: "#8B5E3C" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "An icon in real leather. The ROXVORA moto jacket is constructed from genuine lamb leather with a slim profile, asymmetric zip, and hardware that develops a patina over time.",
    details: [
      "Genuine lamb leather",
      "Slim moto cut",
      "Asymmetric zip closure",
      "Quilted shoulder panels",
      "Multiple zip pockets",
    ],
    specs: {
      Fabric: "100% Lamb Leather (Shell), Polyester Lining",
      Fit: "Slim",
      Closure: "Asymmetric YKK zip",
      Care: "Leather clean only",
      Origin: "Made in India",
    },
  },
  {
    id: "jk-006",
    name: "Quilted Puffer Vest",
    category: "Jackets",
    categorySlug: "jackets",
    price: 2999,
    originalPrice: 4299,
    discount: pct(4299, 2999),
    rating: 4.3,
    reviewCount: 118,
    stock: 22,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Olive", hex: "#4A5240" },
      { name: "Cream", hex: "#EDE8DC" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Core warmth, unrestricted movement. The quilted puffer vest is the transitional layering essential — lightweight insulation with a clean channel-quilt silhouette.",
    details: [
      "Lightweight recycled polyester shell",
      "Channel quilt pattern",
      "Zip front",
      "Side zip pockets",
      "Sleeveless for mobility",
    ],
    specs: {
      Fabric: "100% Recycled Polyester",
      Fill: "Recycled polyester wadding",
      Fit: "Regular",
      Care: "Machine wash cold, tumble dry low",
      Origin: "Made in India",
    },
  },
];

/* =========================================================
   WOMEN'S
========================================================= */
const womens = [
  {
    id: "wm-001",
    name: "Oversized Linen Blazer",
    category: "Women's",
    categorySlug: "womens",
    price: 4499,
    originalPrice: 6499,
    discount: pct(6499, 4499),
    rating: 4.8,
    reviewCount: 287,
    stock: 9,
    colors: [
      { name: "Ecru", hex: "#EDE5D0" },
      { name: "Black", hex: "#111111" },
      { name: "Blush", hex: "#DEB8A2" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "The statement power blazer. Oversized linen cut in a clean silhouette — worn open over a slip dress or belted as a dress itself.",
    details: [
      "100% premium linen",
      "Oversized deconstructed fit",
      "Notched lapels",
      "Two patch pockets",
      "Single button",
    ],
    specs: {
      Fabric: "100% Linen",
      Fit: "Oversized",
      Care: "Dry clean or hand wash cold",
      Origin: "Made in India",
    },
  },
  {
    id: "wm-002",
    name: "Wrap Midi Dress",
    category: "Women's",
    categorySlug: "womens",
    price: 2999,
    originalPrice: 4299,
    discount: pct(4299, 2999),
    rating: 4.7,
    reviewCount: 342,
    stock: 12,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Cream", hex: "#F0EBDF" },
      { name: "Dusty Rose", hex: "#C8998A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Effortlessly feminine. The wrap midi dress flatters every silhouette with its adjustable tie waist and fluid midi length.",
    details: [
      "Lightweight viscose crepe",
      "V-neckline with wrap detail",
      "Adjustable tie waist",
      "Midi length",
      "Flared skirt",
    ],
    specs: {
      Fabric: "100% Viscose Crepe",
      Fit: "Wrap / Adjustable",
      Length: "Midi",
      Care: "Hand wash cold, line dry",
      Origin: "Made in India",
    },
  },
  {
    id: "wm-003",
    name: "High-Rise Wide Leg Jeans",
    category: "Women's",
    categorySlug: "womens",
    price: 2799,
    originalPrice: 3999,
    discount: pct(3999, 2799),
    rating: 4.6,
    reviewCount: 214,
    stock: 15,
    colors: [
      { name: "Indigo", hex: "#2F3E6A" },
      { name: "Ecru", hex: "#E8E0CC" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["24", "26", "28", "30", "32", "34"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Elevated denim. High-rise with a full wide leg — structured enough to feel polished, relaxed enough to wear all day.",
    details: [
      "Premium stretch denim",
      "High rise waistband",
      "Wide leg from hip",
      "Five-pocket construction",
      "Ankle grazing length",
    ],
    specs: {
      Fabric: "98% Cotton, 2% Elastane",
      Fit: "High Rise / Wide Leg",
      Care: "Machine wash cold inside out",
      Origin: "Made in India",
    },
  },
  {
    id: "wm-004",
    name: "Slip Cami Dress",
    category: "Women's",
    categorySlug: "womens",
    price: 2199,
    originalPrice: 3199,
    discount: pct(3199, 2199),
    rating: 4.5,
    reviewCount: 189,
    stock: 20,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Champagne", hex: "#E8D9B0" },
      { name: "Ivory", hex: "#F5F0E8" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Understated luxury. The slip cami dress in bias-cut satin is the evening essential — pair with a blazer or wear alone for maximum effect.",
    details: [
      "Satin-finish fabric",
      "Bias cut for fluid drape",
      "Adjustable spaghetti straps",
      "Mini to midi length options",
      "Back slit",
    ],
    specs: {
      Fabric: "100% Polyester Satin",
      Fit: "Slip / Relaxed",
      Length: "Mini",
      Care: "Hand wash cold, line dry",
      Origin: "Made in India",
    },
  },
  {
    id: "wm-005",
    name: "Cropped Trench Coat",
    category: "Women's",
    categorySlug: "womens",
    price: 5999,
    originalPrice: 8499,
    discount: pct(8499, 5999),
    rating: 4.9,
    reviewCount: 156,
    stock: 5,
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "The modern trench, cropped. This reimagined wardrobe icon cuts above the knee with all the classic trench details — epaulettes, belt, storm flap.",
    details: [
      "Gabardine cotton blend",
      "Double-breasted button front",
      "Belt and buckle",
      "Epaulettes",
      "Cropped length",
    ],
    specs: {
      Fabric: "65% Cotton, 35% Polyester",
      Fit: "Regular / Structured",
      Length: "Cropped",
      Care: "Dry clean recommended",
      Origin: "Made in India",
    },
  },
  {
    id: "wm-006",
    name: "Ribbed Knit Co-ord Set",
    category: "Women's",
    categorySlug: "womens",
    price: 3499,
    originalPrice: 4999,
    discount: pct(4999, 3499),
    rating: 4.6,
    reviewCount: 231,
    stock: 11,
    colors: [
      { name: "Cream", hex: "#F0EBDF" },
      { name: "Black", hex: "#111111" },
      { name: "Caramel", hex: "#C8956C" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "A matching moment. The ribbed knit co-ord set pairs a fitted crop top with a high-waisted midi skirt — wear together or mix separately.",
    details: [
      "Fine ribbed knit",
      "Crop top with scoop neck",
      "High-waisted midi skirt",
      "Sold as a set",
      "Stretch for comfort",
    ],
    specs: {
      Fabric: "95% Viscose, 5% Elastane",
      Fit: "Co-ord Set",
      Care: "Machine wash 30°C, lay flat to dry",
      Origin: "Made in India",
    },
  },
];

/* =========================================================
   ACCESSORIES
========================================================= */
const accessories = [
  {
    id: "ac-001",
    name: "Silver Chain Necklace",
    category: "Accessories",
    categorySlug: "accessories",
    price: 1299,
    originalPrice: 1899,
    discount: pct(1899, 1299),
    rating: 4.6,
    reviewCount: 198,
    stock: 35,
    colors: [
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Gold", hex: "#D4AF37" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Minimal hardware with maximum impact. The silver chain necklace is crafted from 925 sterling silver with a box chain that sits at the collar.",
    details: [
      "925 Sterling silver",
      "2mm box chain",
      "45cm length",
      "Lobster clasp",
      "Tarnish resistant",
    ],
    specs: {
      Material: "925 Sterling Silver",
      Length: "45cm",
      Chain: "Box chain 2mm",
      Closure: "Lobster clasp",
      Origin: "Made in India",
    },
  },
  {
    id: "ac-002",
    name: "Analog Watch",
    category: "Accessories",
    categorySlug: "accessories",
    price: 4999,
    originalPrice: 6999,
    discount: pct(6999, 4999),
    rating: 4.8,
    reviewCount: 412,
    stock: 10,
    colors: [
      { name: "Black/Silver", hex: "#111111" },
      { name: "Brown/Gold", hex: "#8C745A" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Precision on the wrist. The ROXVORA analog watch features a Japanese Miyota movement, sapphire-coated mineral glass, and a genuine leather strap.",
    details: [
      "Japanese Miyota quartz movement",
      "Sapphire-coated mineral glass",
      "Genuine leather strap",
      "40mm stainless steel case",
      "Water resistant 50m",
    ],
    specs: {
      Movement: "Japanese Miyota Quartz",
      Case: "40mm Stainless Steel",
      Strap: "Genuine Leather",
      "Water Resistance": "50m",
      Origin: "Made in India",
    },
  },
  {
    id: "ac-003",
    name: "Leather Belt",
    category: "Accessories",
    categorySlug: "accessories",
    price: 1499,
    originalPrice: 2199,
    discount: pct(2199, 1499),
    rating: 4.5,
    reviewCount: 267,
    stock: 28,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Tan", hex: "#8B6914" },
      { name: "Cognac", hex: "#7C4A2E" },
    ],
    sizes: ["32", "34", "36", "38", "40"],
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Full-grain leather, matte hardware. The ROXVORA leather belt is cut from a single piece of vegetable-tanned full-grain leather that develops a rich patina over time.",
    details: [
      "Full-grain vegetable tanned leather",
      "3.5cm width",
      "Single prong matte buckle",
      "Burnished edges",
      "5 hole adjustments",
    ],
    specs: {
      Material: "Full-Grain Leather",
      Width: "3.5cm",
      Buckle: "Matte brass / Matte silver",
      Care: "Wipe clean, condition regularly",
      Origin: "Made in India",
    },
  },
  {
    id: "ac-004",
    name: "Sunglasses",
    category: "Accessories",
    categorySlug: "accessories",
    price: 1499,
    originalPrice: 2299,
    discount: pct(2299, 1499),
    rating: 4.4,
    reviewCount: 189,
    stock: 22,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Tortoiseshell", hex: "#5A3A1A" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "UV400 protection in a clean frame. Slim acetate frames inspired by Italian eyewear traditions — lightweight, durable, and effortlessly cool.",
    details: [
      "UV400 polarised lenses",
      "Acetate frame",
      "Spring hinge temples",
      "Includes premium case and cloth",
      "Unisex design",
    ],
    specs: {
      Lens: "UV400 Polarised",
      Frame: "Acetate",
      "Lens Width": "52mm",
      "Bridge Width": "18mm",
      Origin: "Made in India",
    },
  },
  {
    id: "ac-005",
    name: "ROXVORA Canvas Tote",
    category: "Accessories",
    categorySlug: "accessories",
    price: 999,
    originalPrice: 1499,
    discount: pct(1499, 999),
    rating: 4.3,
    reviewCount: 142,
    stock: 40,
    colors: [
      { name: "Natural", hex: "#E0D8C8" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Utility with a brand story. The ROXVORA canvas tote is made from 12oz heavyweight canvas with a clean interior and a subtle logo emboss.",
    details: [
      "12oz heavyweight canvas",
      "Reinforced handles",
      "Interior zip pocket",
      "Embossed ROXVORA logo",
      "48cm x 38cm",
    ],
    specs: {
      Material: "12oz Cotton Canvas",
      Dimensions: "48cm x 38cm x 12cm",
      Handle: "Drop length 28cm",
      Closure: "Open top + interior zip",
      Origin: "Made in India",
    },
  },
  {
    id: "ac-006",
    name: "Noir Eau de Parfum",
    category: "Accessories",
    categorySlug: "accessories",
    price: 2999,
    originalPrice: 3999,
    discount: pct(3999, 2999),
    rating: 4.7,
    reviewCount: 324,
    stock: 16,
    colors: [
      { name: "50ml", hex: "#1A1A1A" },
      { name: "100ml", hex: "#2E2E2E" },
    ],
    sizes: ["50ml", "100ml"],
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
    ],
    description:
      "Darkness refined. NOIR is a deep, woody-amber fragrance with top notes of bergamot, a heart of oud and cedarwood, and a dry-down of musk and vanilla.",
    details: [
      "Top: Bergamot, Black pepper",
      "Heart: Oud, Cedarwood, Vetiver",
      "Base: Amber, Musk, Vanilla",
      "Concentration: EDP",
      "Longevity: 8-12 hours",
    ],
    specs: {
      Type: "Eau de Parfum",
      Concentration: "20%",
      Volume: "50ml / 100ml",
      Longevity: "8–12 hours",
      Origin: "Made in India",
    },
  },
];

/* =========================================================
   CATEGORY META
========================================================= */
export const CATEGORIES = [
  {
    slug: "t-shirts",
    label: "T-Shirts",
    eyebrow: "EVERYDAY ESSENTIALS",
    headline: "T-SHIRTS",
    description:
      "Heavyweight basics, graphic statements and refined essentials. The foundation of every great outfit.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "shirts",
    label: "Shirts",
    eyebrow: "REFINED SEPARATES",
    headline: "SHIRTS",
    description:
      "From relaxed linen resort shirts to sharp Oxford poplin — the ROXVORA shirt collection covers every occasion.",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "trousers",
    label: "Trousers",
    eyebrow: "TAILORED BOTTOMS",
    headline: "TROUSERS",
    description:
      "Slim chinos, wide-leg tailoring, cargo utility and formal dress trousers — built for every context.",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "jackets",
    label: "Jackets",
    eyebrow: "OUTERWEAR",
    headline: "JACKETS",
    description:
      "Premium outerwear from leather motos to structured blazers — each piece built to anchor your wardrobe.",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "womens",
    label: "Women's",
    eyebrow: "WOMENS COLLECTION",
    headline: "WOMEN'S",
    description:
      "Elevated dressing for the modern woman — blazers, dresses, denim and co-ords defined by clean lines.",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "accessories",
    label: "Accessories",
    eyebrow: "FINISHING TOUCHES",
    headline: "ACCESSORIES",
    description:
      "Watches, jewellery, belts, bags and fragrance — the details that complete the look.",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=85",
  },
];

/* =========================================================
   ALL PRODUCTS — flat list for search / related products
========================================================= */
export const ALL_PRODUCTS = [
  ...tshirts,
  ...shirts,
  ...trousers,
  ...jackets,
  ...womens,
  ...accessories,
];

/* =========================================================
   PRODUCTS BY CATEGORY SLUG
========================================================= */
export const PRODUCTS_BY_CATEGORY = {
  "t-shirts": tshirts,
  shirts: shirts,
  trousers: trousers,
  jackets: jackets,
  womens: womens,
  accessories: accessories,
};

/* =========================================================
   GET PRODUCT BY ID
========================================================= */
export function getProductById(id) {
  return ALL_PRODUCTS.find((p) => p.id === id) ?? null;
}

/* =========================================================
   GET RELATED PRODUCTS
   Returns up to `limit` products from the same category
   that aren't the current product.
========================================================= */
export function getRelatedProducts(product, limit = 4) {
  return ALL_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, limit);
}

/* =========================================================
   FORMAT PRICE
========================================================= */
export function formatPrice(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
