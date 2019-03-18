let fs = require("fs");

module.exports = {
  write: function(filename, data, options) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, data, options, err =>
        err === null ? resolve(filename) : reject(err)
      );
    });
  }
};
