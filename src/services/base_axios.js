import axios from "axios";

const instance = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //return Promise.reject(error);
    let res = {};
    if (error.message) {
      res.data = error.response.data;
      res.status = error.response.status;
      res.header = error.response.header;
    }
    return res;
  }
);

export default instance;
