const JSONStream = require("JSONStream");
const Mongo = require("../Mongo");

module.exports = {
  async listAll(request, reply) {
    const { headers, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.options = query.options ? JSON.parse(query.options) : null;
    const cursor = await db.listCollections({}, query.options);
    cursor
      .pipe(JSONStream.stringify())
      .pipe(reply.raw.setHeader("Content-Type", "application/json"));
    cursor.on("end", () => {
      cursor.close();
      mongo.close();
    });
  },

  async findOne(request, reply) {
    const { headers, query, params } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.options = query.options ? JSON.parse(query.options) : null;

    const collections = await db.listCollections({}, query.options).toArray();
    mongo.close();

    return collections.find((coll) => coll.name == params.name);
  },

  async create(request, reply) {
    const { headers, body, query } = request;

    const mongo = await new Mongo(headers.mongo);
    const db = await mongo.open();
    query.options = query.options ? JSON.parse(query.options) : null;
    await db.createCollection(body.name, query.options);
    mongo.close();

    return { created: true, collection: body.name };
  },

  async rename(request, reply) {
    const { headers, body, query } = request;

    const mongo = await new Mongo(headers.mongo);
    const db = await mongo.open();
    query.options = query.options ? JSON.parse(query.options) : null;
    await db.renameCollection(body.from, body.to, query.options);
    mongo.close();

    return { updated: true, name: body.to };
  },

  async drop(request, reply) {
    const { headers, params, query } = request;

    const mongo = await new Mongo(headers.mongo);
    const db = await mongo.open();
    query.options = query.options ? JSON.parse(query.options) : null;
    await db.dropCollection(params.name, query.options);
    mongo.close();

    return { deleted: true };
  },

  async stats(request, reply) {
    const { headers, params, query } = request;

    const mongo = await new Mongo(headers.mongo);
    const db = await mongo.open();

    query.options = query.options ? JSON.parse(query.options) : null;
    const stats = await db.stats(query.options);
    mongo.close();

    return stats;
  },
};
