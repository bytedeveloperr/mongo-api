const collections = require("./collections");
const documents = require("./documents");

module.exports = async (app) => {
  app.get("/", async (request, reply) => {
    return "Welcome to mongo-rest";
  });

  app.register(collections, { prefix: "/collections" });
  // app.register(documents, { prefix: '/documents' })
};
