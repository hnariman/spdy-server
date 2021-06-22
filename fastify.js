const fs = require("fs");
const { staticServe } = require("fastify-auto-push");
const path = require("path");
const fastify = require('fastify');
//const requestTiming = require('fastify-request-timing');

const STATIC_DIR = path.join(__dirname, ".");
const PORT = 8000;

(async () => {
  const server = fastify({
    http2: true,
    https: {
      key: fs.readFileSync("./host.key"),
      cert: fs.readFileSync("./host.cert"),
    },
  });
//server.register(requestTiming);
  server.register(staticServe, { root: STATIC_DIR });

  await server.listen(PORT);

  console.log(`Listening on port ${PORT}`);
})().catch(console.error) 
