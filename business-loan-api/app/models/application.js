module.exports = (sequelize, Sequelize) => {
  const Application = sequelize.define("application", {
    // ... properties definition
  });

  return Application;
};
