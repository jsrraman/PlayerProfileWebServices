/**
 * Unit test cases related to Players
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe("Player Profile REST APIs Unit Test Report", function() {
    var url = "http://localhost:3000";

    it('should retrieve the list of cricket playing countries successfully', function(done) {

        request(url)
            .get("/players/countries")
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                res.body.should.have.property("status", "success");
                done();
            });
    });

    it('should retrieve the profile info for player id = 8917', function(done) {

        request(url)
            .get("/players?playerId=0")
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                res.body.should.have.property("status", "success");
                done();
            });
    });

    it('should retrieve the profile info for all players of England', function(done) {

        request(url)
            .get("/players/country?countryId=1")
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                res.body.should.have.property("status", "success");
                done();
            });
    });

});