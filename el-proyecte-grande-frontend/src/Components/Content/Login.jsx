import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../Shared/AuthContext";
import AlertMessage from "../Shared/AlertMessage";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function handleLogin() {
    setErrorText(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        //credentials: "include",
        body: JSON.stringify({
          username: loginUser,
          password: loginPassword,
        }),
      });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        console.log(errorMessage);

        clearInputs();
        setIsLoading(false);
        setErrorText(errorMessage);
        return;
      }

      const responseBody = await response.json();

      clearInputs();
      setIsLoading(false);
      auth.login(responseBody);
    } catch (err) {
      console.log(err);
      clearInputs();
      setErrorText("Login failed.");
      setIsLoading(false);
    }
  }

  function clearInputs() {
    setLoginUser("");
    setLoginPassword("");
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      height="100%"
    >
      <h1>Grande Hotel Management System</h1>
      <h2>Log in to continue *</h2>

      <Grid item xs={11} md={4}>
        {errorText && <AlertMessage type="error" message={errorText} />}
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                label="Username"
                id="user"
                name="user"
                type="text"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                label="Password"
                id="password"
                name="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ marginY: "20px", paddingY: "10px" }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} md={12} textAlign="end" fontStyle="italic">
              <span>* Employees only</span>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
