import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { MySnackbarContentWrapper } from "../../common/Messages/error";
import { register } from "../../api";

import {
  USERNAME_EMPTY,
  EMAIL_EMPTY,
  LASTNAME_EMPTY,
  FIRSTNAME_EMPTY,
  MOBILE_EMPTY
} from "../../utils/constants";

function MadeBy() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Made By Weiliang"}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function RegisterForm(props) {
  const classes = useStyles();
  const {
    firstName,
    lastName,
    email,
    username,
    mobile,
    error,
    errorMessage,
    success,
    successMessage,
    handleInputChange,
    handleSubmit
  } = props;
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {success && (
                <MySnackbarContentWrapper
                  variant="success"
                  className={classes.margin}
                  message={successMessage}
                  //   onClose={() => {
                  //     console.log("123");
                  //   }}
                />
              )}
              {error && (
                <MySnackbarContentWrapper
                  variant="error"
                  className={classes.margin}
                  message={errorMessage}
                  onClose={() => {
                    console.log("123");
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={e => {
                  handleInputChange(e);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={e => {
                  handleInputChange(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Prefer Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={e => {
                  handleInputChange(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => {
                  handleInputChange(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobile"
                label="Mobile Number"
                name="mobile"
                autoComplete="mobile"
                value={mobile}
                onChange={e => {
                  handleInputChange(e);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              handleSubmit();
            }}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeBy />
      </Box>
    </Container>
  );
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      mobile: "",
      error: false,
      errorMessage: "",
      success: false,
      successMessage: ""
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  checkBeforeSubmit = () => {
    const { username, email, firstName, lastName, mobile } = this.state;
    if (firstName.length === 0) {
      this.setState({ error: true });
      this.setState({ errorMessage: FIRSTNAME_EMPTY });
    } else if (lastName.length === 0) {
      this.setState({ error: true });
      this.setState({ errorMessage: LASTNAME_EMPTY });
    } else if (username.length === 0) {
      this.setState({ error: true });
      this.setState({ errorMessage: USERNAME_EMPTY });
    } else if (email.length === 0) {
      this.setState({ error: true });
      this.setState({ errorMessage: EMAIL_EMPTY });
    } else if (mobile.length === 0) {
      this.setState({ error: true });
      this.setState({ errorMessage: MOBILE_EMPTY });
    } else {
      this.setState({ error: false });
    }
  };
  handleSubmit = () => {
    this.checkBeforeSubmit();
    const { username, email, firstName, lastName, mobile } = this.state;

    const params = {
      username: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile
    };

    register(params)
      .then(res => {
        this.setState({ success: true });
        this.setState({ successMessage: res.data.msg });
      })
      .catch(err => {
        this.setState({ error: true });
        this.setState({ errorMessage: err.response.data.msg });
      });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      username,
      mobile,
      error,
      errorMessage,
      success,
      successMessage
    } = this.state;
    const { handleInputChange, handleSubmit } = this;
    return (
      <RegisterForm
        firstName={firstName}
        lastName={lastName}
        email={email}
        username={username}
        mobile={mobile}
        handleInputChange={handleInputChange}
        error={error}
        errorMessage={errorMessage}
        success={success}
        successMessage={successMessage}
        handleSubmit={handleSubmit}
      />
    );
  }
}

export default Register;
