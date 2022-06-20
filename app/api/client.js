import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://appli.ovh/off/app",
});

export default apiClient;
