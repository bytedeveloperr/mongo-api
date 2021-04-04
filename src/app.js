const fastify = require("fastify");

const cors = require("fastify-cors");
const formbody = require("fastify-formbody");
const helmet = require("fastify-helmet");

const routes = require("./routes");

const app = fastify({ logger: true, disableRequestLogging: true });

app.register(cors);
app.register(helmet);
app.register(formbody);

app.register(routes);

module.exports = app;
