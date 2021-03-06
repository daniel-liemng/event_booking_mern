import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";

import { useUserContext } from "../context/userContext";
import Message from "../components/Message";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: "3rem",
    padding: "1rem",
  },
  title: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  submitBtn: {
    marginTop: "1.5rem",
    marginBottom: "2rem",
  },
  link: {
    textDecoration: "none",
    marginLeft: "1rem",

    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Register = ({ history, location }) => {
  const classes = useStyles();

  const {
    user,
    user_register_loading: loading,
    user_register_error: error,
    registerUser,
  } = useUserContext();

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, redirect, user]);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    e.preventDefault();

    const { name, email, password } = userInput;

    setMessage(error);

    registerUser(name, email, password);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage(null);
  };

  // console.log("error", message);
  console.log("123register", error);

  return (
    <Container maxWidth='sm'>
      <Paper elevation={0} className={classes.paper}>
        <Typography
          variant='h4'
          align='center'
          className={classes.title}
          color='primary'
        >
          Register
        </Typography>

        {message && (
          <Message
            open={message ? true : false}
            handleClose={handleSnackbarClose}
            message={message}
            type='error'
          />
        )}

        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleRegister}
        >
          <TextField
            label='Name'
            placeholder='Name'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='name'
            value={userInput.name}
            onChange={handleChange}
          />

          <TextField
            label='Email'
            placeholder='name@email.com'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='email'
            value={userInput.email}
            onChange={handleChange}
          />

          <TextField
            type='password'
            label='Password'
            placeholder='Password'
            fullWidth
            style={{ margin: 8 }}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            name='password'
            value={userInput.password}
            onChange={handleChange}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submitBtn}
            disabled={loading}
          >
            {loading ? <Loading size='1.3rem' /> : "Register"}
          </Button>
        </form>

        <Typography variant='h6'>
          Already have an account?{" "}
          <Link to='/login' className={classes.link}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
