const Mongo = require("../Mongo");

module.exports = {
  async listAll(request, reply) {
    const { headers, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.openAdmin();
    const databases = await db.listDatabases();
    mongo.close();

    return databases;
  },

  async findOne(request, reply) {
    const { headers, query, params } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.openAdmin();
    const databases = await db.listDatabases();
    mongo.close();

    return databases.databases.find((db) => db.name == params.name);
  },

  async create(request, reply) {
    const { headers, query, body } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open(body.database);
    await db.createCollection(body.collection, body.options);
    mongo.close();

    return {
      created: true,
      database: body.database,
      collection: body.collection,
    };
  },
};
