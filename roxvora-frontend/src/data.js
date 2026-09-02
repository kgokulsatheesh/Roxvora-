export const products = [

  {
    id: "PR-1001",
    name: "Classic Linen Shirt",
    category: "Men",
    price: 1499,
    stock: 42,
    status: "Published"
  },

  {
    id: "PR-1002",
    name: "Premium Cotton Kurti",
    category: "Women",
    price: 1899,
    stock: 18,
    status: "Published"
  },

  {
    id: "PR-1003",
    name: "Oversized Graphic Tee",
    category: "Men",
    price: 999,
    stock: 7,
    status: "Published"
  },

  {
    id: "PR-1004",
    name: "Floral Summer Dress",
    category: "Women",
    price: 2299,
    stock: 4,
    status: "Draft"
  },

  {
    id: "PR-1005",
    name: "Kids Denim Jacket",
    category: "Kids",
    price: 1599,
    stock: 26,
    status: "Published"
  },

  {
    id: "PR-1006",
    name: "Slim Fit Trousers",
    category: "Men",
    price: 1799,
    stock: 12,
    status: "Published"
  }

];


export const orders = [

  {
    id: "#RV10245",
    customer: "Arun Kumar",
    date: "02 Sep 2026",
    amount: 3298,
    payment: "Paid",
    status: "Processing"
  },

  {
    id: "#RV10244",
    customer: "Priya S",
    date: "02 Sep 2026",
    amount: 1899,
    payment: "Paid",
    status: "Shipped"
  },

  {
    id: "#RV10243",
    customer: "Karthik R",
    date: "01 Sep 2026",
    amount: 4598,
    payment: "Paid",
    status: "Delivered"
  },

  {
    id: "#RV10242",
    customer: "Meena V",
    date: "01 Sep 2026",
    amount: 999,
    payment: "Pending",
    status: "Pending"
  },

  {
    id: "#RV10241",
    customer: "Rahul M",
    date: "31 Aug 2026",
    amount: 2299,
    payment: "Paid",
    status: "Cancelled"
  }

];


export const customers = [

  {
    id: "CU-001",
    name: "Arun Kumar",
    email: "arun@example.com",
    orders: 8,
    spent: 12990,
    status: "Active"
  },

  {
    id: "CU-002",
    name: "Priya S",
    email: "priya@example.com",
    orders: 5,
    spent: 8740,
    status: "Active"
  },

  {
    id: "CU-003",
    name: "Karthik R",
    email: "karthik@example.com",
    orders: 12,
    spent: 22450,
    status: "Active"
  },

  {
    id: "CU-004",
    name: "Meena V",
    email: "meena@example.com",
    orders: 2,
    spent: 2198,
    status: "Inactive"
  }

];


export const categories = [

  {
    name: "Men",
    products: 34,
    status: "Active"
  },

  {
    name: "Women",
    products: 46,
    status: "Active"
  },

  {
    name: "Kids",
    products: 21,
    status: "Active"
  },

  {
    name: "Accessories",
    products: 16,
    status: "Active"
  }

];