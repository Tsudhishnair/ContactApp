import React, { Component } from "react";
import "./App.css";
import CreateContact from "./Components/CreateContact";
import ListContacts from "./Components/ListContacts";
import { Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="app">
        <Route path="/" exact component={ListContacts} />
        <Route path="/create" exact component={CreateContact} />
      </div>
    );
  }
}

export default App;
