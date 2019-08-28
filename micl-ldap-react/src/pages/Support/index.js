import React, { Component } from "react";
import Box from "@material-ui/core/Box";
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

function SupportPage(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <MySnackbarContentWrapper
        variant="error"
        className={classes.margin}
        message={"UNDER CONSTRUCTION"}
      />
      <Box mt={5}>
        <MadeBy />
      </Box>
    </Container>
  );
}

class Support extends Component {
  render() {
    return <SupportPage />;
  }
}

export default Support;
