var {queryexecution} = require("./dbconnect");
var moment = require("moment");


/**
 * Método para insertar en la base de datos los datos de las empresas.
 * Si se intenta insertar un CIF repetido se devolverá el error de que no se puede insertar, debido a que 
 * ese dato ha sido declarado como UNIQUE en la tabla companies de la base de datos pixomaticgnc.
 * 
 * También se inserta un token al azar de 8 caracteres.
 * 
 * @param {Array} data Array con los dtos que se insertarán
 * @param {callback} handleInsert funcion callback
 */
function InsertCompanie (data, handleInsert){
    var query_insert = "INSERT INTO companies(name, CIF, shortdesc, description, email, CCC, date, status, logo, token) values(?,?,?,?,?,?,?,?,?,?);"
   
    queryexecution(query_insert, [data.name,
        data.CIF,
        data.shortdesc,
        data.description,
        data.email,              
        data.CCC,
        data.date,
        data.status,
        data.logo,
        Math.random().toString(36).substring(6) //para token aleatorio en base 36 considera a-z y de 0-9
        ], function (response_insert) {
            return handleInsert(response_insert);
    });

   
}

// Con el auth falta que muestre si es el token o no --- 
/**
 * Metodo usado para editar empresa, si se reciben datos que no se pueden modificar devuelve el mensaje de error.
 *  El id se usa para identificar a la empresa, así como el token en cuestión.
 * 
 * Aunque se pasen esos datos no se realiza ninguna modificacion en la tabla.
 * 
 * @param {Array} data Array con los datos que se modificaran
 * @param {callback} handleUpdate 
 */
function UpdateCompanie(data, handleUpdate){
    
    if (!data.authorization || !data.id){
        return handleUpdate({ error: "Imposible modificar falta id o token." });
    }
    else{
        if (data.CIF || data.date || data.email || !data.authorization || !data.id) {
            return handleUpdate({ error: "Imposible acceder a esos datos para modificar. Contacte con el administrador"});
        }

        else {
            var keys_json_data = Object.keys(data); //nombre de los campos que se modifican
            var key = "" ;                          //para asignar el nombre y no arrastras keys_json_data[i]
            var columns = ""                        //las columnas que se modificaran en el SQL.
            var values_json_data =[];               //aqui iran los datos que se modificaran o necesarios para modificar el registro correcto


            for (i=0; i< keys_json_data.length; i++) {
                
                key = keys_json_data[i] 

                if (key !== 'id' && key !== 'authorization'){
                    columns = columns + key + "=?, " //Se almacenan todas las columnas que se van a modificar, excepto id y token.
                    
                    values_json_data.push(data[key])
                }
                

                
            }
            //añadir id y token al final
            values_json_data[keys_json_data.length-2]=data.id
            values_json_data[keys_json_data.length - 1] = data.authorization
            if (values_json_data.length > 2){
                //la funcion slice se utiliza para eliminar la coma (,) de la última key. Para que no se produzca el error: ER_PARSE_ERROR en mysql
                var query_update = "UPDATE companies SET "+ columns.slice(0,-2) +" WHERE id=? and token = ? ;"

                queryexecution(query_update, values_json_data,function(response_update){
                    return handleUpdate(response_update);
                })
            }
            else return handleUpdate({ error: "No hay datos para modidcar" });
        }
    }
}

/**
 *  Funcion para buscar y listar las empresas
 * @param {callback} handleIndexAll 
 */
function ListAllCompanies (handleIndexAll){
    

    var query_list_all = "SELECT name, shortdesc, logo, status  from companies"

    queryexecution(query_list_all, [], function (resp_lis_all) {
        return handleIndexAll(resp_lis_all);
    })
}
/**
 *  Funcion para buscar y listar las empresas  por paginas.
 * Si se recibe una pagina en la que no existen datos se devuelve el error : No existen tantos datos
 * @param {callback} handleIndexAll
 */
function ListPageCompanies(page,handleListPage){
       
    var query_list_page = "SELECT id, name, shortdesc, email, logo, status  from companies LIMIT ?,?" 
    var init_page = (page - 1) * 20 ; "devuelve de la 0 a 19 - es decir 20 elementos"
    var fin_page = page * 20 - 1; 

    queryexecution(query_list_page, [init_page, fin_page], function( resp_list_page){
        if (resp_list_page.data.length > 0)
            handleListPage(resp_list_page);
        else
            handleListPage({code: 404, error: "No esxisten tantos elementos"});
    })
}


/**
 * Funcion para buscar, si no llega a 3 elementos mínimo se almacenara en el log como peticion potencialmente peligrosa.
 * 
 * @param {String} tosearch String que se buscará en el campo description, devuelve tantas como coincidencias haya
 * @param {callback} handleSearch 
 */
function SearchCompanie(tosearch, handleSearch){
    var query_search = "SELECT name, description, email, logo, status  from companies where description LIKE ? ;"

    queryexecution(query_search, ['%' + tosearch + '%'], function (resp_search) { 
            return handleSearch(resp_search);
        })
}

/**
 * Funcion para comprobar que una empresa existe
 * @param {int} id identificador de la empresa, par comprobar que exista 
 * @param {callback} handleExist 
 */
function ExistCompanie(id, handleExist){
    var query_exist = "SELECT count(*) as count  from companies where id=? ;"

    queryexecution(query_exist, [id], function (resp_exist) {
        return handleExist(resp_exist);
    })
}



module.exports = {
    InsertCompanie,
    ListAllCompanies, 
    ListPageCompanies,
    UpdateCompanie,
    SearchCompanie, 
    ExistCompanie
};