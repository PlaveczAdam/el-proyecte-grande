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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();

      if (!response.ok) {
        const errorMessage = responseBody;
        console.log(errorMessage);
        return;
      }
      console.log("Logged Out.");
    } catch (err) {
      console.log("Logout failed: ", err);
    }
  }

  return { user, login, logout };
};
