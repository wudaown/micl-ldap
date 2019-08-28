import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as ReactRouterLink } from "react-router-dom";

// import Footer from "../Footer";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  }
}));

export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            MICL NLP
          </Typography>
          <nav>
            <ReactRouterLink to="/register">
              <Button color="default" variant="text" className={classes.link}>
                Register
              </Button>
            </ReactRouterLink>
            <ReactRouterLink to="/reset">
              <Button color="default" variant="text" className={classes.link}>
                Reset Password
              </Button>
            </ReactRouterLink>
            <ReactRouterLink to="/support">
              <Button color="default" variant="text" className={classes.link}>
                Support
              </Button>
            </ReactRouterLink>
          </nav>
          <ReactRouterLink to="/login">
            {/* <Link> */}
            <Button
              //   href="/login"
              color="primary"
              variant="outlined"
              className={classes.link}
            >
              Login
            </Button>
            {/* </Link> */}
          </ReactRouterLink>
        </Toolbar>
      </AppBar>
      {/* Footer */}
      {/* <Container maxWidth="md" component="footer" className={classes.footer}>
        <Footer />
      </Container> */}
      {/* End footer */}
    </React.Fragment>
  );
}
