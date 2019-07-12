import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageInput from "./ImageInput";
import serializeForm from "form-serialize";
import * as firebase from "firebase";

class CreateContact extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });

    firebase
      .database()
      .ref("ContactsList")
      .push(values)
    console.log(values);
  };

  render() {
    return (
      <div>
        <Link className="close-create-contact" to="/">
          Close
        </Link>
        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
          className="create-contact-form"
        >
          <ImageInput
            className="create-contact-avatar-input"
            name="avatar"
            maxheight={64}
          />
          <div className="create-contact-details">
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="number" name="age" placeholder="Age" />
            <input
              type="number"
              name="phonenumber"
              placeholder="Phone Number"
            />
            <button>Create</button>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateContact;
