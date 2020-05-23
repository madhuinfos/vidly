import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Listgroup from "./common/listGroup";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: [],
    generes: [],
    pageSize: 4,
    selectedPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const generes = [{ _id: "", name: "All Generes" }, ...getGenres()];
    this.setState({ movies: getMovies(), generes });
  }

  render() {
    const { pageSize, selectedPage, selectedGenre, sortColumn } = this.state;

    const { sorted, pageItems } = this.getPagedItems();

    return (
      <div>
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
            <h3>{this.getMessage(sorted)}</h3>
            <br />

            <MoviesTable
              movies={pageItems}
              sortColumn={sortColumn}
              onLikeMovie={(movie) => this.handleLike(movie)}
              onDeleteMovie={(movie) => this.deleteMovie(movie._id)}
              onSort={(sortColumn) => this.handleSort(sortColumn)}
            ></MoviesTable>

            <Pagination
              itemsCount={sorted.length}
              pageSize={pageSize}
              selectedPage={selectedPage}
              onPageChange={(page) => this.handlePageChange(page)}
            ></Pagination>
          </div>
        </div>
      </div>
    );
  }

  getPagedItems() {
    const { pageSize, selectedPage, selectedGenre, sortColumn } = this.state;

    const fileteredMovies =
      selectedGenre && selectedGenre._id
        ? this.state.movies.filter(
            (movie) => movie.genre.name === selectedGenre.name
          )
        : this.state.movies;
    const sorted = _.orderBy(
      fileteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const pageItems = paginate(sorted, selectedPage, pageSize, sorted);
    return { sorted, pageItems };
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

  handleSort(sortColumn) {
    this.setState({ sortColumn });
  }
}
