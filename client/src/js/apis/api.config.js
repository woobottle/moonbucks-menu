import axios from "axios";
import { baseURL } from "../constants"; 

const API = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export { API };
