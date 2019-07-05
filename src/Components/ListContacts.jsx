import React, { Component } from "react";
import * as firebase from "firebase";

class ListContacts extends Component {
  constructor() {
    super();
    this.state = {
      //states to stores the contact details such as name age email.
      contactData: {
        name: [],
        age: [],
        email: []
      },
      entireData: []
    };
  }
  //To change the state after initial rendering
  componentDidMount() {
    const DB = firebase.database();
    const contactlistdata = DB.ref("ContactsList");
    contactlistdata.on("value", this.gotData, this.gotErr);
  }
  // Callback Method called when retrieves the data from the database
  gotData = data => {
    let dataitems = data.val();
    console.log(dataitems);
    let names = dataitems.map((datarow, index) => datarow.name);
    let ages = dataitems.map((datarow, index) => datarow.age);
    let emails = dataitems.map((datarow, index) => datarow.email);
    console.log(names);
    this.setState({
      ...this.state,
      entireData: dataitems,
      contactData: {
        ...this.state,
        name: names,
        age: ages,
        email: emails
      }
    });
  };
  // Callback method called when receives some error during the retrieval of data from the database
  gotErr = err => {
    console.log(err);
  };

  render() {
    return (
      <ul>
        {this.state.entireData.map((eachcontect, index) => (
          <li key={index}>{eachcontect.name}</li>
        ))}
      </ul>
    );
  }
}
export default ListContacts;
