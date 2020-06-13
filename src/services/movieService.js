import httpService from "./common/httpService";
import logger from "./common/loggerService";

import config from "../config.json";

function movieUrl(id) {
  return `${config.movieApiEndPoint}/${id}`;
}

export async function getMovies() {
  const response = await httpService.get(config.movieApiEndPoint);

  if (response && response.status === 200) {
    return response.data;
  }
  return [];
}

export async function getMovie(id) {
  return await httpService.get(movieUrl(id));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const data = { ...movie };
    delete data._id;
    return await httpService.put(movieUrl(movie._id), data);
  }
  delete movie._id;
  return await httpService.post(config.movieApiEndPoint, movie);
}

export async function deleteMovie(movieId) {
  return await httpService.delete(movieUrl(movieId));
}
