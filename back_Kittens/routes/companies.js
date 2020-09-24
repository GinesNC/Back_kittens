
var express = require('express');
var router = express.Router();
var dbManager = require("../utils/dbCompaniesManager");
var logger = require('../utils/logger')

'use strict'



/* GET companies. */
router.get('/', function (req, res, next) {

    //Si se le pasa una página devuelve 20 elementos correspondientes a esa página.

    if (!req.query.page){
        dbManager.ListAllCompanies(function(response){
            res.send(response);
        })
    }
    else{
        dbManager.ListPageCompanies(req.query.page, function (response) {
            res.send(response);
        })
    }

});


//POST new companies
router.post('/insert', function(req, res, next){

    var data_insert = req.query; // datos que se insertaran en la base de datos
    var data_insert_length = Object.keys(data_insert).length // tamaño de dichos datos
    
    // si los datos son mas de 9 o menos 5 o se intenta insertar un id o token se almacena en el log como peticion peligrosa.
    if (data_insert_length > 9 || data_insert_length < 5 || data_insert.id || data_insert.token)    {
    
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        logger.logInsert(ip, data_insert)
        res.send({ code: 401, status: "Unauthorized" });
    }
    else{

        dbManager.InsertCompanie(data, function(response){
            res.send(response)
        })

    }

   

})

// PATCH // Update empresa
router.patch('/update', function(req,res,next){
    var dataupdate = req.query;
    

    dbManager.UpdateCompanie(dataupdate,function(response){
        res.send(response);
    })
})

// GET buscar compania por la descripcion
router.get('/search', function(req, res, next){
    var tosearch = req.query.search;
    if (tosearch.length < 3){
       
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        logger.logSearch(ip, tosearch);
        res.send({ code: 401, status: "Unauthorized" });
    
    }
else{
        dbManager.SearchCompanie(tosearch, function(response){
            res.send(response)
    })
}
})

module.exports = router;