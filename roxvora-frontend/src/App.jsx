import React, {
  useMemo,
  useState
} from "react";

import {

  Alert,

  AppBar,

  Avatar,

  Box,

  Button,

  Chip,

  Dialog,

  DialogActions,

  DialogContent,

  DialogTitle,

  Divider,

  Drawer,

  IconButton,

  InputAdornment,

  List,

  ListItemButton,

  ListItemIcon,

  ListItemText,

  Menu,

  MenuItem,

  Paper,

  Select,

  Snackbar,

  Stack,

  Table,

  TableBody,

  TableCell,

  TableContainer,

  TableHead,

  TableRow,

  TextField,

  Toolbar,

  Typography,

  useMediaQuery

} from "@mui/material";


import {
  Add,
  Assessment,
  Category,
  ChevronLeft,
  Close,
  Dashboard,
  Delete,
  Edit,
  Inventory2,
  LocalOffer,
  Logout,
  Menu as MenuIcon,
  NotificationsNone,
  People,
  Search,
  Settings,
  ShoppingBag,
  Storefront,
  TrendingUp,
  Visibility,
  MoreVert,
  WarningAmber

} from "@mui/icons-material";


import { useTheme } from "@mui/material/styles";


import {
  categories as initialCategories,
  customers,
  orders as initialOrders,
  products as initialProducts

} from "./data";


const drawerWidth = 250;


const navItems = [

  ["Dashboard", Dashboard],

  ["Products", Inventory2],

  ["Categories", Category],

  ["Orders", ShoppingBag],

  ["Customers", People],

  ["Offers & Coupons", LocalOffer],

  ["Content & Banners", Storefront],

  ["Reports", Assessment],

  ["Settings", Settings]

];


/* --------------------------------
   STATUS CHIP
-------------------------------- */

function StatusChip({ status }) {

  const color =
    [
      "Published",
      "Delivered",
      "Paid",
      "Active",
      "Shipped"
    ].includes(status)

      ? "success"

      : [
          "Processing",
          "Pending",
          "Draft"
        ].includes(status)

      ? "warning"

      : "error";


  return (

    <Chip
      size="small"
      label={status}
      color={color}
      variant="outlined"
    />

  );

}


/* --------------------------------
   LAYOUT
-------------------------------- */

