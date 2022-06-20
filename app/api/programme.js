import client from "./client";
const endpoint = "/api2022.php?a=1";

const getProgrammes = () => client.get(endpoint);

export default {
  getProgrammes,
};
