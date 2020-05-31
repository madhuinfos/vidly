import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

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

  componentDidMount() {
    console.log(this.props);
    const generes = getGenres();
    this.setState({ generes });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);

    if (movie === null) this.props.history.repalce("/not-found");

    const data = { ...this.state.data };
    data.generes = generes;

    this.setState({ data: this.mapToViewModel(movie) });
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

  doSubmit = (e) => {
    console.log("submitted", this.state);
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

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
