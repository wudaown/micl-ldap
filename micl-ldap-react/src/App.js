import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPwd from "./pages/ResetPwd";
import Support from "./pages/Support";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./common/Header";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset" component={ResetPwd} />
        <Route exact path="/support" component={Support} />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
