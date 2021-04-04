const { ObjectId } = require("mongodb");

module.exports = (obj) => {
  for (o in obj) {
    if (o == "_id") {
      obj[o] = ObjectId(obj[o]);
    }
  }

  return obj;
};
