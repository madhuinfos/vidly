import http from "./common/httpService";
import config from "../config.json";

export async function addUser(user) {
  return await http.post(config.userApiEndPoint, user);
}