function Layout({
  page,
  setPage,
  children
}) {

  const theme = useTheme();

  const mobile =
    useMediaQuery(
      theme.breakpoints.down("md")
    );


  const [open, setOpen] =
    useState(!mobile);


  const [anchor, setAnchor] =
    useState(null);


  const drawer = (

    <Box
      sx={{
        height: "100%",
        bgcolor: "primary.main",
        color: "#fff",
        display: "flex",
        flexDirection: "column"
      }}
    >

      <Toolbar sx={{ px: 2.5 }}>

        <Box>

          <Typography
            sx={{
              fontWeight: 900,
              letterSpacing: 1.2,
              fontSize: 21
            }}
          >
            ROXVORA
          </Typography>

          <Typography
            sx={{
              opacity: 0.7,
              fontSize: 11
            }}
          >
            ADMIN PANEL
          </Typography>

        </Box>


        {mobile && (

          <IconButton
            sx={{
              ml: "auto",
              color: "#fff"
            }}
            onClick={() =>
              setOpen(false)
            }
          >

            <ChevronLeft />

          </IconButton>

        )}

      </Toolbar>


      <Divider
        sx={{
          borderColor:
            "rgba(255,255,255,.12)"
        }}
      />


      <List sx={{ px: 1.5, py: 2 }}>

        {navItems.map(
          ([label, Icon]) => (

            <ListItemButton

              key={label}

              selected={
                page === label
              }

              onClick={() => {

                setPage(label);

                if (mobile) {
                  setOpen(false);
                }

              }}

              sx={{

                mb: 0.6,

                borderRadius: 2,

                color:
                  "rgba(255,255,255,.75)",

                "&.Mui-selected": {

                  bgcolor:
                    "rgba(255,255,255,.14)",

                  color: "#fff"

                },

                "&:hover": {

                  bgcolor:
                    "rgba(255,255,255,.1)",

                  color: "#fff"

                }

              }}

            >

              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "inherit"
                }}
              >

                <Icon fontSize="small" />

              </ListItemIcon>


              <ListItemText

                primary={label}

                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 650
                }}

              />

            </ListItemButton>

          )
        )}

      </List>


      <Box
        sx={{
          mt: "auto",
          p: 2
        }}
      >

        <Paper
          sx={{
            p: 1.5,
            bgcolor:
              "rgba(255,255,255,.08)",
            color: "#fff",
            border: "none"
          }}
        >

          <Typography
            fontSize={12}
            fontWeight={700}
          >
            Store status
          </Typography>


          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mt={1}
          >

            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "#68d391",
                borderRadius: "50%"
              }}
            />

            <Typography
              fontSize={12}
              sx={{
                opacity: 0.75
              }}
            >
              Online & accepting orders
            </Typography>

          </Stack>

        </Paper>

      </Box>

    </Box>
  );


  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh"
      }}
    >

      {/* HEADER */}

      <AppBar

        position="fixed"

        color="inherit"

        elevation={0}

        sx={{

          width: {
            md:
              `calc(100% - ${drawerWidth}px)`
          },

          ml: {
            md:
              `${drawerWidth}px`
          },

          borderBottom:
            "1px solid #e7eceb"

        }}

      >

        <Toolbar sx={{ gap: 1.5 }}>

          {mobile && (

            <IconButton
              onClick={() =>
                setOpen(true)
              }
            >

              <MenuIcon />

            </IconButton>

          )}


          <Box sx={{ flexGrow: 1 }}>

            <Typography
              fontWeight={800}
              color="text.primary"
            >
              {page}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              ROXVORA Store Management
            </Typography>

          </Box>


          <IconButton>

            <NotificationsNone />

          </IconButton>


          <IconButton
            onClick={(e) =>
              setAnchor(e.currentTarget)
            }
          >

            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor:
                  "secondary.main",
                color:
                  "#172322",
                fontSize: 13
              }}
            >
              AD
            </Avatar>

          </IconButton>


          <Menu

            anchorEl={anchor}

            open={Boolean(anchor)}

            onClose={() =>
              setAnchor(null)
            }

          >

            <MenuItem
              onClick={() =>
                setAnchor(null)
              }
            >
              Admin Profile
            </MenuItem>


            <MenuItem
              onClick={() =>
                setAnchor(null)
              }
            >

              <Logout
                fontSize="small"
                sx={{ mr: 1 }}
              />

              Logout

            </MenuItem>

          </Menu>

        </Toolbar>

      </AppBar>


      {/* SIDEBAR */}

      <Drawer

        variant={
          mobile
            ? "temporary"
            : "permanent"
        }

        open={open}

        onClose={() =>
          setOpen(false)
        }

        sx={{

          "& .MuiDrawer-paper": {

            width:
              drawerWidth,

            boxSizing:
              "border-box",

            border: 0

          }

        }}

      >

        {drawer}

      </Drawer>


      {/* MAIN */}

      <Box

        component="main"

        sx={{

          flexGrow: 1,

          width: {
            md:
              `calc(100% - ${drawerWidth}px)`
          },

          p: {
            xs: 2,
            sm: 3,
            lg: 4
          },

          mt: 8

        }}

      >

        {children}

      </Box>

    </Box>

  );

}


/* --------------------------------
   STAT CARD
-------------------------------- */

