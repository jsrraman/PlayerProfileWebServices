# Player Profile Web Services

This contains the web services built using node.js and uses MongoDB as backend db. The data were scraped from cricinfo.com. This uses mocha based unit test cases.

This exposes the following webservices

  1.1. <Baseurl>/scrape/countries - This scrapes the cricket playing country list and stores it in the backend db.

  1.2. <Baseurl>/scrape/players/country?countryId=1&name=England - This scrapes the players list for the given country id and name and stores it in the backend db.

  1.3. <Baseurl>/scrape/player?playerId=8917 - This scrapes the player profile for the given player id and stores it in the backend db.
  
  1.4. <Baseurl>/players/countries - This retrieves the cricket playing country list.

  1.5. <Baseurl>/players/country?countryId=1 - This retrieves the players list for the given country id.

  1.6. <Baseurl>/players?playerId=8917 - This retrieves the player profile for the given player id.
