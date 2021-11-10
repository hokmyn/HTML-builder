const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const pathToComponents = `${__dirname}/components`;
let tmplContent = "";
const pathToCheck = `${__dirname}/styles`;
const pathToCopy = `${__dirname}/assets`;

fsPromises
  .mkdir(`${__dirname}/project-dist`, { recursive: true })
  .catch((err) => {
    console.log(err);
  });

fsPromises
  .mkdir(`${__dirname}/project-dist/assets`, { recursive: true })
  .then((result) => {
    fs.readdir(pathToCopy, (err, files) => {
      if (err) throw err;
      files.forEach((dir) => {
        fsPromises
          .mkdir(`${__dirname}/project-dist/assets/${dir}`, {
            recursive: true,
          })
          .then((res) => {
            if (res == undefined) {
              fs.readdir(
                `${__dirname}/project-dist/assets/${dir}`,
                (err, files) => {
                  files.forEach((item) => {
                    fs.unlink(
                      `${__dirname}/project-dist/assets/${dir}/${item}`,
                      (err) => {
                        if (err) throw err;
                      }
                    );
                  });
                }
              );
            }
            fs.readdir(`${__dirname}/assets/${dir}`, (err, files) => {
              if (err) throw err;
              files.forEach((item) => {
                fsPromises
                  .copyFile(
                    `${__dirname}/assets/${dir}/${item}`,
                    `${__dirname}/project-dist/assets/${dir}/${item}`
                  )
                  .catch((err) => {
                    console.log(err);
                  });
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

let writeableStream = fs.createWriteStream(
  `${__dirname}/project-dist/style.css`
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

fs.readFile(`${__dirname}/template.html`, "utf8", (err, data) => {
  if (err) throw err;
  tmplContent = data;
});

fs.readdir(pathToComponents, (err, files) => {
  if (err) throw err;
  files.forEach((item, index) => {
    fs.readFile(`${pathToComponents}/${item}`, "utf8", (err, data) => {
      if (err) throw err;
      tmplContent = tmplContent.replace(
        `{{${path.basename(item, path.extname(item))}}}`,
        data
      );
      if (index === 2) {
        fs.writeFile(
          `${__dirname}/project-dist/index.html`,
          tmplContent,
          (err) => {
            if (err) throw err;
          }
        );
      }
    });
  });
});
