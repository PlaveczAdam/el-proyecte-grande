import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";

export const Auth = () => {
  const emptyUser = {
    loggedIn: false,
    username: "",
    email: "",
    roles: [],
  };

  const [user, setUser] = useState(emptyUser);

  function updateUser(key, value) {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  function resetUser() {
    setUser(emptyUser);
    Cookies.remove("logged_in");
    Cookies.remove("username");
    Cookies.remove("email");
    Cookies.remove("roles");
  }

  const login = useCallback(async (userData) => {
    const cookieAttributes = { expires: 15 };
    if (userData) {
      updateUser("username", userData.username);
      updateUser("email", userData.email);
      updateUser("roles", userData.roles);
      updateUser("loggedIn", true);

      Cookies.set("username", userData.username, cookieAttributes);
      Cookies.set("email", userData.email, cookieAttributes);
      Cookies.set("roles", JSON.stringify(userData.roles), cookieAttributes);
      Cookies.set("logged_in", true, cookieAttributes);
    }
  }, []);

  const logout = useCallback(() => {
    remoteLogout();
    resetUser();
  }, []);

  async function remoteLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        console.log(errorMessage);
        return;
      }

      console.log("Logout successful.");
    } catch (err) {
      console.log("Logout failed: ", err);
    }
  }

  async function validateUser() {
    try {
      const response = await fetch("/api/auth/validate", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        //console.log("Invalid User");
        return false;
      }
      //console.log("Valid User");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    async function restoreLogin() {
      const loginStatus = Cookies.get("logged_in");
      const userValid = await validateUser();
      if (loginStatus && userValid) {
        updateUser("username", Cookies.get("username"));
        updateUser("email", Cookies.get("email"));
        updateUser("roles", JSON.parse(Cookies.get("roles")));
        updateUser("loggedIn", true);
      } else {
        resetUser();
      }
    }
    restoreLogin();
  }, []);

  return { user, login, logout };
};
