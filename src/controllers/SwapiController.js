import * as SwapiServices from "../services/SwapiServices.js";

export const getApiList = (req, res, next) => {
  return SwapiServices.getList({ ...req.body, headers: req.headers })
    .then((resp) => {
      res.locals.response = resp;
      next();
    })
    .catch((error) => {
      next(error);
    });
};
