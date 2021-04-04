const databases = require("../controllers/databases");
const documents = require("../controllers/documents");

module.exports = async (app) => {
  app.get("/", databases.listAll);
};
