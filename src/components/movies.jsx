import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

export default class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  render() {
    console.log(this.state.movies);
    return (
      <React.Fragment>
        <br />

        <h3>{this.getMessage()}</h3>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>{this.state.movies.map((x) => this.mapMovie(x))}</tbody>
        </table>
      </React.Fragment>
    );
  }

  mapMovie(movie) {
    return (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.deleteMovie(movie._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  getMessage() {
    return this.state.movies.length < 1
      ? "There are no movies in Database"
      : `Shwoing ${this.state.movies.length} movies in the database`;
  }

  deleteMovie(id) {
    deleteMovie(id);
    this.setState({ movies: getMovies() });
  }
}
