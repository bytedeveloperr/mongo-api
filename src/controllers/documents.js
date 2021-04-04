const JSONStream = require("JSONStream");
const Mongo = require("../Mongo");
const wrap_id = require("../utils/wrap_id");

module.exports = {
  async find(request, reply) {
    const { headers, params, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.query = query.query ? wrap_id(JSON.parse(query.query)) : {};
    query.options = query.options ? JSON.parse(query.options) : null;

    const cursor = await db
      .collection(params.name)
      .find(query.query, query.options);
    cursor
      .pipe(JSONStream.stringify())
      .pipe(reply.raw.setHeader("Content-Type", "application/json"));
    cursor.on("end", () => {
      cursor.close();
      mongo.close();
    });
  },

  async findOne(request, reply) {
    const { headers, params, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.query = query.query ? wrap_id(JSON.parse(query.query)) : {};
    query.options = query.options ? JSON.parse(query.options) : null;

    const document = await db
      .collection(params.name)
      .findOne(query.query, query.options);
    mongo.close();

    return document;
  },

  async updateOne(request, reply) {
    const { headers, params, query, body } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.filter = query.filter ? wrap_id(JSON.parse(query.filter)) : {};
    query.options = query.options ? JSON.parse(query.options) : null;

    const {
      result,
      modifiedCount,
      upsertedCount,
      matchedCount,
      upsertedId,
    } = await db
      .collection(params.name)
      .updateOne(query.filter, body, query.options);
    mongo.close();

    return { result, modifiedCount, upsertedCount, matchedCount, upsertedId };
  },

  async deleteOne(request, reply) {
    const { headers, params, query } = request;

    const mongo = new Mongo(headers.mongo);
    const db = await mongo.open();
    query.filter = query.filter ? wrap_id(JSON.parse(query.filter)) : {};
    query.options = query.options ? JSON.parse(query.options) : null;

    const { result, deletedCount } = await db
      .collection(params.name)
      .deleteOne(query.filter, query.options);
    mongo.close();
    return { result, deletedCount };
  },
};
