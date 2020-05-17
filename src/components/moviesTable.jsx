import React from "react";
import Like from "./common/like";

const MoviesTable = (props) => {
  const { movies, onLikeMovie, onDeleteMovie } = props;
  return (
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
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like
                onClick={() => onLikeMovie(movie)}
                liked={movie.liked}
              ></Like>
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDeleteMovie(movie)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
