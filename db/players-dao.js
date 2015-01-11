/**
 * Created by rajaraman on 16/12/14.
 * Interface for accessing players-profile database
 */
var debug = require('debug')('PlayerProfileWebServices');

var PlayersDao = {};

PlayersDao.dbName = "player-profile";
PlayersDao.mongoClient = require('mongodb').MongoClient;
PlayersDao.connectionUrl = "mongodb://localhost:27017/" + PlayersDao.dbName;

// Deletes the database
PlayersDao.deleteDbs = function() {

    PlayersDao.mongoClient.connect(PlayersDao.connectionUrl, function (err, db) {

        if (err) {
            debug("Could not open " + PlayersDao.dbName + " database: " + err );
            callback(err, db);
            return;
        } else {
            db.dropDatabase(function (err, result) {
                if (!err) {
                    debug(PlayersDao.dbName + " database dropped successfully");
                }

                db.close();
            });
        }
    });
}

// Saves the scraped countries list to the database
PlayersDao.saveCountryList = function(docCountryList, callback) {

    PlayersDao.mongoClient.connect(PlayersDao.connectionUrl, function (err, db) {

        if (err) {
            debug("Could not open " + PlayersDao.dbName + " database: " + err );
            callback(err, db);
            return;
        } else {

            db.dropDatabase(function (err, result) {
                if (!err) {
                    debug(PlayersDao.dbName + " database cleaned up");
                }
            });

            var countryCollection = db.collection('countries');

            countryCollection.insert(docCountryList, function (err, result) {
                if (!err) {
                    debug('Country list saved successfully');
                }

                db.close();
                callback(err);
                return;
            });
        }
    });
};

// Get the country list
PlayersDao.getCountryList = function(callback) {

    PlayersDao.mongoClient.connect(PlayersDao.connectionUrl, function (err, db) {

        if (err) {
            debug("Could not open " + PlayersDao.dbName + " database: " + err );
            callback(err, db);
            return;
        } else {

            var countryCollection = db.collection('countries');

            // Get the records sorted by country id
            var query = {}; // Get everything
            var projection = {_id:0}; // Don't project the _id in the result
            var sortCriteria = {countryId:1};

            countryCollection.find(query, projection).sort(sortCriteria).toArray(function (err, result) {
                if (!err) {
                    debug('Country list fetched successfully');
                }

                db.close();
                callback(err, result);
                return;
            });
        }
    });
};

// Saves the scraped players list for a particular country to the database
PlayersDao.savePlayerList = function(docPlayerList, callback) {

    PlayersDao.mongoClient.connect(PlayersDao.connectionUrl, function (err, db) {

        if (err) {
            debug("Could not open " + PlayersDao.dbName + " database: " + err );
            callback(err, null);
            return;
        } else {

            var playerCollection = db.collection('players');

            playerCollection.insert(docPlayerList, function (err, result) {
                if (!err) {
                    debug('Player list saved successfully');
                }

                db.close();
                callback(null, null);
                return;
            });
        }
    });
};

// Retrieves a player's profile info for the following scenarios
// If countryId is passed then it will retrieve all its players' profile info (ignores playerId parameter)
// else it retrieves that particular player's id profile info
PlayersDao.getPlayerProfile = function(countryId, playerId, callback) {

    PlayersDao.mongoClient.connect(PlayersDao.connectionUrl, function (err, db) {

        if (err) {
            debug("Could not open " + PlayersDao.dbName + " database: " + err );
            callback(err, null);
            return;
        } else {

            var playerCollection = db.collection('players');

            var query = {};

            if ( (countryId != null || countryId != undefined) ) {
                query.countryId = countryId;
            } else {
                query.playerId = playerId;
            }

            debug(query);

            var projection = {_id:0}; // We don't need the _id in the result

            playerCollection.find(query, projection).toArray(function (err, result) {
                if (err) {
                    debug('Player profile info could not be retrieved successfully');

                    db.close();
                    callback(err, null);
                    return;

                } else {
                    debug('Player profile info retrieved successfully');

                    db.close();
                    callback(null, result);
                    return;
                }
            });
        }
    });
}

// Saves the scraped player profile data for a particular player to the database
PlayersDao.savePlayerProfile = function(docPlayerProfile, callback) {

    PlayersDao.mongoClient.connect(PlayersDao.connectionUrl, function (err, db) {

        if (err) {
            debug("Could not open " + PlayersDao.dbName + " database: " + err );
            callback(err, null);
            return;
        } else {

            var playerCollection = db.collection('players');

            var query = {};
            query.playerId = docPlayerProfile.playerId;

            playerCollection.update(query, docPlayerProfile, function (err, result) {
                if (!err) {
                    debug('Player profile saved successfully');
                }

                db.close();
                callback(null, null);
                return;
            });
        }
    });
};

module.exports = PlayersDao;