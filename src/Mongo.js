const { MongoClient, ObjectId } = require("mongodb");

class Mongo {
  constructor(
    uri,
    options = { useUnifiedTopology: true, useNewUrlParser: true }
  ) {
    this.uri = uri;
    this.options = options;
    this.client = new MongoClient(this.uri, this.options);
  }

  async connect() {
    return await this.client.connect();
  }

  async open(dbname) {
    const conn = await this.connect();
    if (!dbname) {
      return this.client.db(conn.s.options.dbName);
    }
    return this.client.db(dbname);
  }

  async openAdmin(dbname) {
    const conn = await this.connect();
    if (!dbname) {
      return this.client.db(conn.s.options.dbName).admin();
    }
    return this.client.db(dbname).admin();
  }

  async close() {
    return this.client.close();
  }
}

module.exports = Mongo;
