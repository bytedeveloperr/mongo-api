const collections = require("./collections");
const databases = require("./databases");

module.exports = async (app) => {
  app.get("/", async (request, reply) => {
    return "Welcome to mongo-api";
  });

  app.register(collections, { prefix: "/collections" });
  app.register(databases, { prefix: "/databases" });
};
