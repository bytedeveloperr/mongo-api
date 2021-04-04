const collections = require("../controllers/collections");
const documents = require("../controllers/documents");
const indexes = require("../controllers/indexes");

module.exports = async (app) => {

  app.get("/", collections.listAll);
  app.post("/", collections.create);
  app.put("/:name", collections.rename);
  app.delete("/:name", collections.drop);
  app.get("/:name/stats", collections.stats);

  app.post("/:name/insert-one", documents.insertOne);
  app.post("/:name/insert-many", documents.insertMany);
  app.get("/:name/find", documents.find);
  app.get("/:name/find-one", documents.findOne);
  app.put("/:name/update-one", documents.updateOne);
  app.put("/:name/update-many", documents.updateMany);
  app.delete("/:name/delete-one", documents.deleteOne);
  app.delete("/:name/delete-many", documents.deleteMany);

  app.get("/:name/indexes", indexes.listAll)
  app.post("/:name/create-index", indexes.create)
  app.delete("/:name/drop-index", indexes.drop)
  app.delete("/:name/drop-indexes", indexes.dropAll)
  app.get("/:name/index-information", indexes.indexInformation)

};
