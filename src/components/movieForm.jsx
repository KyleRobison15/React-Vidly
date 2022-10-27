/**
 * New Button to Add Movie on Movies Page
 * Add Movie Button takes you to a blank Movie Form at (movies/new)
 * Movie Form has Title, Genre, Number in Stock, Rate, and a Save Button
 * Save Button is disabled until form is validated
 * Number in stock is value between 0 and 100
 * Rate is a number between 0 and 10
 * When a movie is saved, it gets added to our movies
 * When the Title link is clicked, we are taken to the movies form with all the fields populated
 */

import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    // When this movieForm component is generate, we want to get the genres and update the state
    const genres = getGenres();
    this.setState({ genres });

    // Then we want to read the "id" parameter from the route and store it in a constant called movieId
    const movieId = this.props.match.params.id;

    // If the movieId from our route is "new" then return immediately from componentDidMount()
    // Because we DO NOT want to pre-populate the form since this will be a brand new movie
    if (movieId === "new") return;

    // Otherwise, if the movieId from our route !== new, we want to pre-populate the form
    // We create a new const and set it to the movie we get from the DB by passing the ID
    const movie = getMovie(movieId);

    // We then check if a valid movie was returned
    // If the movie is falsey, then a valid movie was not returned and we want to redirect them to a not found page
    // To do this, we use history.replace which redirects the user to our not found page and prevents them from using the back button
    // We also use the "return" keyword to
    if (!movie) return this.props.history.replace("/notFound");

    // Finally we want to set the state of our data
    // But before we set the state of our data, we map it to what the data should look like on this specific form
    // This is good practice becuase often the APIs we use are not specific for one page
    // To map the data we create a new method called mapToModelView where we create a new object that works for this particular form
    this.setState({ data: this.mapToModelView(movie) });
  }

  mapToModelView(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1 className="display-1">Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputElement("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInputElement("numberInStock", "Number in Stock")}
          {this.renderInputElement("dailyRentalRate", "Rate")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
