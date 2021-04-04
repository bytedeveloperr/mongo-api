const collections = require("../controllers/collections");
const documents = require("../controllers/documents");

module.exports = async (app) => {
  app.get("/", collections.listAll);
  app.post("/", collections.create);
  app.put("/:name", collections.rename);
  app.delete("/:name", collections.drop);

  app.post("/:name/insertone", documents.insertOne);
  app.post("/:name/insertmany", documents.insertMany);
  app.get("/:name/find", documents.find);
  app.get("/:name/findone", documents.findOne);
  app.put("/:name/updateone", documents.updateOne);
  app.put("/:name/updatemany", documents.updateMany);
  app.delete("/:name/deleteone", documents.deleteOne);
  app.delete("/:name/deletemany", documents.deleteMany);
};
