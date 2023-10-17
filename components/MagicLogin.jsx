import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import { useCallback, useState } from "react";

const MagicLogin = ({
  openLoginModal,
  isAuthenticated,
  isLoading,
  handleLogout,
  router,
  size = 36,
}) => {
  const theme = useTheme();
  const { palette } = theme;
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleOpenMenu = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  /* const handleProfileNavigation = useCallback(
    (e) => {
      e.preventDefault();
      handleCloseMenu();
      router.push("/profile");
    },
    [handleCloseMenu, router]
  ); */

  /*   const handleArbiterNavigation = useCallback(
    (e) => {
      e.preventDefault();
      handleCloseMenu();
      router.push("/upcoming-disputes");
    },
    [handleCloseMenu, router]
  ); */

  const handleDisconnect = useCallback(
    (e) => {
      e.preventDefault();
      handleCloseMenu();
      handleLogout();
    },
    [handleCloseMenu, handleLogout]
  );
  return (
    <>
      {!isAuthenticated && !isLoading && (
        <Button variant="contained" sx={{ ml: 2 }} onClick={openLoginModal}>
          Login
        </Button>
      )}
      {isLoading && (
        <Box sx={{ ml: 2 }}>
          <CircularProgress
            disableShrink
            sx={{ height: "24px !important", width: "24px !important" }}
          />
        </Box>
      )}

      {isAuthenticated && !isLoading && (
        <Box>
          <IconButton
            aria-label="Wallet Login"
            onClick={handleOpenMenu}
            aria-controls={menuOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
          >
            <Avatar
              alt="metamask"
              src="/favicon.png"
              sx={{
                border: `1px solid ${palette.primary.dark}`,
                p: ".4rem",
                width: size,
                height: size,
              }}
            />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem>
              <AccountBoxIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="button" color="primary">
                Profile
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleDisconnect}>
              <ExitToAppIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="button" color="primary">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
};

export default MagicLogin;
