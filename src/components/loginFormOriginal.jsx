// THIS IS THE LOGIN FORM BEFORE WE EXTRACTED ALL THE REUSABLE CODE

import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
class LoginForm extends Component {
  // This creates a ref object that we can then use to directly access the DOM
  // It's a good rule of thumb to avoid using refs as much as possible
  // Only use them when it's necessary
  username = React.createRef();

  state = {
    // Controlled elements cannot be initialized with null or undefined
    // Our form input fields are controlled elements in this implementation
    // So we MUST initialize the account properties to an empty string (or something we get from the server)
    account: { username: "", password: "" },

    // Here we also have a property that includes all the validation errors for this form
    errors: {},
  };

  // This is the schema we define using Joi to handle our validations
  // It does not need to be part of the state becuase it will never change once it's defined
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  // This method is for validating the ENTIRE form
  validate = () => {
    // Joi.validate() Returns an object with several properties we can use to handle errors if there are any
    // One of the properties is another object called "error"
    // This errors object has a property called "details" which is an array of objects with details about the error
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    // Once we get our result object - if it's falsey we want to return null (there are no validation errors)
    if (!error) return null;

    // Otherwise we need to get the details of the error returned from Joi, and map the details into a new error object of our own
    // So we define an empty error object that we will fill with the stuff we get out of Joi's details array
    const errors = {};

    // for each object in our details array...
    error.details.forEach((item) => {
      // Get the value of that item's path[0] (the name of the input element (the target property) that caused the error )
      // Use subscript notation to create a new property which is named to whatever was stored in item.path[0]
      // Set that new property of the errors object to the message from our item object
      errors[item.path[0]] = item.message;
    });

    return errors;

    //////////////// VALIDATION WITHOUT JOI ///////////////////
    // const errors = {};
    // const { account } = this.state;
    // if (account.username.trim() === "") {
    //   errors.username = "Username is required.";
    // }
    // if (account.password.trim() === "") {
    //   errors.password = "Password is required.";
    // }
    // return Object.keys(errors).length === 0 ? null : errors; //Object.keys(<object>) returns an array of the properties of an object
    //////////////////////////////////////////////////////////
  };

  // This method is for validating each individual property (without checking the entire form)
  validateProperty = ({ name, value }) => {
    // In this case, we only one to validate a single input field
    // So we create a new object where the only property is set dynamically
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;

    //////////////// VALIDATION WITHOUT JOI ///////////////////
    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required.";
    // }
    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required";
    // }
    //////////////////////////////////////////////////////////
  };

  // By default, any time a form is submitted, we get a full page reload along with all our JS bundle code
  // This is inefficient and it's better to set the onSubmit attribute for your form manually and then handle it more efficiently
  // Pass an event to the handler and call event.preventDefault() to stop the page from reloading every time we submit the form
  handleSubmit = (event) => {
    event.preventDefault();
    // Old way we used to get form values using plain JS
    // const username = document.getElementById("username").value;

    // Using React.createRef() to access the real DOM directly:
    // const username = this.username.current.value; // this.username is currently referencing the username input element in our form
    const errors = this.validate();
    this.setState({ errors: errors || {} }); // Our errors property should always be set to an object (never null or we will get an error)

    // Submit form to the server (using log in place for now)
    console.log("Submitted");
  };

  // We have made our input fields controlled elements (they do not have their own state)
  // We did this by setting the value attribute to {this.state.account.<partOfStateBindedToInputField>}
  // This way we can have a single source of truth for our data
  // We need this
  handleChange = (event) => {
    const errors = { ...this.state.errors }; // Clone the errors object from our state (we never update our state directly)
    const errorMessage = this.validateProperty(event.currentTarget);
    if (errorMessage) errors[event.currentTarget.name] = errorMessage;
    //If the input field generates an error set the error message to the right property that caused it
    else delete errors[event.currentTarget.name]; //If there is no error on the input, then delete the errors property so

    const account = { ...this.state.account }; // Clone the account object from our state (we never update our state directly)

    // Now we need to set the account property in our state to the value from the element raising the onChange event
    // In this case we want to set the username and password properties of our account in the state
    // We want to set those property values to whatever is given in our username and password input elements
    // event.currentTarget returns a reference to the current element raising an event
    // We use subscript notation here so we can work with properties of an object dynamcially (we don't know ahead of time which element we are working with)
    // In this case we need to reference a string with the name of the account property we want (account.username or account.password)
    // So we can create a "name" attribute in our input elements and then read it using the subscript notation event.currentTarget.name
    // Finally we set that account property to the value that was given in the input element (event.currentTarget.value)
    account[event.currentTarget.name] = event.currentTarget.value;

    // Finally, call this.setState() passing our new account object to change the state of our component and re-render the DOM
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state; // Object destructuring so we can clean up the code and not have to reference this.state.account everytime

    return (
      <div>
        <h1 className="display-1">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {/* We extracted these two input fields into a separate, reusable Input component input.jsx */}
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button
            disabled={this.validate()}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

// KEY LESSONS LEARNED
// * How to build a form in react
// * How to keep the form in sync with the state
// * How to prevent a new reload every time we submit a form
