import React, { Component } from "react";
import Table from "./common/table";

import Like from "./common/like";

class MoviesTable extends Component {
  render() {
    const { movies, onLikeMovie, onDeleteMovie } = this.props;
    const columns = [
      { name: "title", displayName: "Title" },
      { name: "genre.name", displayName: "Genre" },
      { name: "numberInStock", displayName: "Stock" },
      { name: "dailyRentalRate", displayName: "Rate" },
      {
        key: "like",
        content: (movie) => (
          <Like onClick={() => onLikeMovie(movie)} liked={movie.liked}></Like>
        ),
      },
      {
        key: "delete",
        content: (movie) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDeleteMovie(movie)}
          >
            Delete
          </button>
        ),
      },
    ];
    return (
      <Table
        items={movies}
        columns={columns}
        onSort={(sortColumn) => this.props.onSort(sortColumn)}
        sortColumn={this.props.sortColumn}
      ></Table>
    );
  }
}

export default MoviesTable;
