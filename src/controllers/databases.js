const Mongo = require("../Mongo");

module.exports = {
  async listAll(request, reply) {
    const { headers, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.openAdmin();
    const databases = await db.listDatabases()
    mongo.close();

    return databases;
  }
};
