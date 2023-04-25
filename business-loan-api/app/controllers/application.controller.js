const db = require("../models");

const Application = db.application;

exports.initiate = (req, res) => {
  res.send({
    id: "some random application id",
  });
  /*
  For production, we will do some action like creating a unique application id etc
  */
};
