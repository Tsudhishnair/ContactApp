import React, { Component } from "react";
import * as firebase from "firebase";

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
      entireData: dataitems
    });
  };
  // Callback method called when receives some error during the retrieval of data from the database
  gotErr = err => {
    console.log(err);
  };
  // Method handles the contact delete
  handleRemoveContact = e => {
    console.log(e); 
    firebase.database().ref("ContactsList/"+e).remove();
    console.log("item removed")
  };
  //@Todo : Check the image url its not working currently
  
  render() {
    return (
      <ul className="contact-list">
        {this.state.entireData.map((eachcontent, index) => (
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
    );
  }
}
export default ListContacts;
