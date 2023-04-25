module.exports = (app) => {
  const accountProvider = require("../controllers/accountProvider.controller.js");
  const router = require("express").Router();

  router.get("/fetchBalanceSheet", accountProvider.fetchBalanceSheet);
  router.get("/fetchProviders", accountProvider.fetchProviders);
  app.use("/api/accountProvider", router);
};
