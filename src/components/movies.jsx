import React, { Component } from "react";
import { getMovie, getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";

export default class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  render() {
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
          <Like
            onClick={() => this.handleLike(movie)}
            liked={movie.liked}
          ></Like>
        </td>
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

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  }
}
