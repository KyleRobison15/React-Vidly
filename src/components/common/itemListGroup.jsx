import React, { Component } from "react";

export default class ItemListGroup extends Component {
  render() {
    let { items, textProperty, valueProperty, selectedItem, onItemSelect } =
      this.props;

    return (
      <ul className="list-group">
        <li
          className={
            selectedItem === null || selectedItem === undefined
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect()}
        >
          All Genres
        </li>
        {items.map((item) => (
          <li
            key={item[valueProperty]} // Using subscript notation here because we do not know the name of the valueProperty ahead of time
            className={
              selectedItem === item
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

// Here we are setting the default properties for an instance of this ItemListGroup component
// That means whenever an ItemListGroup component is implemented, the textProperty and valueProperty will automatically be set this way
// If we are eventually working with a different type of object that does not have these "name" and "_id" properties, we can override them
ItemListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
