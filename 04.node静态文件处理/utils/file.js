let fs = require("fs");

module.exports = {
  write: function(filename, data, options) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, data, options, err =>
        err === null ? resolve(filename) : reject(err)
      );
    });
  },
  append: function(filename, data, options) {
    return new Promise((resolve, reject) => {
      fs.appendFile(filename, data, options, err =>
        err === null ? resolve(filename) : reject(err)
      );
    });
  },
  remove: function(filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, err =>
        err === null ? resolve(filePath) : reject(err)
      );
    });
  },
  rename: function(oldPath, newPath) {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, err =>
        err === null ? resolve([oldPath, newPath]) : reject(err)
      );
    });
  },
  stat: function(filePath) {
    return new Promise((resolve, reject) => {
      fs.stat(filePath, (err, stats) => {
        err === null ? resolve(stats) : reject(err);
      });
    });
  }
};
