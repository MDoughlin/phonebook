import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ToastContext from "./ToastContext";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // check if the user is logged in.
  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {

        if (location.pathname === "/login" || location.pathname === "/register") {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 500);
        } else {
          navigate(location.pathname ? location.pathname : "/");
        }
        setUser(result);
      } else {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //login

  const loginUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        localStorage.setItem("token", result.token);
        setUser(result.user);
        toast.success(`Logging in ${result.user.name}`);
        navigate("/", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  //register

  const registerUser = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success("User Registered Successfully!");
        navigate("/login", { replace: true });
      } else {
        console.log(result);
      }
    } catch (error) {

    }
  };

  return <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>
    {children}
  </AuthContext.Provider>;
};

export default AuthContext;