function StatCard({
  title,
  value,
  note,
  icon: Icon,
  warning
}) {

  return (

    <Paper
      sx={{
        p: 2.2,
        height: "100%"
      }}
    >

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >

        <Box>

          <Typography
            color="text.secondary"
            fontSize={13}
            fontWeight={700}
          >
            {title}
          </Typography>


          <Typography
            variant="h5"
            mt={1}
          >
            {value}
          </Typography>


          <Typography
            fontSize={12}
            color={
              warning
                ? "warning.main"
                : "success.main"
            }
            mt={0.7}
          >
            {note}
          </Typography>

        </Box>


        <Box
          sx={{
            p: 1.2,
            borderRadius: 2,

            bgcolor:
              warning
                ? "#fff5df"
                : "#e9f3f1",

            color:
              warning
                ? "warning.main"
                : "primary.main"
          }}
        >

          <Icon />

        </Box>

      </Stack>

    </Paper>

  );

}


/* --------------------------------
   PAGE HEADER
-------------------------------- */

function PageHeader({
  title,
  subtitle,
  action
}) {

  return (

    <Stack

      direction={{
        xs: "column",
        sm: "row"
      }}

      justifyContent="space-between"

      alignItems={{
        sm: "center"
      }}

      spacing={2}

      mb={3}

    >

      <Box>

        <Typography
          variant="h4"
        >
          {title}
        </Typography>

        <Typography
          color="text.secondary"
        >
          {subtitle}
        </Typography>

      </Box>


      {action}

    </Stack>

  );

}


/* --------------------------------
   DASHBOARD
-------------------------------- */

function DashboardPage({
  setPage
}) {

  return (

    <>

      <Stack

        direction={{
          xs: "column",
          sm: "row"
        }}

        justifyContent="space-between"

        alignItems={{
          sm: "center"
        }}

        spacing={2}

        mb={3}

      >

        <Box>

          <Typography variant="h4">
            Good morning, Admin 👋
          </Typography>

          <Typography color="text.secondary">
            Here's what's happening with
            your store today.
          </Typography>

        </Box>


        <Button

          variant="contained"

          startIcon={<Add />}

          onClick={() =>
            setPage("Products")
          }

        >
          Add Product
        </Button>

      </Stack>


      <Box className="responsive-grid">

        <StatCard

          title="Total Sales"

          value="₹4,82,650"

          note="+12.8% from last month"

          icon={TrendingUp}

        />


        <StatCard

          title="Orders"

          value="1,284"

          note="+8.4% from last month"

          icon={ShoppingBag}

        />


        <StatCard

          title="Products"

          value="117"

          note="8 low stock items"

          icon={Inventory2}

        />


        <StatCard

          title="Customers"

          value="3,642"

          note="+14.2% from last month"

          icon={People}

        />

      </Box>


      <Box
        className="two-col"
        mt={3}
      >

        {/* SALES */}

        <Paper sx={{ p: 2.5 }}>

          <Typography fontWeight={800}>
            Sales Overview
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Last 7 days
          </Typography>


          <Box

            sx={{

              height: 260,

              display: "flex",

              alignItems: "end",

              gap: {
                xs: 1,
                sm: 2
              },

              pt: 4

            }}

          >

            {[
              48,
              70,
              54,
              82,
              64,
              92,
              76
            ].map((h, i) => (

              <Box

                key={i}

                sx={{

                  flex: 1,

                  display: "flex",

                  flexDirection:
                    "column",

                  justifyContent:
                    "end",

                  alignItems:
                    "center",

                  gap: 1

                }}

              >

                <Box

                  sx={{

                    width: "100%",

                    maxWidth: 48,

                    height:
                      `${h}%`,

                    bgcolor:
                      i === 6
                        ? "secondary.main"
                        : "primary.main",

                    borderRadius:
                      "8px 8px 3px 3px",

                    opacity:
                      i === 6
                        ? 1
                        : 0.82

                  }}

                />


                <Typography
                  variant="caption"
                  color="text.secondary"
                >

                  {
                    [
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                      "Sun"
                    ][i]
                  }

                </Typography>

              </Box>

            ))}

          </Box>

        </Paper>


        {/* RECENT ORDERS */}

        <Paper sx={{ p: 2.5 }}>

          <Typography fontWeight={800}>
            Recent Orders
          </Typography>


          <Stack
            spacing={1.6}
            mt={2}
          >

            {initialOrders
              .slice(0, 4)
              .map((o) => (

                <Stack

                  key={o.id}

                  direction="row"

                  alignItems="center"

                  spacing={1.2}

                >

                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor:
                        "#e8f1ef",
                      color:
                        "primary.main",
                      fontSize: 12
                    }}
                  >
                    {o.customer
                      .split(" ")
                      .map(
                        (x) => x[0]
                      )
                      .join("")}
                  </Avatar>


                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0
                    }}
                  >

                    <Typography
                      fontSize={13}
                      fontWeight={700}
                      noWrap
                    >
                      {o.customer}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {o.id}
                    </Typography>

                  </Box>


                  <Typography
                    fontSize={13}
                    fontWeight={800}
                  >
                    ₹
                    {o.amount.toLocaleString()}
                  </Typography>

                </Stack>

              ))}

          </Stack>

        </Paper>

      </Box>


      {/* LOW STOCK */}

      <Paper
        sx={{
          p: 2.5,
          mt: 3
        }}
      >

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Typography fontWeight={800}>
            Low Stock Products
          </Typography>

          <Button
            size="small"
            onClick={() =>
              setPage("Products")
            }
          >
            View all
          </Button>

        </Stack>


        <Box
          sx={{
            overflowX: "auto"
          }}
        >

          <Table
            size="small"
            sx={{ mt: 1 }}
          >

            <TableHead>

              <TableRow>

                <TableCell>
                  Product
                </TableCell>

                <TableCell>
                  Category
                </TableCell>

                <TableCell>
                  Stock
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

              </TableRow>

            </TableHead>


            <TableBody>

              {initialProducts
                .filter(
                  (p) => p.stock < 10
                )
                .map((p) => (

                  <TableRow key={p.id}>

                    <TableCell>
                      {p.name}
                    </TableCell>

                    <TableCell>
                      {p.category}
                    </TableCell>

                    <TableCell>

                      <Chip
                        size="small"
                        color="warning"
                        label={`${p.stock} left`}
                      />

                    </TableCell>

                    <TableCell>

                      <StatusChip
                        status={p.status}
                      />

                    </TableCell>

                  </TableRow>

                ))}

            </TableBody>

          </Table>

        </Box>

      </Paper>

    </>

  );

}


