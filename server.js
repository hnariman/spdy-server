const express = require("express");
const spdy = require("spdy");
const fs = require("fs");

const { promisify } = require("util");

const readFile = promisify(fs.readFile);

const app = express();

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    if (res.push) {
      ["./infosec.jpg"].forEach(async (file) => {
        res.push(file, {}).end(await readFile(`./${file}`));
      });
    }
    res.writeHead(200);
    res.end(await readFile("index.html"));
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

spdy
  .createServer(
    {
      key: fs.readFileSync("./host.key"),
      cert: fs.readFileSync("./host.cert"),
    },
    app
  )
  .listen(8000, (err) => {
    if (err) throw new Error(err);
    console.log("server is running on 8000");
  });
