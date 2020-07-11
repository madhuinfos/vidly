import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genereService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Listgroup from "./common/listGroup";
import Searchbar from "./common/searchBar";
import auth from "../services/authService";

import _ from "lodash";
import { toast } from "react-toastify";

export default class Movies extends Component {
  state = {
    movies: [],
    generes: [],
    pageSize: 4,
    selectedPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const movies = await getMovies();
    const genres = await getGenres();
    const generes = [{ _id: "", name: "All Generes" }, ...genres];
    this.setState({ movies, generes });
  }

  render() {
    const { pageSize, selectedPage, selectedGenre, sortColumn } = this.state;

    const { sorted, pageItems } = this.getPagedItems();

    const user = auth.getCurrentUser();

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

            {user && (
              <button
                onClick={this.handleAddNewMovie}
                className="btn btn-primary m-2"
              >
                New Movie
              </button>
            )}

            <Searchbar
              query={this.state.searchQuery}
              onChange={(item) => this.handleSearchChange(item)}
            ></Searchbar>

            <MoviesTable
              movies={pageItems}
              user={user}
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
    const {
      pageSize,
      selectedPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let fileteredMovies = [];
    if (searchQuery) {
      fileteredMovies = this.state.movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      fileteredMovies =
        selectedGenre && selectedGenre._id
          ? this.state.movies.filter(
              (movie) => movie.genre.name === selectedGenre.name
            )
          : this.state.movies;
    }

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

  async deleteMovie(id) {
    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("the movie is already deleted");
    }

    this.setState({ movies: await getMovies() });
  }

  handleAddNewMovie = (e) => {
    this.props.history.push("/movies/new");
  };

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  }

  handleSearchChange(searchQuery) {
    this.setState({ searchQuery, selectedPage: 1, selectedGenre: null });
  }

  handleGenreClick(genre) {
    this.setState({ selectedGenre: genre, selectedPage: 1, searchQuery: "" });
  }

  handlePageChange(pageNo) {
    this.setState({ selectedPage: pageNo });
  }

  handleSort(sortColumn) {
    this.setState({ sortColumn });
  }
}
