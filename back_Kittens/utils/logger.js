var fs = require('fs');
var moment = require('moment');

var logfile = 'logs/back_kittens.log';
var logger = function() {};

logger.prototype.log = function(data){
    data = data.toString();

    fs.appendFile(logfile,
        moment().format('DD/MM/YYYY HH:mm:ss') + ' --> [Potencial ataque] ' + data +"\n", function (err) {
        if (err) console.log(err);
    })
}

logger.prototype.logInsert = function (ip, data){
    
    this.log("La IP: [ " + ip + " ] - Intento insertar: [ " + JSON.stringify(data) + " ]");
   
}

logger.prototype.logSearch = function (ip, tosearch) {

    this.log("La IP: [ " + ip + " ] - Intento de busqueda con valor: [ " + tosearch + " ]");

}

module.exports = new logger();