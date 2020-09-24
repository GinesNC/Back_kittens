var express = require('express');
var router = express.Router();
const dbCompaniesManager = require('../utils/dbCompaniesManager');
const dbOwnersManager = require('../utils/dbOwnersManager');
const dbFavoritesManager = require('../utils/dbFavoritesManager');


router.post('/', function(req, res, next){

    var companid = req.query.companid;
    var ownerid = req.query.ownerid;
    // Comprobar ID en companies

    dbCompaniesManager.ExistCompanie(companid, function (count_companie){
        if (count_companie.data[0].count)
            dbOwnersManager.InfoOwner(ownerid, function(owner){
                if (owner)
                    dbFavoritesManager.InsertFavorite(companid, ownerid, function(params) {
                        res.send({ code: 200, status: "OK" })
                    })
            })
        else res.send({ code: 404, status: "Not Found"})
    })
})

module.exports = router;