import { Box, Button } from "@mui/material";
import { useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./auth/AuthContext";
import Routing from "./Routes/Routing";
import { ThemeContext } from "./theme_context/theme_context";

import "./App.css";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // console.log(theme, "theme");

  useEffect(() => {
    const checkConnectivity = () => {
      if (!navigator.onLine) {
        alert("Please check your internet connection");
      }
    };

    // Initial check
    checkConnectivity();

    // Set up event listener to check for changes in connectivity
    window.addEventListener("online", checkConnectivity);
    window.addEventListener("offline", checkConnectivity);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", checkConnectivity);
      window.removeEventListener("offline", checkConnectivity);
    };
  }, []);
  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      <Box sx={{ position: "fixed", bottom: 5, right: 5 }}>
        <Button variant="contained" onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </Button>
      </Box>

      <AuthProvider>
        <Routing />
      </AuthProvider>
    </div>
  );
}

export default App;
