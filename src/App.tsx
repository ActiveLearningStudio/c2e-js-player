import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddC2e from "./c2e/addc2e";
import Myc2e from "./c2e/mysc2e";
import C2eJsonLd from "./c2e/c2eJSONLD";
import WriterC2e from "./c2e/writerC2e";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AddC2e />
        </Route>
        <Route exact path="/myC2e">
          <Myc2e />
        </Route>
        <Route exact path="/c2ejson">
          <C2eJsonLd />
        </Route>
        <Route exact path="/writer">
          <WriterC2e />
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
