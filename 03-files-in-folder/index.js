const fs = require("fs");
const path = require("path");

const pathToCheck = `${__dirname}/secret-folder`;

fs.readdir(pathToCheck, (err, files) => {
  files.forEach((item) => {
    fs.stat(`${pathToCheck}/${item}`, (err, stats) => {
      if (!stats.isDirectory()) {
        console.log(
          `${path.basename(item, path.extname(item))} - ${path
            .extname(item)
            .slice(1)} - ${(stats.size / 1024).toFixed(2)}kb`
        );
      }
    });
  });
});
