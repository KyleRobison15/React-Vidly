import React, { Component } from "react";
import { Link } from "react-router-dom";
import LikeButton from "./common/likebutton";
import Table from "./common/table";

class MoviesTable extends Component {
  // A simple property here is sufficient. We do not have to add this to the state
  // Because this property is not going to change throughout the lifecycle of this component
  // We need this property for this component, because we are going to implement a re-usable TableHeader component
  // That table header component needs an array of column objects, with path and label properties
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <LikeButton
          onLikeToggle={() => this.props.onLike(movie)}
          liked={movie.liked}
        ></LikeButton>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      ></Table>
    );
  }
}

export default MoviesTable;
