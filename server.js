const express = require('express');
const moment = require('moment');
const app = new express();

app.use(express.static(__dirname + '/public'));

var log = function(update){
    var time = moment().format();
    console.log('[Server] @'+time+' '+message);
};

// var locationUpdate = function(currentAddress, destinationAddress){
//     var giveAlert = " Finding a ride from " + currentAddress + " to " + destinationAddress;
//     console.log("alert success: " + giveAlert);
//     return giveAlert; 
// };

// app.get('/find', function(req, res){
//     console.log('Tracking location');
//     var currentAddress = req.query.currentAddress;
//     var destinationAddress = req.query.destinationAddress;
//     var giveAlert = locationUpdate(currentAddress, destinationAddress);
//     res.send("" + giveAlert + "");
// });

app.listen(3000, () =>{
    console.log('Server started on port 3000');
});

