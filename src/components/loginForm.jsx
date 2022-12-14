// THIS IS THE REFACTORED LOGIN FORM
// WE EXTRACTED ALL THE REUSABLE CODE INTO form.jsx
// FOR LEARNING PURPOSES, TAKE A LOOK AT loginFormOriginal.jsx to see what the code was before we extracted it

import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // Submit form to the server (using log in place for now)
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1 className="display-1">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {/* We extracted these two input fields into a separate, reusable Input component input.jsx */}
          {this.renderInputElement("username", "Username")}
          {this.renderInputElement("password", "Password", "password")}
          {this.renderSubmitButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
