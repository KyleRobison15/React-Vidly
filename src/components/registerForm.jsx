/**
 * Username should be a valid email
 * Password should be Min 5 characters
 * Register button is disabled until valid form
 * When register button is clicked - log to console
 */
import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    // Submit form to the server (using log in place for now)
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1 className="display-1">Register</h1>
        <form onSubmit={this.handleSubmit}>
          {/* We extracted these two input fields into a separate, reusable Input component input.jsx */}
          {this.renderInputElement("username", "Username")}
          {this.renderInputElement("password", "Password", "password")}
          {this.renderInputElement("name", "Name")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
