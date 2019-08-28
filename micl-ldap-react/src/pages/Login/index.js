import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { MySnackbarContentWrapper } from "../../common/Messages/error";

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

function LoginForm(props) {
  const classes = useStyles();

  const {
    username,
    password,
    handleInputChange,
    error,
    errorMessage,
    handleSubmit
  } = props;

  return (
    <Container component="main" maxWidth="sm">
      <MySnackbarContentWrapper
        variant="error"
        className={classes.margin}
        message={"UNDER CONSTRUCTION"}
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                value={username}
                variant="outlined"
                required={true}
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={e => {
                  handleInputChange(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                variant="outlined"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <MadeBy />
      </Box>
    </Container>
  );
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false,
      errorMessage: ""
    };
  }

  checkBeforeSubmit = () => {
    const { username, password } = this.state;
    if (username.length === 0) {
      this.setState({ error: true });
      this.setState({ errorMessage: "Username cannot be empty" });
    } else if (password.length === 0) {
      this.setState({ error: true });
      this.setState({ errorMessage: "Password cannot be empty" });
    } else {
      this.setState({ error: false });
    }
  };
  handleSubmit = () => {
    this.checkBeforeSubmit();
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, error, errorMessage } = this.state;
    const { handleInputChange, handleSubmit } = this;
    return (
      <LoginForm
        username={username}
        password={password}
        error={error}
        errorMessage={errorMessage}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    );
  }
}

export default Login;
