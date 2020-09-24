var mysql = require("mysql")
var db = mysql.createConnection({
    host: 'localhost',
    user: 'pixomatic',
    password: 'pixomaticpass1.A',
    database: 'pixomaticgnc'
})


// db.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

const GorestToken = 'f38ed86064790e8126feab64bae5fc1ea43279dc78fd51214a0759367cf8a44b';

//
/**
 * Funcion declarada para el uso de querys y no repetir código.
 * 
 * @param {String} query Query SQL que se ejecutará para la correcta petición
 * @param {Array} data  Array de datos que se insertarán, se actualizarán o condiciones de busqueda
 * @param {callback} callback funcion asincrona para cuando se complete la operación
 */
function queryexecution(query, data, callback) {
    var response_json = { code: 200, status: "OK" }

    db.query(query, data, function (err, result, field) {

        // Si la query es un select se añade el resultado en data
        if (query.substring(0, 6) === "SELECT") {
            response_json.data = result;
        }
        if (query.substring(0, 6) === "UPDATE" && result.affectedRows == 0) {
            response_json.code = 304;
            response_json.status = 'Not Modified';
        }

        if (!err) {
            
            return callback(response_json);
        }
        else {
            console.log(err);
            return callback({ code: 400, status: "ERROR", error: { error_code: err.code, error_info: err.sqlMessage } });
        }
    })

}


module.exports = { db, GorestToken, queryexecution};