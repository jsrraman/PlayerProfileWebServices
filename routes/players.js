var debug = require('debug')('PlayerProfileWebServices');

var express = require('express');
var router = express.Router();
var db = require('../db/players-dao');

/* GET the list of cricket playing countries */
router.get('/countries', function(httpReq, httpRes) {

  var fnResponse = {};

  db.getCountryList(function (error, result) {
    if (error) {
      fnResponse.status = "failure";
      fnResponse.result = error;
    } else {
      fnResponse.status = "success";
      fnResponse.result = result;
    }

    // Send the response to the API caller
    httpRes.send(fnResponse);
  });
});

router.get('/', function(httpReq, httpRes) {

  var playerId = httpReq.param("playerId");

  var fnResponse = {};

  if ( (playerId == null) || (playerId == undefined) ) {
    fnResponse.status = "failure";
    fnResponse.result = "Player id cannot be empty";
    httpRes.send(fnResponse);
  }

  db.getPlayerProfile(null, parseInt(playerId), function (error, result) {
    // Send the response to the API caller
    if (error) {
      fnResponse.status = "failure";
      fnResponse.result = "There was error in retrieving the player's profile";
    }
    else {
      fnResponse.status = "success";
      fnResponse.result = result;
    }

    // Send the response to the API caller
    httpRes.send(fnResponse);
  });
});

router.get('/country', function(httpReq, httpRes) {

  var countryId = httpReq.param("countryId");

  var fnResponse = {};

  if ( (countryId == null) || (countryId == undefined) ) {
    fnResponse.status = "failure";
    fnResponse.result = "Country id cannot be empty";
    httpRes.send(fnResponse);
  }

  db.getPlayerProfile(parseInt(countryId), null, function (error, result) {
    // Send the response to the API caller
    if (error) {
      fnResponse.status = "failure";
      fnResponse.result = "There was error in retrieving the players' profiles";
    }
    else {
      fnResponse.status = "success";
      fnResponse.result = result;
    }

    // Send the response to the API caller
    httpRes.send(fnResponse);
  });
});

module.exports = router;
