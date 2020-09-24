var express = require('express');
var router = express.Router();

const dbOwnerManager = require('../utils/dbOwnersManager');


router.get('/', function(req, res, next) {

  var page = req.query.page
  // var limit = req.query.limit

  dbOwnerManager.ListOwnersforPage (page,  function(response){
    res.send(JSON.parse(response));
  })

});

router.get('/:id', function(req, res, next){
  var id = req.params.id

  dbOwnerManager.InfoOwner(id, function (response){
    res.send(response);
  })
  
})

router.get('/:id/post', function(req, res, next){
  dbOwnerManager.PostOwner(req.params.id, function(resp){
   
      res.send(resp.data)
   
  });
})


module.exports = router;
