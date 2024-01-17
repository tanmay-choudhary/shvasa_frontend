import { API_URL } from "../Commons";
import axios from "axios";
const apiUrl = API_URL;

const MakeApiCall = (method, url, payload = null, headers = {}) => {
  //console.log(`${apiUrl}${url}`);
  const obj = {
    method,
    url: `${apiUrl}${url}`,
    data: payload,
    headers,
  };
  return new Promise((resolve, reject) => {
    axios(obj)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log("Error making API call:", error);
        reject(error);
      });
  });
};

export default MakeApiCall;
