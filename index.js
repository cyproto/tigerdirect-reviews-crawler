const cluster = require("cluster");
const { cpus } = require("os");
const process = require("process");
const express = require("express");

const coreCount = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let index = 0; index < coreCount; index++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  app.use(express.json());
  app.use("/", require("./routes/router"));
  app.listen(8000, console.log("App started on worker " + process.pid));
}
