/**
 * Unit test cases related to Players
 */
var should = require("should");
var assert = require("assert");
var request = require("supertest");

describe('Player Data Scrape Unit Test Report', function() {
    var url = 'http://localhost:3000';

    // This is going to take a while so set a longer timeout (10 seconds)
    this.timeout(10*1000);

    it('should scrape and store the list of cricket playing countries successfully', function(done) {
        request(url)
            .get('/scrape/countries')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                res.body.should.have.property('status', 'success');
                done();
            });
    });

    it("should scrape and store the player list for England successfully", function(done) {
        request(url)
            .get("/scrape/players/country?countryId=1&name=England")
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }

                res.body.should.have.property('status', 'success');
                done();
            });
    });

    it("should scrape and store the player list for USA successfully", function(done) {

        request(url)
            .get("/scrape/players/country?countryId=11&name=USA")
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }

                res.body.should.have.property('status', 'success');
                done();
            });
    });

    it("should scrape and store the player list for player id = 8917 successfully", function (done) {
        request(url)
            //.get("/scrape/player?countryId=1&playerId=8917&url=http://www.espncricinfo.com/england/content/player/8917.html")
            .get("/scrape/player?playerId=8917")
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }

                res.body.should.have.property('status', 'success');
                done();
            });
    });
});