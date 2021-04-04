const Mongo = require("../Mongo");

module.exports = {
  async listAll(request, reply) {
    const { headers, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    const collections = await db.listCollections({}, query.options).toArray();
    mongo.close();

    return collections;
  },

  async create(request, reply) {
    const { headers, body } = request;

    const mongo = await new Mongo(headers.mongo);
    const db = await mongo.open();
    await db.createCollection(body.name, body.options);
    mongo.close();

    return { created: true, collection: body.name };
  },

  async rename(request, reply) {
    const { headers, body } = request;

    const mongo = await new Mongo(headers.mongo);
    const db = await mongo.open();
    await db.renameCollection(body.from, body.to, body.options);
    mongo.close();

    return { updated: true, name: body.to };
  },

  async drop(request, reply) {
    const { headers, params } = request;

    const mongo = await new Mongo(headers.mongo);
    const db = await mongo.open();
    await db.dropCollection(params.name, body.options);
    mongo.close();

    return { deleted: true };
  },
};
