const collections = require("./collections");

module.exports = async (app) => {
  app.get("/", async (request, reply) => {
    return "Welcome to mongo-api";
  });

  app.register(collections, { prefix: "/collections" });
};
