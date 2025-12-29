import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "../../../Context/AuthContext";

import MainLogo from "../../../assets/images/logo.svg";
import CloseIcon from "@mui/icons-material/Close";

const pages = [
  { name: "About", link: "/#About" },
  { name: "Contributors", link: "/#Contributors" },
  { name: "Features", link: "/#Features" },
  { name: "Demo", link: "/Demo" },
  { name: "FAQs", link: "/FAQs" },
  { name: "Resources", link: "https://learn.aurbitrage.com/resources" },
];
const BtnStyle = {
  padding: "6px 25px",
  borderRadius: "30px",
  backgroundColor: "#DBA42D",
  color: "#000",
  fontWeight: "700",
  textTransform: "capitalize",
  fontSize: "12px",
};

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuIconClicked, setMenuIconClicked] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { logout } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setIsMenuOpen(true);
    setMenuIconClicked(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setIsMenuOpen(false);
    setMenuIconClicked(false);
  };

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#000", py: 1 }}>
        <Container className="color-set" maxWidth="xl">
          <Toolbar
            sx={{
              py: 1,
              px: { sm: "0", md: "20px", lg: "70px", xl: "111px" },
              flexDirection: { md: "row", xs: "row-reverse" },
            }}
            disableGutters
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src={MainLogo}
                style={{ width: "140px" }}
                alt="aurbitrage-logo"
              />
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", lg: "none" },
                justifyContent: { md: "start", xs: "end" },
              }}
            >
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={isMenuOpen ? handleCloseNavMenu : handleOpenNavMenu}
                color="inherit"
              >
                {menuIconClicked ? (
                  <CloseIcon style={{ color: "#dba42d" }} />
                ) : (
                  <MenuIcon style={{ color: "#dba42d" }} />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                // open={Boolean(anchorElNav)}
                // onClose={handleCloseNavMenu}
                open={isMenuOpen}
                onClose={handleCloseNavMenu}
                sx={{
                  ".MuiList-root": {
                    backgroundColor: "#dba42d",
                    width: "150px",
                    borderRadius: "13px",
                    padding: "10px 0",
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name}>
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "#000",
                        fontWeight: "700",
                      }}
                      textAlign="center"
                      to={`#${page.link}`}
                      onClick={handleCloseNavMenu}
                    >
                      {page.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              className="order-class"
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src={MainLogo}
                style={{ width: "130px" }}
                alt="aurbitrage-logo"
              />
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                ml: { xl: 15, lg: 1, md: 1, xs: 4 },
                alignItems: "center",
              }}
            >
              {pages.map((page) => (
                <Button
                  className="resp-menu-font"
                  key={page.name}
                  sx={{
                    my: { lg: 2, md: 1 },
                    mx: 1,
                    fontWeight: "700",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    color: "white",
                    display: "block",
                  }}
                >
                  <HashLink
                    to={page.link}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page.name}
                  </HashLink>
                </Button>
              ))}
            </Box>

            {token ? (
              <>
                {/* {screenWidth >= 740 ? ( */}
                <Box sx={{ flexGrow: 0, mr: 2 }}>
                  <Button
                    className="resp-class"
                    onClick={() => navigate("/dashboard/pricing")}
                    style={{ ...BtnStyle, padding: "10px 50px" }}
                  >
                    Go To Dashboard
                  </Button>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Button
                    className="resp-class"
                    onClick={() => logout()}
                    style={{ ...BtnStyle, padding: "10px 50px" }}
                  >
                    Logout
                  </Button>
                </Box>
                {/* ) */}
                {/* :
                null */}
                {/* } */}
              </>
            ) : (
              <>
                {/* {screenWidth >= 740 ? ( */}
                <Box sx={{ flexGrow: 0 }}>
                  <Button
                    className="resp-class"
                    style={{
                      ...BtnStyle,
                      background: "#fff",
                      color: "#000",
                      marginRight: "20px",
                    }}
                  >
                    <Link
                      to="/register"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Apply for Membership
                    </Link>
                  </Button>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Button className="resp-class" style={BtnStyle}>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Login to Dashboard
                    </Link>
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
