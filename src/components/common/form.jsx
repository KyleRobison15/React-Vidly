import Joi from "joi-browser";
import React, { Component } from "react";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  // This method is for validating the ENTIRE form
  validate = () => {
    // Joi.validate() Returns an object with several properties we can use to handle errors if there are any
    // One of the properties is another object called "error"
    // This errors object has a property called "details" which is an array of objects with details about the error
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

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
    // const { data } = this.state;
    // if (data.username.trim() === "") {
    //   errors.username = "Username is required.";
    // }
    // if (data.password.trim() === "") {
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

    this.doSubmit();
  };

  // We have made our input fields controlled elements (they do not have their own state)
  // We did this by setting the value attribute to {this.state.data.<partOfStateBindedToInputField>}
  // This way we can have a single source of truth for our data
  // We need this
  handleChange = (event) => {
    const errors = { ...this.state.errors }; // Clone the errors object from our state (we never update our state directly)
    const errorMessage = this.validateProperty(event.currentTarget);
    if (errorMessage) errors[event.currentTarget.name] = errorMessage;
    //If the input field generates an error set the error message to the right property that caused it
    else delete errors[event.currentTarget.name]; //If there is no error on the input, then delete the errors property so

    const data = { ...this.state.data }; // Clone the data object from our state (we never update our state directly)

    // Now we need to set the data property in our state to the value from the element raising the onChange event
    // In this case we want to set the username and password properties of our data in the state
    // We want to set those property values to whatever is given in our username and password input elements
    // event.currentTarget returns a reference to the current element raising an event
    // We use subscript notation here so we can work with properties of an object dynamcially (we don't know ahead of time which element we are working with)
    // In this case we need to reference a string with the name of the data property we want (data.username or data.password)
    // So we can create a "name" attribute in our input elements and then read it using the subscript notation event.currentTarget.name
    // Finally we set that data property to the value that was given in the input element (event.currentTarget.value)
    data[event.currentTarget.name] = event.currentTarget.value;

    // Finally, call this.setState() passing our new data object to change the state of our component and re-render the DOM
    this.setState({ data, errors });
  };

  renderSubmitButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInputElement(name, label, type = "text") {
    const { data, errors } = this.state; // Object destructuring so we can clean up the code and not have to reference this.state.data everytime
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
