import axios from "axios";


 const API = axios.create({ baseURL: "https://busy-duck-wear.cyclic.app/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export default API