const fs = require("fs");
const mysqld = require("mysql");
const _ = require("lodash");

const data = fs.readFileSync("data.json", "utf8");

let con = mysqld.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

con.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("connected");
});

const jsonData = JSON.parse(data);
console.log(jsonData.length);
_.map(jsonData, function (all) {
  _.map(all.states, function (state) {
    _.map(state.cities, function (city){
      let id=city.id;
      let state_id=state.id;
      let country_id = parseInt(all.id);
      let name=city.name;
      const query = `INSERT INTO cities (id,state_id, country_id, name) VALUES (?,?,?,?)`;
    const values = [id,state_id, country_id, name];
    con.query(query, values, (err) => {
      if (err) throw err;
      console.log(name);
    });
    })
  });
});
