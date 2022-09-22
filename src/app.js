import express from "express";
import cors from "cors";
import expressRequestId from "express-request-id";
import * as routes from "./routes/index.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import SuccessMiddleware from "./middlewares/SuccessMiddleware.js";
import RouteLoggerMiddleware from "./middlewares/RouteLoggerMiddleware.js";

export default () => {
  console.log("something");
  const app = express();
  // app.use(expressRequestId());

  app.use(cors());
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ limit: "2mb", extended: true, parameterLimit: 50000 }));
  app.use(RouteLoggerMiddleware());
  app.get("/", (req, res) => {
    res.status(200).send();
  });
  console.log("Swapi API Gateway run on localhost:3002");
  routes.configure(app);
  app.use(ErrorMiddleware);
  app.use(SuccessMiddleware);
  app.listen(3002);
};
