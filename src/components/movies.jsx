import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

import { paginate } from "../utils/paginate";

export default class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    selectedPage: 1,
  };

  render() {
    const count = this.state.movies.length;
    const { pageSize, selectedPage } = this.state;

    const pageItems = paginate(this.state.movies, selectedPage, pageSize);

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
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{pageItems.map((x) => this.mapMovie(x))}</tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          selectedPage={selectedPage}
          onPageChange={(page) => this.handlePageChange(page)}
        ></Pagination>
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

  handlePageChange(pageNo) {
    this.setState({ selectedPage: pageNo });
  }
}
