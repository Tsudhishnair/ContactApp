import React,{Component} from "react";
// import logo, { ReactComponent } from "./logo.svg";
import "./App.css";
import ListContacts from "./Components/ListContacts";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListContacts />
      </div>
    );
  }
}

export default App;
