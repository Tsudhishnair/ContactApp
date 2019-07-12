import React, { Component } from "react";
import * as firebase from "firebase";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class ListContacts extends Component {
  constructor() {
    super();
    this.state = {
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
    // console.log(dataitems)
    this.setState({
      ...this.state,
      entireData: dataitems,
      query: ""
    });
  };
  // Callback method called when receives some error during the retrieval of data from the database
  gotErr = err => {
    console.log(err);
  };
  // Method handles the contact delete
  handleRemoveContact = e => {
    console.log(e);
    firebase
      .database()
      .ref("ContactsList/" + e)
      .remove();
    console.log("item removed");
  };
  //Method to set the state of the query/search field
  handleQueryChange = query => {
    this.setState({
      query: query.trim()
    });
  };
  //@Todo : Check the image url its not working currently

  render() {
    let showingContacts;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      showingContacts = this.state.entireData.filter(contact =>
        match.test(contact.name)
      );
    } else {
      showingContacts = this.state.entireData;
    }
    showingContacts.sort(sortBy('name'))
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="search contact's here"
            value={this.state.query}
            onChange={e => this.handleQueryChange(e.target.value)}
          />
        </div>
        <ul className="contact-list">
          {showingContacts.map((eachcontent, index) => (
            <li key={index} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${eachcontent.imgurl})`
                }}
              />
              {console.log(eachcontent.imgurl)}
              <div className="contact-details">
                <p>{eachcontent.name}</p>
                <p>{eachcontent.email}</p>
              </div>
              <button
                className="contact-remove"
                onClick={e => this.handleRemoveContact(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default ListContacts;
