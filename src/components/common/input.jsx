import React, { Component } from "react";
class Input extends Component {
  render() {
    const { name, label, error, ...rest } = this.props;

    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <input {...rest} name={name} id={name} className="form-control" />
        {/* Here we render this alert div only if the error prop we get from our loginForm is not null */}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
