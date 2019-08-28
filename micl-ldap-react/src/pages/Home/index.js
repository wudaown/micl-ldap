import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, Container } from "@material-ui/core";

class Home extends Component {
  render() {
    return (
      <Container component="main" maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              MICL NLP HOME PAGE
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Home;
