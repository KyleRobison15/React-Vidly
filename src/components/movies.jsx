import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ItemListGroup from "./common/itemListGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (movie) => {
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies }); // We must use the setState() function to
  };

  handleLike = (movie) => {
    let movies = this.state.movies;
    if (movie.liked) {
      movie.liked = false;
    } else {
      movie.liked = true;
    }
    this.setState({ movies });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }); // Means when the anchor tag is clicked, the currentPage in our state will be updated to whatever page was clicked on
  };

  handleGenreSelect = (genre) => {
    if (genre === null || genre === undefined) {
      this.setState({ selectedGenre: null, currentPage: 1 });
    } else {
      this.setState({ selectedGenre: genre, currentPage: 1 });
    }
  };

  render() {
    let {
      pageSize,
      currentPage,
      movies: allMovies,
      genres: allGenres,
      selectedGenre,
      sortColumn,
    } = this.state;
    let { length: count } = allMovies; //object destructuring the movies object. We destructure the length property and rename it count.
    if (count === 0) return <p>There are no movies in the database.</p>;

    let filteredMovies = allMovies.filter((movie) => {
      return selectedGenre ? movie.genre._id === selectedGenre._id : allMovies;
    });

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    let movies = paginate(sortedMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row m-2">
          <div className="col-2">
            <ItemListGroup
              items={allGenres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            ></ItemListGroup>
          </div>
          <div className="col">
            <p>Showing {filteredMovies.length} movies in the database.</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            ></MoviesTable>
            <Pagination
              itemsCount={filteredMovies.length} // the number of movies // this.movies.length was destructured and renamed to count
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            ></Pagination>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
