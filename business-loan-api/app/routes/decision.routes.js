module.exports = (app) => {
  const decision = require("../controllers/decision.controller.js");

  const router = require("express").Router();

  router.post("/requestOutcome", decision.requestOutcome);
  app.use("/api/decision", router);
};
