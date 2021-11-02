const fs = require("fs");
const fsPromises = require("fs").promises;

const pathToCopy = `${__dirname}/files`;

fsPromises
  .mkdir(`${__dirname}/files-copy`, { recursive: true })
  .then((result) => {
    fs.readdir(pathToCopy, (err, files) => {
      files.forEach((item) => {
        fsPromises
          .copyFile(`${pathToCopy}/${item}`, `${__dirname}/files-copy/${item}`)
          .catch((err) => {
            console.log(err);
          });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
