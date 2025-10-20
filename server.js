require("dotenv").config();

const path = require("path");
const fastify = require("fastify")({ logger: true });
const fastifyEnv = require("@fastify/env");

//register plugins
fastify.register(require("@fastify/cors"));
fastify.register(require("@fastify/sensible"));
fastify.register(require("@fastify/multipart"));
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "uploads"),
  prefix: "/uploads/", // optional: default '/'
});
fastify.register(require("@fastify/env"), {
  dotenv: true,
  schema: {
    type: "object",
    required: ["PORT", "MONGODB_URI", "JWT_TOKEN"],
    properties: {
      PORT: { type: "string", default: 3000 },
      MONGODB_URI: { type: "string" },
      JWT_TOKEN: { type: "string" },
    },
  },
});

//register custom plugins
fastify.register(require("./plugins/mongodb"));
fastify.register(require("./plugins/jwt"));

//register routes
fastify.register(require("./routes/authRoute"), { prefix: "/api/auth" });
fastify.register(require("./routes/thumbnail"), { prefix: "/api/thumbnail" });

/* 
const schema = {
    type: "object",
    required: ["PORT"],
    properties: {
        PORT: {
            type: "string",
            default: 3000,
        },
    },
};

const options = {
    confKey: "config", // optional, default: 'config'
    schema: schema,
    data: data, // optional, default: process.env
};

fastify.register(fastifyEnv, options).ready((err) => {
    if (err) console.error(err);
    
    console.log(fastify.config); // or fastify[options.confKey]
    console.log(fastify.getEnvs());
    // output: { PORT: 3000 }
});
*/

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

//test database conection
fastify.get("/test-db", async (request, reply) => {
  try {
    const mongoose = fastify.mongoose;
    const connectionStatus = mongoose.connection.readyState;

    let status = "";
    switch (connectionStatus) {
      case 0:
        status = "disconnected";
        break;
      case 1:
        status = "connected";
        break;
      case 2:
        status = "connecting";
        break;
      case 3:
        status = "disconnecting";
        break;
      default:
        status = "unknown";
        break;
    }
    reply.send({ database: status });
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: "Failed to test the database" });
    process.exit(1);
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT });
    fastify.log.info(
      `Server is running at https://localhost:${process.env.PORT}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
