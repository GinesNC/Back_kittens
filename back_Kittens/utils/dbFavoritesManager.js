
var { queryexecution } = require("./dbconnect");

function InsertFavorite ( companieid, ownerid, handleInsertFavorite){
    var query_insert_favorite = "INSERT INTO favorites(owner_id, companie_id) VALUES (?,?);"

    queryexecution(query_insert_favorite, [ownerid, companieid], function (exec_result){
        return handleInsertFavorite(exec_result);
    })
    
}

module.exports = {InsertFavorite};