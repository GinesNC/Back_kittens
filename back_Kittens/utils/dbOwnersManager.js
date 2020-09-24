const request = require('request');
const { GorestToken } = require('./dbconnect');

/**
 * Funcion interna para la api gorest.
 * @param {string} uri donde se lepasa que tiene que consultar
 * @param {int} page numero de pagina que se consulta. Si es null no consultará el numero de página
 * @param {callback} callback 
 */
function requestdata (uri,page, callback ){

    var url = ""
    if(!page)
        url = 'https://gorest.co.in/public-api' + uri + '?access-token=' + GorestToken
    else
        url = 'https://gorest.co.in/public-api' + uri + '?access-token=' + GorestToken + '&page=' + page

    request.get(url, function (err, response, body) {
        if (err) console.log(err)
       

        return callback(body);
})
}

/**
 * devuelve los 20 owners de la página indicada
 * 
 * @param {int} page numero de pagina
 * @param {callback} handleListOwners 
 */
function ListOwnersforPage(page, handleListOwners) {

    requestdata('/users', page , function (data) {
         
        return handleListOwners(data);
    })
}

/**
 * Devuelve la info del usuario junto con sus post
 * 
 * @param {int} id id usuario
 * @param {callback} handleInfoOwner 
 */


function InfoOwner(id , handleInfoOwner) {
   
    requestdata('/users/' + id, null, function (resp) {
        var resp_parse = JSON.parse(resp);
        var owner_info = {
            code: resp_parse.code,
            data: resp_parse.data
        };
        PostOwner(id, function (posts) {
            owner_info.data.posts = posts.data;
            return handleInfoOwner(owner_info);
        })
    } )
}

/** 
 *  Metodo para devolver todos los post que tiene asociado un owner
 * @param {int} id id perteneciente al usuairo
 * @param {callback} handlePostOwner 
 */

function PostOwner(id, handlePostOwner){
    
    requestdata('/users/' + id + '/posts?access-token=', null, function(resp_data_post){
        return handlePostOwner(JSON.parse(resp_data_post));
    })
   
}



module.exports = {

    ListOwnersforPage,
    InfoOwner,
    PostOwner

}