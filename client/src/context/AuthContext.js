import { createContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
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
        setUser(result);
      } else {
        console.log(error);
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
      } else {

      }
    } catch (error) {
      console.log(error);
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
        console.log(result);
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
