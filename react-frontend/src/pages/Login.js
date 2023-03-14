import React, { useState } from "react";
import { styled } from "@mui/system";
import { Card, TextField, Typography, Button } from "../mui";
import { Link, Route, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";


const Background = styled("div")({
  background: "linear-gradient(#A3D9A6, white)",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const MuiCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 50,
});

const MuiTextField = styled(TextField)({
  margin: 15,
  width: "300px",
});

const SubmitButton = styled(Button)({
  background: "#F36350",
  margin: 15,
});

const Login = ({ handleClose }) => {
  //   const classes = useStyles();
  // create state variables for each input
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(user, password);
    handleClose();
  };

  const userPaths = {
    vendor: "/vendor",
  };

  const navigate = useNavigate();
  const handleKeypress = (e) => {
    console.log(user, password);
    navigate(userPaths[user]);
  };

  // clear all sessionStorage items
  window.sessionStorage.clear();

  return (
    <>
      <Background>
        <img
          src={logo}
          style={{ height: "15%", width: "15%", marginBottom: "3%" }}
        />
        <Typography gutterBottom variant='h3' component='div'>
          Sign In
        </Typography>

        <MuiCard onSubmit={handleSubmit} onKeyPress={handleKeypress}>
          <MuiTextField
            label='Email address'
            onChange={(e) => setUser(e.target.value)}
          />
          <MuiTextField
            label='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Link to={userPaths[user]} style={{ textDecoration: "none" }}>
              <SubmitButton type='submit' variant='contained'>
                Login
              </SubmitButton>
            </Link>
          </div>
        </MuiCard>
      </Background>
    </>
  );
};

export default Login;