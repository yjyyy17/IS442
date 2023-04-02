import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Card, TextField, Typography, Button } from "../mui";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import getAllUsers from "../services/getAllUsers";

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
  padding: 50,
});

const MuiTextField = styled(TextField)({
  marginTop: 15,
  marginBottom: 15,
  width: "300px",
});

const SubmitButton = styled(Button)({
  background: "#F36350",
  marginTop: 15,
  marginBottom: 15,
  width: "100%",
});

const Login = ({ handleClose }) => {
  // Initialise state variable for form data
  const [loginData, setLoginData] = useState({
    user: "",
    password: "",
  });

  const [userData, setUserData] = useState();

  const handleInputChange = (event) => {
    // Handle input changes
    var name = event.target.name;
    var value = event.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  // Gets all user data
  useEffect(() => {
    const fetchData = async () => {
      let data = await getAllUsers();
      setUserData(data);
    };

    fetchData();
  }, []);

  
  const navigate = useNavigate();
  
    // ***** To update after log in POST request is complete *****
    const userPaths = {
      Vendor: "/vendor",
      Admin: "/admin",
      Approver: "/approver"
    };

  // Navigate to main page
  const handleSubmit = (e) => {
    // Search for the user email in the database
    e.preventDefault();
    const user = userData.find((u) => u.email === loginData.user);  
    if (user.password === loginData.password) {
      sessionStorage.setItem('userId', user.userId);
      sessionStorage.setItem('userEmail', user.email);
      navigate(userPaths[user.userType]);
    }
  };

  // Enable login with enter key pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const user = userData.find((u) => u.email === loginData.user);  
    if (user.password === loginData.password) {
      navigate(userPaths[user.userType]);
      sessionStorage.setItem('userId', user.userId);
      sessionStorage.setItem('userEmail', user.email);
    }
    }
  }

  return (
    <>
      <Background>
        <img
          src={logo}
          style={{ height: "13%", width: "auto", marginBottom: "3%" }}
        />
        <Typography gutterBottom variant='h3' component='div'>
          Sign In
        </Typography>

        <MuiCard onKeyDown={handleKeyDown}>
          <Typography>Username</Typography>
          <MuiTextField
            name='user'
            value={loginData.user}
            onChange={handleInputChange}
          />

          <Typography>Password</Typography>
          <MuiTextField
            name='password'
            type='password'
            value={loginData.password}
            onChange={handleInputChange}
          />
          <div>
            <Link
              to={userPaths[loginData.user]}
              style={{ textDecoration: "none" }}
              onClick={handleSubmit}
            >
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
