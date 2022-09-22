import request from "request";
import ApplicationError from "../utils/ApplicationError.js";

// TODO: Intercept all responses for data and time logging purposes
// TODO: Move from 'request' to a different package as 'request' is deprecated now. Possible alternatives 'axios', 'node-fetch'

/**
 * The base fetch method to get data from APIs
 * @param {object} param0
 * @param {string} param0.method Method of request. Eg. GET, POST, PUT, DELETE, PATCH.
 * @param {string} param0.base Base domain of the request. This is the part of the URL before the path.
 * @param {string} param0.path Path of the request.
 * @param {object} param0.data The GET/POST parameters for the request.
 * @param {object} param0.formData The form data for the request.
 * @param {object} param0.headers Custom headers that need to be part of the request.
 * @param {number} param0.timeout Timout of the request in milliseconds.
 * @param {number} param0.retryCount The number of times the request needs to be retried for success.
 * @return {Promise} Returns the promise object for the request.
 */
const Fetch = ({ method = "GET", base, path, data = {}, formData = {}, changeOrigin, headers = {} }) => {
  let requestPayloadType = "get";
  if (["POST", "PUT", "PATCH"].indexOf(method.toUpperCase()) > -1) {
    requestPayloadType = "post";
  }

  const requestData = {};
  if (Object.keys(formData).length > 0) {
    requestData.formData = formData;
  } else if (requestPayloadType === "post") {
    requestData.body = data;
    // if method is get body data send with request as query string
  } else if (requestPayloadType === "get" && Object.keys(data).length > 0) {
    requestData.qs = data;
  }
  const host = {};
  if (changeOrigin) {
    const urlComponents = new URL(base + path);
    host.host = urlComponents.host;
    host.origin = urlComponents.origin;
    host.referer = urlComponents.origin;
  }
  const requestHeaders = { ...headers, ...host };
  const requestEndpoint = base + path;
  const requestMethod = method.toUpperCase();
  const requestConfig = {
    url: requestEndpoint,
    method: requestMethod,
    headers: requestHeaders,
    ...requestData,
    json: true,
    gzip: true,
    followOriginalHttpMethod: true,
    time: true,
  };

  return new Promise((resolve, reject) => {
    request(requestConfig, function (err, httpResponse, body) {
      if (!err && (httpResponse.statusCode === 200 || httpResponse.statusCode === 201)) {
        resolve({
          data: body,
          statusCode: httpResponse.statusCode,
          headers: httpResponse.headers,
        });
      } else {
        reject(new ApplicationError({ error: err || body, type: body?.type || "", body: body }));
      }
    });
  });
};

export default Fetch;
