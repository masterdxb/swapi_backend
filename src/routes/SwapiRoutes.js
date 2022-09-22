import { getApiList } from "../controllers/SwapiController.js";
const SwapiRoutes = (app) => {
  app.get("/api/getapilist", getApiList);
  app.post("/api/getapiData", getApiList);
};

export default SwapiRoutes;
