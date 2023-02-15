import { useState, useCallback } from "react";

export const Auth = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    roles: [],
  });

  function updateUser(key, value) {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  function resetUser() {
    setUser({
      username: "",
      email: "",
      roles: [],
    });
  }

  const login = useCallback(async (userData) => {
    if (userData) {
      updateUser("username", userData.username);
      updateUser("email", userData.email);
      updateUser("roles", userData.roles);
    }
  }, []);

  const logout = useCallback(() => {
    sendLogout();
    resetUser();
  }, []);

  async function sendLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        mode: "cors",
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

  return { user, login, logout };
};
