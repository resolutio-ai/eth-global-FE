import { useCallback, useState, useEffect } from "react";
import { Magic } from 'magic-sdk';
import { useResolutioBackdropContext } from "../context/ResolutioBackdropContext";

const createMagic = (key) => {
  // We make sure that the window object is available
  // Then we create a new instance of Magic using a publishable key
  return typeof window !== 'undefined' && new Magic(key);
};

// Pass in your publishable key from your .env file
export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);

export const userInitialState = {
  metadata: null,
  isLoading: false,
  isAuthenticated: false,
};

export const useUser = () => {
  const [user, setUser] = useState(userInitialState);
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();

  const login = useCallback(async (email) => {
    // Log in using our email with Magic and store the returned DID token in a variable
    openBackdrop("Check your email...");
    try {
      await magic.auth.loginWithEmailOTP({
        email,
      });
      const userMetadata = await magic.user.getInfo();
      setUser((prev) => ({ ...prev, metadata: userMetadata, isAuthenticated: true }));
    } catch (error) {
      console.error(error);
    } finally {
      closeBackdrop();
    }
  }, [closeBackdrop, openBackdrop]);

  const logout = useCallback(async () => {
    // Call Magic's logout method, reset the user state, and route to the login page
    openBackdrop("Logging out...");
    try {
      await magic.user.logout();
      setUser((prev) => ({ ...prev, metadata: null, isAuthenticated: false }));
    } catch (error) { } finally {
      closeBackdrop();
    }

  }, [closeBackdrop, openBackdrop]);


  useEffect(() => {
    // Set loading to true to display our loading message within pages/index.js
    setUser((prev) => ({ ...prev, isLoading: true }));
    // Check if the user is authenticated already
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        // Pull their metadata, update our state, and route to dashboard
        magic.user.getInfo().then((userData) => setUser((prev) => ({ ...prev, metadata: userData, isAuthenticated: true, isLoading: false })));
      } else {
        // If false, route them to the login page and reset the user state
        setUser((prev) => ({ ...prev, metadata: null, isAuthenticated: false, isLoading: false }));
      }
    });
    // Add an empty dependency array so the useEffect only runs once upon page load
  }, []);

  return { user, login, logout };
};