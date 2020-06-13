import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genereService";
import { saveMovie, getMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      selectedGenere: "",
      stockNo: "",
      rating: "",
    },
    generes: [],
    errors: {},
  };

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string().required().label("Title"),
    selectedGenere: Joi.string().label("Genere"),
    stockNo: Joi.number().required().label("Name"),
    rating: Joi.number().required().label("Rate"),
  };

  async componentDidMount() {
    await this.pouplateGenres();

    await this.getMovie();
  }

  async pouplateGenres() {
    const generes = await getGenres();
    this.setState({ generes });
  }

  async getMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const movie = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie.data) });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      selectedGenere: movie.genre._id,
      stockNo: movie.numberInStock,
      rating: movie.dailyRentalRate,
    };
  }

  doSubmit = async (e) => {
    const movie = this.mapToModel(this.state.data);
    console.log("submitted", movie);
    await saveMovie(movie);
    this.props.history.push("/movies");
  };

  mapToModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.selectedGenere,
      numberInStock: movie.stockNo,
      dailyRentalRate: movie.rating,
    };
  }

  render() {
    return (
      <div>
        <h1>Register</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelectList("selectedGenere", this.state.generes, "Genre")}
          {this.renderInput("stockNo", "Number in Stock", "number")}
          {this.renderInput("rating", "Rate", "number")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
