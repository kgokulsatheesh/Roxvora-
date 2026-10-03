// Demo order data shared by the account order list and detail pages.
// Replace with the orders API once the backend is available.

export const ACCOUNT_ORDERS = [
  {
    id: 'ord_1001',
    orderNumber: 'RV-1001',
    createdAt: '2026-09-18',
    status: 'shipped',
    itemCount: 2,
    subtotal: 4278,
    shipping: 0,
    total: 4278,
    shippingMethod: 'Express Shipping',
    paymentMethod: 'Visa **** 4242',
    items: [
      {
        id: 'p1',
        name: 'Floral Midi Dress',
        slug: 'floral-midi-dress',
        quantity: 1,
        price: 2479,
        image: '/images/products/dress-1.jpg',
      },
      {
        id: 'p5',
        name: 'Leather Tote Bag',
        slug: 'leather-tote-bag',
        quantity: 1,
        price: 1799,
        image: '/images/products/bag-1.jpg',
      },
    ],
    timeline: [
      { status: 'pending', date: '2026-09-18T10:12:00Z', description: 'We received your order.' },
      { status: 'confirmed', date: '2026-09-18T10:20:00Z' },
      { status: 'processing', date: '2026-09-19T09:05:00Z' },
      {
        status: 'shipped',
        date: '2026-09-20T16:40:00Z',
        description: 'Tracking ID: RXVRA88213',
      },
    ],
  },
  {
    id: 'ord_1002',
    orderNumber: 'RV-1002',
    createdAt: '2026-09-25',
    status: 'processing',
    itemCount: 1,
    subtotal: 1899,
    shipping: 99,
    total: 1998,
    shippingMethod: 'Standard Shipping',
    paymentMethod: 'UPI',
    items: [
      {
        id: 'p3',
        name: 'Classic Denim Jacket',
        slug: 'denim-jacket',
        quantity: 1,
        price: 1899,
        image: '/images/products/jacket-1.jpg',
      },
    ],
    timeline: [
      { status: 'pending', date: '2026-09-25T08:30:00Z', description: 'We received your order.' },
      { status: 'confirmed', date: '2026-09-25T08:35:00Z' },
      { status: 'processing', date: '2026-09-25T11:00:00Z' },
    ],
  },
  {
    id: 'ord_1003',
    orderNumber: 'RV-1003',
    createdAt: '2026-08-30',
    status: 'delivered',
    itemCount: 3,
    subtotal: 6247,
    shipping: 0,
    total: 6247,
    shippingMethod: 'Standard Shipping',
    paymentMethod: 'Visa **** 4242',
    items: [
      {
        id: 'p2',
        name: 'Classic White Sneakers',
        slug: 'classic-white-sneakers',
        quantity: 1,
        price: 1299,
        image: '/images/products/shoes-1.jpg',
      },
      {
        id: 'p4',
        name: 'Silk Blouse',
        slug: 'silk-blouse',
        quantity: 2,
        price: 2474,
        image: '/images/products/blouse-1.jpg',
      },
    ],
    timeline: [
      { status: 'pending', date: '2026-08-30T12:00:00Z' },
      { status: 'confirmed', date: '2026-08-30T12:05:00Z' },
      { status: 'processing', date: '2026-08-31T09:00:00Z' },
      { status: 'shipped', date: '2026-09-01T14:20:00Z' },
      {
        status: 'delivered',
        date: '2026-09-05T10:15:00Z',
        description: 'Left with the front desk.',
      },
    ],
  },
];

export const getOrderById = (id) => ACCOUNT_ORDERS.find((order) => order.id === id);
