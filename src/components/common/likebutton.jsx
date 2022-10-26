import React, { Component } from "react";

// Input: liked: boolean
// Output: onClick

class LikeButton extends Component {
  getIconClasses = () => {
    let classes = "fa fa-heart";
    return this.props.liked === true ? classes : classes + "-o";
  };

  render() {
    return (
      <i
        onClick={this.props.onLikeToggle}
        style={{ cursor: "pointer" }}
        className={this.getIconClasses()}
        aria-hidden="true"
      ></i>
    );
  }
}

export default LikeButton;
