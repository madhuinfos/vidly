import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Listgroup from "./common/listGroup";

export default class Movies extends Component {
  state = {
    movies: [],
    generes: [],
    pageSize: 4,
    selectedPage: 1,
    selectedGenre: null,
  };

  componentDidMount() {
    const generes = [{ name: "All Generes" }, ...getGenres()];
    this.setState({ movies: getMovies(), generes });
  }

  render() {
    const { pageSize, selectedPage, movies, selectedGenre } = this.state;

    const fileteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => movie.genre.name === selectedGenre.name)
        : movies;

    const pageItems = paginate(fileteredMovies, selectedPage, pageSize);

    return (
      <div className="row">
        <div className="col-3 m-2 ">
          <br />
          <Listgroup
            onItemSelect={(genre) => this.handleGenreClick(genre)}
            items={this.state.generes}
            selectedItem={selectedGenre}
          ></Listgroup>
        </div>

        <div className="col">
          <br />
          <h3>{this.getMessage(fileteredMovies)}</h3>
          <br />

          <MoviesTable
            movies={pageItems}
            onLikeMovie={(movie) => this.handleLike(movie)}
            onDeleteMovie={(movie) => this.deleteMovie(movie._id)}
          ></MoviesTable>

          <Pagination
            itemsCount={fileteredMovies.length}
            pageSize={pageSize}
            selectedPage={selectedPage}
            onPageChange={(page) => this.handlePageChange(page)}
          ></Pagination>
        </div>
      </div>
    );
  }

  getMessage(fileteredMovies) {
    return fileteredMovies.length < 1
      ? "There are no movies in Database"
      : `Showing ${fileteredMovies.length} movies in the database`;
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

  handleGenreClick(genre) {
    this.setState({ selectedGenre: genre, selectedPage: 1 });
  }

  handlePageChange(pageNo) {
    this.setState({ selectedPage: pageNo });
  }
}
