const fs = require("fs");
const mysql = require("mysql");
const path_dir = "D:\\data\\wwwroot\\xiezhenji.web\\static\\mrw\\";
const connection = mysql.createConnection({
  host: "192.168.0.164",
  port: "3306",
  user: "xiezhenji",
  password: "iJAuzTbdrDJDswjPN6!*M*6%Ne",
  database: "xiezhenji"
});

module.exports = {
  insertImg
};

function insertImg() {
  connection.connect();

  let files = fs.readdirSync(path_dir, {
    encoding: "utf-8"
  });

  files.forEach((file, index) => {
    let cover_img_path = `/mrw/mrw_${index + 1}/image_1`;

    insert([
      "美女",
      file,
      Number(files.length),
      file,
      cover_img_path,
      `mrw/mrw_${index + 1}`,
      `mrw_${index + 1}`
    ]);
  });
}

function insert(arr) {
  let sql = `INSERT INTO photo_album_collect(tags,name,num,intro,cover_img,dir,new_name) VALUES(?,?,?,?,?,?,?)`;
  let sql_params = arr;

  connection.query(sql, sql_params, function(err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      return;
    }
    console.log("--------------------------SELECT----------------------------");
    console.log(result);
    console.log(
      "------------------------------------------------------------\n\n"
    );
  });
}
