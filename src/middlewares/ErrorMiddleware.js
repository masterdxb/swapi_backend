function errorHandler(error, req, res, next) {
  res.set("Content-Type", (error.headers && error.headers["content-type"]) || "application/json");
  const data = error.data || { message: error.message };
  res.status(error.status || 500).send(data);
}
export default errorHandler;
