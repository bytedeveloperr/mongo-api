const Mongo = require("../Mongo");

module.exports = {
  async listAll(request, reply) {
    const { headers, params, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.options = query.options ? JSON.parse(query.options) : null;
    const indexes = await db
      .collection(params.name)
      .listIndexes(query.options)
      .toArray();
    mongo.close();

    return indexes;
  },

  async create(request, reply) {
    const { headers, params, query, body } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.options = query.options ? JSON.parse(query.options) : null;
    const index = await db
      .collection(params.name)
      .createIndex(body.fields, query.options);
    mongo.close();

    return { created: true, index };
  },

  async drop(request, reply) {
    const { headers, params, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.options = query.options ? JSON.parse(query.options) : null;
    await db.collection(params.name).dropIndex(query.index, query.options);
    mongo.close();

    return { deleted: true };
  },

  async dropAll(request, reply) {
    const { headers, params, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.options = query.options ? JSON.parse(query.options) : null;
    await db.collection(params.name).dropIndexes(query.options);
    mongo.close();

    return { deleted: true };
  },

  async indexInformation(request, reply) {
    const { headers, params, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.options = query.options ? JSON.parse(query.options) : null;
    const index = await db
      .collection(params.name)
      .indexInformation(query.options);
    mongo.close();

    return index;
  },
};
