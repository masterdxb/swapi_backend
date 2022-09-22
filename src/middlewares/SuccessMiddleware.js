import get from "lodash/get.js";
// import Logger from '../utils/Logger';

function SuccessMiddleware(req, res, next) {
  // Logger.info('SUCCESS MIDDLEWARE');
  res.status(get(res, "locals.response.statusCode", 500)).send(get(res, "locals.response.data", {}));
}
export default SuccessMiddleware;
