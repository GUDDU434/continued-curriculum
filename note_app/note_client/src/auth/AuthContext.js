/* eslint-disable */
import PropTypes from "prop-types";
import { createContext, useCallback, useMemo, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_SUCCESS_METHOD } from "../Redux/auth/auth.actionTypes";
import { axiosInstance } from "../utils/axiosInstance";
import useAxiosPrivate from "../utils/useAxiosPrivate";

// ----------------------------------------------------------------------
// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------
const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: {},
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "REFRESH") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(initialState);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  const axiosPrivate = useAxiosPrivate();

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosPrivate.get("/api/v1/users/details/token", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const user = response.data;

      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } catch (error) {
      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      console.error(error);
      throw error;
    }
  }, [axiosPrivate]);

  // LOGIN
  const login = useCallback(
    async (username, password) => {
      try {
        const response = await axiosInstance.post(
          "/api/v1/users/login",
          JSON.stringify({ email: username, password })
        );

        const { accessToken, refreshToken, role } = response?.data?.data;

        // // Save tokens and role in localStorage
        // localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("refreshToken", refreshToken);
        // localStorage.setItem("role", role);

        const user = response?.data?.data;

        // dispatch({ type: LOGIN_SUCCESS_METHOD, payload: user });

        dispatch({
          type: "LOGIN",
          payload: { user },
        });

        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
        navigate("/", { state: { from: location }, replace: true });
      } catch (error) {
        console.error("Login error: ", error?.response?.data);
        throw error;
      }
    },
    [navigate]
  );

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    try {
      const response = await axiosInstance.post("/api/account/register", {
        email,
        password,
        firstName,
        lastName,
      });
      const { accessToken, refreshToken, role } = response?.data;

      // Save tokens and role in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);

      const user = response?.data;
      dispatch({
        type: "REGISTER",
        payload: {
          user,
        },
      });
    } catch (error) {
      console.error("Register error: ", error);
    }
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  // Refresh Token
  const refresh = useCallback(() => {
    try {
      axiosInstance
        .post(
          "/api/v1/users/refresh",
          JSON.stringify({ refreshToken: state?.user?.refreshToken })
        )
        .then((res) => {
          dispatch({
            type: "REFRESH",
            payload: {
              isAuthenticated: true,
              user: {
                ...state?.user,
                accessToken: res?.data?.data,
              },
            },
          });
        });
    } catch (error) {
      console.error("Refresh token error: ", error);
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "jwt",
      login,
      register,
      logout,
      initialize,
      refresh,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
      initialize,
      refresh,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
