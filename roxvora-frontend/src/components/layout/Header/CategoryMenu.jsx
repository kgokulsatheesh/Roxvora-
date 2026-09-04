import React, { useState } from "react";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";

import {
  Close,
  ExpandLess,
  ExpandMore,
  FavoriteBorder,
  PersonOutline,
  ContactSupportOutlined,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const CategoryMenu = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();

  const [shopOpen, setShopOpen] =
    useState(false);

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            xs: "82%",
            sm: 360,
          },
        },
      }}
    >

      {/* HEADER */}

      <Box
        sx={{
          height: 70,
          px: 2.5,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          borderBottom:
            "1px solid #eeeeee",
        }}
      >
        <Typography
          sx={{
            fontSize: "23px",
            fontWeight: 800,
            letterSpacing: "1.5px",
            color: "#173b36",
          }}
        >
          ROXVORA
        </Typography>

        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {/* MENU */}

      <List sx={{ px: 1.5, py: 2 }}>

        {/* HOME */}

        <ListItemButton
          onClick={() => goTo("/")}
        >
          <ListItemText
            primary="Home"
          />
        </ListItemButton>

        {/* SHOP */}

        <ListItemButton
          onClick={() =>
            setShopOpen(!shopOpen)
          }
        >
          <ListItemText
            primary="Shop"
          />

          {shopOpen ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItemButton>

        {/* SHOP CHILDREN */}

        <Collapse
          in={shopOpen}
          timeout="auto"
          unmountOnExit
        >
          <List
            component="div"
            disablePadding
          >

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() =>
                goTo("/shop")
              }
            >
              <ListItemText
                primary="All Products"
              />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() =>
                goTo("/shop/men")
              }
            >
              <ListItemText
                primary="Men"
              />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() =>
                goTo("/shop/women")
              }
            >
              <ListItemText
                primary="Women"
              />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() =>
                goTo("/shop/kids")
              }
            >
              <ListItemText
                primary="Kids"
              />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() =>
                goTo("/shop/accessories")
              }
            >
              <ListItemText
                primary="Accessories"
              />
            </ListItemButton>

          </List>
        </Collapse>

        {/* NEW ARRIVALS */}

        <ListItemButton
          onClick={() =>
            goTo("/new-arrivals")
          }
        >
          <ListItemText
            primary="New Arrivals"
          />
        </ListItemButton>

        {/* BEST SELLERS */}

        <ListItemButton
          onClick={() =>
            goTo("/best-sellers")
          }
        >
          <ListItemText
            primary="Best Sellers"
          />
        </ListItemButton>

        {/* COLLECTIONS */}

        <ListItemButton
          onClick={() =>
            goTo("/collections")
          }
        >
          <ListItemText
            primary="Collections"
          />
        </ListItemButton>

        {/* OFFERS */}

        <ListItemButton
          onClick={() =>
            goTo("/offers")
          }
        >
          <ListItemText
            primary="Offers"
          />
        </ListItemButton>

        <Divider sx={{ my: 2 }} />

        {/* WISHLIST */}

        <ListItemButton
          onClick={() =>
            goTo("/wishlist")
          }
        >
          <FavoriteBorder
            sx={{
              mr: 2,
              color: "#173b36",
            }}
          />

          <ListItemText
            primary="Wishlist"
          />
        </ListItemButton>

        {/* ACCOUNT */}

        <ListItemButton
          onClick={() =>
            goTo("/account")
          }
        >
          <PersonOutline
            sx={{
              mr: 2,
              color: "#173b36",
            }}
          />

          <ListItemText
            primary="My Account"
          />
        </ListItemButton>

        {/* CONTACT */}

        <ListItemButton
          onClick={() =>
            goTo("/contact")
          }
        >
          <ContactSupportOutlined
            sx={{
              mr: 2,
              color: "#173b36",
            }}
          />

          <ListItemText
            primary="Contact & Support"
          />
        </ListItemButton>

      </List>
    </Drawer>
  );
};

export default CategoryMenu;