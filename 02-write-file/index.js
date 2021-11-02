const fs = require("fs");
const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

let writeableStream = fs.createWriteStream(`${__dirname}/output.txt`);

console.log("Hello! Type your text below...");

rl.on("line", function (line) {
  if (line === "exit") {
    console.log("The end of input");
    rl.close();
  } else {
    writeableStream.write(`${line}\n`);
  }
});

rl.on("SIGINT", function () {
  process.emit("SIGINT");
});

process.on("SIGINT", function () {
  console.log("The end of input");
  process.exit();
});
