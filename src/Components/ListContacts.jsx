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
      query: ""
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
  // Clears the query and shows the entire contact list
  clearQuery = () => {
    this.setState({
      query: ""
    });
  };
  //@Todo : Check the image url its not working currently

  render() {
    const { query, entireData } = this.state;
    let showingContacts;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingContacts = entireData.filter(contact => match.test(contact.name));
    } else {
      showingContacts = entireData;
    }
    showingContacts.sort(sortBy("name"));
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
        {showingContacts.length !== entireData.length && (
          <div className="showing-contacts">
            <span>
              Now showing {showingContacts.length} out of {entireData.length}
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
                  backgroundImage: `url(${eachcontent.imgurl})`
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