/* --------------------------------
   PRODUCTS
-------------------------------- */

function ProductsPage() {

  const [items, setItems] =
    useState(initialProducts);

  const [search, setSearch] =
    useState("");

  const [dialog, setDialog] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [snack, setSnack] =
    useState("");


  const filtered =
    useMemo(

      () =>

        items.filter(
          (p) =>

            `${p.name} ${p.category} ${p.id}`
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

        ),

      [items, search]

    );


  const save = (e) => {

    e.preventDefault();


    const data =
      new FormData(
        e.currentTarget
      );


    const item = {

      id:
        editing?.id ||
        `PR-${1000 + items.length + 1}`,

      name:
        data.get("name"),

      category:
        data.get("category"),

      price:
        Number(data.get("price")),

      stock:
        Number(data.get("stock")),

      status:
        data.get("status")

    };


    setItems((prev) =>

      editing

        ? prev.map((p) =>
            p.id === editing.id
              ? item
              : p
          )

        : [
            item,
            ...prev
          ]

    );


    setDialog(false);

    setSnack(
      editing
        ? "Product updated"
        : "Product created"
    );

    setEditing(null);

  };


  return (

    <>

      <PageHeader

        title="Products"

        subtitle=
          "Manage your product catalogue."

        action={

          <Button

            variant="contained"

            startIcon={<Add />}

            onClick={() => {

              setEditing(null);

              setDialog(true);

            }}

          >
            Add Product
          </Button>

        }

      />


      <Paper sx={{ p: 2 }}>

        <TextField

          fullWidth

          size="small"

          placeholder=
            "Search products..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          InputProps={{

            startAdornment:

              <InputAdornment
                position="start"
              >

                <Search fontSize="small" />

              </InputAdornment>

          }}

          sx={{
            maxWidth: 420,
            mb: 2
          }}

        />


        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  ID
                </TableCell>

                <TableCell>
                  Product
                </TableCell>

                <TableCell>
                  Category
                </TableCell>

                <TableCell>
                  Price
                </TableCell>

                <TableCell>
                  Stock
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

                <TableCell align="right">
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>


            <TableBody>

              {filtered.map((p) => (

                <TableRow
                  key={p.id}
                  hover
                >

                  <TableCell>
                    {p.id}
                  </TableCell>


                  <TableCell>

                    <Typography
                      fontWeight={700}
                      fontSize={14}
                    >
                      {p.name}
                    </Typography>

                  </TableCell>


                  <TableCell>
                    {p.category}
                  </TableCell>


                  <TableCell>
                    ₹
                    {p.price.toLocaleString()}
                  </TableCell>


                  <TableCell>

                    {p.stock < 10 ? (

                      <Chip
                        size="small"
                        color="warning"
                        icon={
                          <WarningAmber />
                        }
                        label={p.stock}
                      />

                    ) : (

                      p.stock

                    )}

                  </TableCell>


                  <TableCell>

                    <StatusChip
                      status={p.status}
                    />

                  </TableCell>


                  <TableCell align="right">

                    <IconButton

                      onClick={() => {

                        setEditing(p);

                        setDialog(true);

                      }}

                    >

                      <Edit fontSize="small" />

                    </IconButton>


                    <IconButton

                      color="error"

                      onClick={() => {

                        setItems(
                          items.filter(
                            (x) =>
                              x.id !== p.id
                          )
                        );

                        setSnack(
                          "Product deleted"
                        );

                      }}

                    >

                      <Delete fontSize="small" />

                    </IconButton>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>


      {/* ADD / EDIT PRODUCT */}

      <Dialog

        open={dialog}

        onClose={() =>
          setDialog(false)
        }

        fullWidth

        maxWidth="sm"

      >

        <form onSubmit={save}>

          <DialogTitle>

            {editing
              ? "Edit Product"
              : "Add Product"}


            <IconButton

              sx={{
                float: "right"
              }}

              onClick={() =>
                setDialog(false)
              }

            >

              <Close />

            </IconButton>

          </DialogTitle>


          <DialogContent dividers>

            <Stack
              spacing={2}
              pt={1}
            >

              <TextField
                name="name"
                label="Product Name"
                defaultValue={
                  editing?.name || ""
                }
                required
              />


              <TextField
                name="category"
                label="Category"
                defaultValue={
                  editing?.category ||
                  "Men"
                }
                required
              />


              <Stack

                direction={{
                  xs: "column",
                  sm: "row"
                }}

                spacing={2}

              >

                <TextField
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  defaultValue={
                    editing?.price ||
                    ""
                  }
                  required
                />


                <TextField
                  name="stock"
                  label="Stock"
                  type="number"
                  fullWidth
                  defaultValue={
                    editing?.stock ||
                    ""
                  }
                  required
                />

              </Stack>


              <Select
                name="status"
                defaultValue={
                  editing?.status ||
                  "Published"
                }
              >

                <MenuItem value="Published">
                  Published
                </MenuItem>

                <MenuItem value="Draft">
                  Draft
                </MenuItem>

              </Select>

            </Stack>

          </DialogContent>


          <DialogActions>

            <Button
              onClick={() =>
                setDialog(false)
              }
            >
              Cancel
            </Button>


            <Button
              type="submit"
              variant="contained"
            >
              Save Product
            </Button>

          </DialogActions>

        </form>

      </Dialog>


      <Snackbar

        open={Boolean(snack)}

        autoHideDuration={2500}

        onClose={() =>
          setSnack("")
        }

      >

        <Alert
          severity="success"
          onClose={() =>
            setSnack("")
          }
        >
          {snack}
        </Alert>

      </Snackbar>

    </>

  );

}


/* --------------------------------
   ORDERS
-------------------------------- */

function OrdersPage() {

  const [items, setItems] =
    useState(initialOrders);


  const update = (
    id,
    status
  ) => {

    setItems(

      items.map((o) =>

        o.id === id

          ? {
              ...o,
              status
            }

          : o

      )

    );

  };


  return (

    <>

      <PageHeader

        title="Orders"

        subtitle=
          "Track and manage customer orders."

      />


      <Paper sx={{ p: 2 }}>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  Order
                </TableCell>

                <TableCell>
                  Customer
                </TableCell>

                <TableCell>
                  Date
                </TableCell>

                <TableCell>
                  Amount
                </TableCell>

                <TableCell>
                  Payment
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

                <TableCell />

              </TableRow>

            </TableHead>


            <TableBody>

              {items.map((o) => (

                <TableRow
                  key={o.id}
                  hover
                >

                  <TableCell>

                    <Typography fontWeight={800}>
                      {o.id}
                    </Typography>

                  </TableCell>


                  <TableCell>
                    {o.customer}
                  </TableCell>


                  <TableCell>
                    {o.date}
                  </TableCell>


                  <TableCell>
                    ₹
                    {o.amount.toLocaleString()}
                  </TableCell>


                  <TableCell>

                    <StatusChip
                      status={o.payment}
                    />

                  </TableCell>


                  <TableCell>

                    <Select

                      size="small"

                      value={o.status}

                      onChange={(e) =>
                        update(
                          o.id,
                          e.target.value
                        )
                      }

                    >

                      <MenuItem value="Pending">
                        Pending
                      </MenuItem>

                      <MenuItem value="Processing">
                        Processing
                      </MenuItem>

                      <MenuItem value="Shipped">
                        Shipped
                      </MenuItem>

                      <MenuItem value="Delivered">
                        Delivered
                      </MenuItem>

                      <MenuItem value="Cancelled">
                        Cancelled
                      </MenuItem>

                    </Select>

                  </TableCell>


                  <TableCell>

                    <IconButton>

                      <Visibility
                        fontSize="small"
                      />

                    </IconButton>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </>

  );

}


/* --------------------------------
   CUSTOMERS
-------------------------------- */

function CustomersPage() {

  return (

    <>

      <PageHeader

        title="Customers"

        subtitle=
          "View and manage your customer base."

      />


      <Paper sx={{ p: 2 }}>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  Customer
                </TableCell>

                <TableCell>
                  Email
                </TableCell>

                <TableCell>
                  Orders
                </TableCell>

                <TableCell>
                  Total Spent
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

              </TableRow>

            </TableHead>


            <TableBody>

              {customers.map((c) => (

                <TableRow key={c.id}>

                  <TableCell>

                    <Stack
                      direction="row"
                      spacing={1.2}
                      alignItems="center"
                    >

                      <Avatar
                        sx={{
                          width: 34,
                          height: 34
                        }}
                      >
                        {c.name[0]}
                      </Avatar>


                      <Box>

                        <Typography
                          fontWeight={700}
                        >
                          {c.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {c.id}
                        </Typography>

                      </Box>

                    </Stack>

                  </TableCell>


                  <TableCell>
                    {c.email}
                  </TableCell>


                  <TableCell>
                    {c.orders}
                  </TableCell>


                  <TableCell>
                    ₹
                    {c.spent.toLocaleString()}
                  </TableCell>


                  <TableCell>

                    <StatusChip
                      status={c.status}
                    />

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </>

  );

}


/* --------------------------------
   CATEGORIES
-------------------------------- */

function CategoriesPage() {

  const [items, setItems] =
    useState(initialCategories);

  const [open, setOpen] =
    useState(false);

  const [name, setName] =
    useState("");


  const add = () => {

    if (name.trim()) {

      setItems([

        ...items,

        {
          name:
            name.trim(),

          products:
            0,

          status:
            "Active"
        }

      ]);

      setName("");

      setOpen(false);

    }

  };


  return (

    <>

      <PageHeader

        title="Categories"

        subtitle=
          "Organize products into customer-friendly categories."

        action={

          <Button

            variant="contained"

            startIcon={<Add />}

            onClick={() =>
              setOpen(true)
            }

          >
            Add Category
          </Button>

        }

      />


      <Box className="responsive-grid">

        {items.map((c) => (

          <Paper
            key={c.name}
            sx={{ p: 2.5 }}
          >

            <Stack
              direction="row"
              justifyContent="space-between"
            >

              <Box
                sx={{
                  p: 1.2,
                  bgcolor:
                    "#e9f3f1",
                  borderRadius: 2,
                  color:
                    "primary.main"
                }}
              >

                <Category />

              </Box>


              <IconButton>
                <MoreVert />
              </IconButton>

            </Stack>


            <Typography
              fontWeight={800}
              mt={2}
            >
              {c.name}
            </Typography>


            <Typography
              color="text.secondary"
              fontSize={13}
            >
              {c.products} products
            </Typography>


            <Box mt={1}>

              <StatusChip
                status={c.status}
              />

            </Box>

          </Paper>

        ))}

      </Box>


      <Dialog

        open={open}

        onClose={() =>
          setOpen(false)
        }

      >

        <DialogTitle>
          Add Category
        </DialogTitle>


        <DialogContent>

          <TextField

            autoFocus

            fullWidth

            label="Category name"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            sx={{ mt: 1 }}

          />

        </DialogContent>


        <DialogActions>

          <Button
            onClick={() =>
              setOpen(false)
            }
          >
            Cancel
          </Button>


          <Button
            variant="contained"
            onClick={add}
          >
            Add
          </Button>

        </DialogActions>

      </Dialog>

    </>

  );

}


/* --------------------------------
   OFFERS
-------------------------------- */

function OffersPage() {

  const offers = [

    [
      "WELCOME10",
      "10% Off",
      "New customers",
      "Active"
    ],

    [
      "FESTIVE25",
      "25% Off",
      "All products",
      "Active"
    ],

    [
      "FLAT500",
      "₹500 Off",
      "Orders above ₹2,999",
      "Expired"
    ]

  ];


  return (

    <>

      <PageHeader

        title="Offers & Coupons"

        subtitle=
          "Create promotions and manage discount codes."

        action={

          <Button
            variant="contained"
            startIcon={<Add />}
          >
            Create Offer
          </Button>

        }

      />


      <Box className="responsive-grid">

        {offers.map((x) => (

          <Paper
            key={x[0]}
            sx={{ p: 2.5 }}
          >

            <Stack
              direction="row"
              justifyContent="space-between"
            >

              <LocalOffer color="primary" />

              <StatusChip
                status={x[3]}
              />

            </Stack>


            <Typography
              variant="h6"
              mt={2}
            >
              {x[0]}
            </Typography>


            <Typography fontWeight={700}>
              {x[1]}
            </Typography>


            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              {x[2]}
            </Typography>

          </Paper>

        ))}

      </Box>

    </>

  );

}


/* --------------------------------
   CONTENT / BANNERS
-------------------------------- */

function ContentPage() {

  return (

    <>

      <PageHeader

        title="Content & Banners"

        subtitle=
          "Manage homepage banners and promotional content."

        action={

          <Button

            variant="contained"

            startIcon={<Add />}

          >
            Add Banner
          </Button>

        }

      />


      <Box className="two-col">

        {
          [
            "Summer Collection",
            "Festive Sale",
            "New Arrivals"
          ].map((x, i) => (

            <Paper
              key={x}
              sx={{
                p: 2.5,
                overflow: "hidden"
              }}
            >

              <Box
                className={`banner banner-${i}`}
              >

                <Typography variant="h5">
                  {x}
                </Typography>

                <Typography>
                  Shop the latest collection
                </Typography>

              </Box>


              <Stack

                direction="row"

                justifyContent="space-between"

                mt={2}

                alignItems="center"

              >

                <Box>

                  <Typography
                    fontWeight={800}
                  >
                    {x}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Homepage banner
                  </Typography>

                </Box>


                <IconButton>

                  <Edit />

                </IconButton>

              </Stack>

            </Paper>

          ))
        }

      </Box>

    </>

  );

}


/* --------------------------------
   REPORTS
-------------------------------- */

function ReportsPage() {

  return (

    <>

      <PageHeader

        title="Reports"

        subtitle=
          "Monitor sales, orders and product performance."

      />


      <Box className="responsive-grid">

        <StatCard
          title="Gross Revenue"
          value="₹12.84L"
          note="+18.4%"
          icon={TrendingUp}
        />


        <StatCard
          title="Average Order Value"
          value="₹2,486"
          note="+6.2%"
          icon={Assessment}
        />


        <StatCard
          title="Conversion Rate"
          value="4.82%"
          note="+0.8%"
          icon={TrendingUp}
        />

      </Box>


      <Paper
        sx={{
          p: 3,
          mt: 3
        }}
      >

        <Typography fontWeight={800}>
          Monthly Performance
        </Typography>


        <Box

          sx={{

            height: 280,

            display: "flex",

            alignItems: "end",

            gap: 2,

            pt: 3

          }}

        >

          {
            [
              35,
              50,
              42,
              65,
              58,
              76,
              68,
              88,
              80,
              95,
              86,
              100
            ].map((h, i) => (

              <Box

                key={i}

                sx={{

                  flex: 1,

                  height:
                    `${h}%`,

                  bgcolor:
                    "primary.main",

                  opacity: 0.75,

                  borderRadius:
                    "6px 6px 0 0"

                }}

              />

            ))
          }

        </Box>

      </Paper>

    </>

  );

}


/* --------------------------------
   SETTINGS
-------------------------------- */

function SettingsPage() {

  return (

    <>

      <PageHeader

        title="Settings"

        subtitle=
          "Configure your store and admin preferences."

      />


      <Box className="two-col">


        <Paper sx={{ p: 3 }}>

          <Typography variant="h6">
            Store Information
          </Typography>


          <Stack
            spacing={2}
            mt={2}
          >

            <TextField
              label="Store Name"
              defaultValue=
                "ROXVORA Fashion"
            />


            <TextField
              label="Support Email"
              defaultValue=
                "support@roxvora.com"
            />


            <TextField
              label="Phone"
              defaultValue=
                "+91 98765 43210"
            />


            <Button

              variant="contained"

              sx={{
                alignSelf:
                  "flex-start"
              }}

            >
              Save Changes
            </Button>

          </Stack>

        </Paper>


        <Paper sx={{ p: 3 }}>

          <Typography variant="h6">
            Admin Preferences
          </Typography>


          <Stack
            spacing={2}
            mt={2}
          >

            <TextField
              label="Currency"
              defaultValue=
                "INR (₹)"
            />


            <TextField
              label="Timezone"
              defaultValue=
                "Asia/Kolkata"
            />


            <Button

              variant="outlined"

              sx={{
                alignSelf:
                  "flex-start"
              }}

            >
              Update Preferences
            </Button>

          </Stack>

        </Paper>

      </Box>

    </>

  );

}


/* --------------------------------
   APP
-------------------------------- */

function App() {

  const [page, setPage] =
    useState("Dashboard");


  let content;


  if (page === "Dashboard") {

    content = (
      <DashboardPage
        setPage={setPage}
      />
    );

  }

  else if (page === "Products") {

    content = <ProductsPage />;

  }

  else if (page === "Categories") {

    content = <CategoriesPage />;

  }

  else if (page === "Orders") {

    content = <OrdersPage />;

  }

  else if (page === "Customers") {

    content = <CustomersPage />;

  }

  else if (page === "Offers & Coupons") {

    content = <OffersPage />;

  }

  else if (page === "Content & Banners") {

    content = <ContentPage />;

  }

  else if (page === "Reports") {

    content = <ReportsPage />;

  }

  else {

    content = <SettingsPage />;

  }


  return (

    <Layout

      page={page}

      setPage={setPage}

    >

      {content}

    </Layout>

  );

}


export default App;