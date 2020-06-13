import axios from "axios";
import { toast } from "react-toastify";
import logger from "./loggerService";

axios.interceptors.response.use(null, (error) => {
  console.log(error);
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.logError(error);
    toast.error("un expected error during HTTP calls");
  }
});

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch,
  put: axios.put,
};
