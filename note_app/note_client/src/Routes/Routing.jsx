import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth/AuthContext";
import Navbar from "../Components/Navbar/Navbar";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import Notes from "../Pages/Notes/Notes";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigate();
  // const { profile } = useSelector((state) => state.loginReducer);

  const [isAuth, setIsAuth] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    localStorage.getItem("accessToken") ? setIsAuth(true) : setIsAuth(false);

    if (!isAuthenticated && !localStorage.getItem("accessToken")) {
      navigation("/login");
    } else {
      // navigation("/");
    }
  }, [navigation, isAuth, isAuthenticated]);

  // console.log(isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          {/* <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} /> */}
          <Box component="main" sx={{ flexGrow: 2, p: 3 }}>
            <Navbar onOpen={handleSidebarToggle} />
            <Box>
              <Routes>
                <Route
                  element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
                >
                  {/* Note Routes */}
                  <Route path="/" element={<Notes />} />

                  {/* Register Routes */}
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="*"
                    element={() => (
                      <h1 style={{ textAlign: "center", marginTop: "200px" }}>
                        404 Page Not Found
                      </h1>
                    )}
                  />
                </Route>
              </Routes>
            </Box>
          </Box>
        </Box>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
      <ToastContainer />
    </>
  );
};

export default Routing;
