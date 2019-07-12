import React, { Component } from "react";
import * as firebase from "firebase";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import { Link } from "react-router-dom";
class ListContacts extends Component {
  constructor() {
    super();
    this.state = {
      entireData: [],
      query: "",
      hasValue: 0
    };
  }
  //To change the state after initial rendering
  componentDidMount() {
    const DB = firebase.database();
    const contactlistdata = DB.ref("ContactsList");
    contactlistdata.on("value", this.gotData, this.gotErr);
    console.log("hello");
  }
  // Callback Method called when retrieves the data from the database
  gotData = data => {
    let dataitems = data.val();
    {
      data.val() === null &&
        this.setState({
          hasValue: 0
        });
    }
    // console.log(dataitems);
    console.log("hey");
    {
      data.val() !== null &&
        this.setState({
          ...this.state,
          entireData: Object.values(Object.values(dataitems)),
          hasValue: 1
        });
    }
  };
  // Callback method called when receives some error during the retrieval of data from the database
  gotErr = err => {
    console.log(err);
  };
  // Method handles the contact delete
  handleRemoveContact = e => {
    console.log(e.target);
    console.log("I");
    // firebase
    //   .database()
    //   .ref("ContactsList/" + e.key)
    //   .remove();
    // console.log("item removed");
  };
  //Method to set the state of the query/search field
  handleQueryChange = query => {
    this.setState({
      query: query.trim()
    });
  };
  // Clears the query and shows the entire contact list
  clearQuery = () => {
    this.setState({
      query: ""
    });
  };

  render() {
    const { query, entireData } = this.state;
    let showingContacts;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingContacts = entireData.filter(contact => match.test(contact.name));
    } else {
      showingContacts = entireData;
      console.log(showingContacts);
    }
    // showingContacts[1].sort(sortBy("name"));
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="search contact's here"
            value={query}
            onChange={e => this.handleQueryChange(e.target.value)}
          />
          <Link to="/create" className="add-contact">
            Add Contact
          </Link>
        </div>
        {this.state.hasValue === 1 && (
          <div>
            {showingContacts.length !== entireData.length && (
              <div className="showing-contacts">
                <span>
                  Now showing {showingContacts.length} out of{" "}
                  {entireData.length}
                </span>
                <button onClick={this.clearQuery}>Show all</button>
              </div>
            )}
            <ul className="contact-list">
              {showingContacts.map((eachcontent, index) => (
                <li key={index} className="contact-list-item">
                  <div
                    className="contact-avatar"
                    style={{
                      backgroundImage: `url(${eachcontent.avatar})`
                    }}
                  />
                  {console.log(eachcontent.imgurl)}
                  <div className="contact-details">
                    <p>
                      <strong>{eachcontent.name}</strong>
                    </p>
                    <p>{eachcontent.email}</p>
                    <p>{eachcontent.phonenumber}</p>
                  </div>
                  <button
                    className="contact-remove"
                    onClick={e => this.handleRemoveContact(e)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {this.state.hasValue === 0 && (
          <div className="contact-details contact-list">
            <p>
              <center>No Contacts Available</center>
            </p>
          </div>
        )}
      </div>
    );
  }
}
export default ListContacts;
