import Fetch from "../utils/Fetch.js";
export const getList = ({ headers = {}, apiPath = "" }) => {
  // console.log(apiPath);
  return Fetch({
    method: "GET",
    base: "https://swapi.dev/api",
    path: apiPath,
    headers: {},
  });
};
