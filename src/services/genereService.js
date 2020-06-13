import httpService from "./common/httpService";
import config from "../config.json";

export async function getGenres() {
  const result = await httpService.get(config.genereApiEndPoint);
  return result.data;
}
