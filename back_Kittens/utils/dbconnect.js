var mysql = require("mysql")
var db = mysql.createConnection({
    host: 'localhost',
    user: 'pixomatic',
    password: 'pixomaticpass1.A',

    database: 'pixomaticgnc'
})


db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const Bearertoken = 'f38ed86064790e8126feab64bae5fc1ea43279dc78fd51214a0759367cf8a44b';

module.exports = {db, Bearertoken};