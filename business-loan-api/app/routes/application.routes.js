module.exports = (app) => {
  const application = require("../controllers/application.controller.js");

  const router = require("express").Router();

  router.get("/initiate", application.initiate);
  app.use("/api/application", router);
};
