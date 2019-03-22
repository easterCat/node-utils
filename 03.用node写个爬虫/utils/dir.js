let fs = require("fs");
let { remove } = require("./file");

module.exports = {
  mkdir,
  readdir,
  rmdir
};

function mkdir(path, options) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, options, err =>
      err === null ? resolve(path) : reject(err)
    );
  });
}

function readdir(path, options) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) =>
      err === null ? resolve(files) : reject(err)
    );
  });
}

function rmdir(path) {
  return new Promise(async (resolve, reject) => {
    let files = await readdir(path);

    files.forEach(async element => {
      let stat = fs.statSync(path + "/" + file);

      if (stat.isDirectory()) {
      } else {
        await remove();
      }
    });
    fs.rmdir(path, err => (err === null ? resolve(path) : reject(err)));
  });
}
