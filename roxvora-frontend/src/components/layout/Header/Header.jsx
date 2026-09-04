import React from "react";
import { Box } from "@mui/material";

import TopBar from "./TopBar";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Header = () => {
  return (
    <Box component="header">
      {/* Top announcement bar */}
      <TopBar />

      {/* Desktop / Laptop */}
      <DesktopNavbar />

      {/* Mobile / Tablet */}
      <MobileNavbar />
    </Box>
  );
};

export default Header;