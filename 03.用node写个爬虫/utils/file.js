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
  remove: function(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, err => (err === null ? resolve(path) : reject(err)));
    });
  },
  rename: function(oldPath, newPath) {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, err =>
        err === null ? resolve([oldPath, newPath]) : reject(err)
      );
    });
  }
};
