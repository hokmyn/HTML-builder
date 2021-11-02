const fs = require("fs");
const path = require("path");

const pathToCheck = `${__dirname}/styles`;
let writeableStream = fs.createWriteStream(
  `${__dirname}/project-dist/bundle.css`
);

fs.readdir(pathToCheck, (err, files) => {
  files.forEach((item) => {
    if (path.extname(item) === ".css") {
      let readableStream = fs.createReadStream(
        `${__dirname}/styles/${item}`,
        "utf8"
      );
      readableStream.pipe(writeableStream, { end: false });
    }
  });
});
