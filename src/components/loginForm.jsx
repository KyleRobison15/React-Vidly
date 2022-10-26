import React, { Component } from "react";
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
    console.log("Submitted");
  };

  // We have made our input fields controlled elements (they do not have their own state)
  // We did this by setting the value attribute to {this.state.account.<partOfStateBindedToInputField>}
  // This way we can have a single source of truth for our data
  // We need this
  handleChange = (event) => {
    // Clone the account information from our state (we never update our state directly)
    const account = { ...this.state.account };

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
    this.setState({ account });
  };

  render() {
    const { account } = this.state; // Object destructuring so we can clean up the code and not have to reference this.state.account everytime

    return (
      <div>
        <h1 className="display-1">Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              autoFocus
              value={account.username} // With this change, the input field no longer has it's own state.
              name="username"
              onChange={this.handleChange}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              value={account.password} // With this change, the input field no longer has it's own state.
              name="password"
              onChange={this.handleChange}
              id="password"
              type="text"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
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
