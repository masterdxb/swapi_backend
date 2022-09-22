import util from "util";
import responseTime from "response-time";

const RouteLoggerMiddleware = () => {
  return [
    responseTime((req, res, time) => {
      const url = req.originalUrl.split("?")[0];

      if (res.statusCode >= 200 && res.statusCode < 400) {
      } else {
        if (req.method === "GET" || req.method === "DELETE") {
          const qs = util.inspect(req.query, {
            compact: true,
            breakLength: Infinity,
            depth: 4,
            maxArrayLength: Infinity,
          });
        } else {
          const data = util.inspect(req.body, {
            compact: true,
            breakLength: Infinity,
            depth: 4,
            maxArrayLength: Infinity,
          });
          Logger.error(`[${req.id}] Data: ${data}`);
        }
      }
    }),
  ];
};

export default RouteLoggerMiddleware;
