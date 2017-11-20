'use strict'

var neo4j = require('neo4j') // variable for Neo4J
var db = new neo4j.GraphDatabase('http://wis:neo4j@localhost:7474') // conection DB
// Function to Create Node Continent with the following properties
module.exports.createNodeContinent = function (continent) { //
  db.cypher({
    query: 'MERGE (c:Continent {continentID : {id}, name : {name}})  RETURN c', // Query Search the continent
    params: {
      id: continent.geonameId,
      name: continent.name
    } },
    function (err, results) {
      if (err) throw err
      var result = results[0] // takes the first position of the result vector to check the answer
      if (!result) { // check if you found any results
        // if it does not find it, send error message
        console.log('Error in Node Creation')
      } else { // otherwise, send ok message
        console.log('Created Node') // send ok
        // console.log(result)
      }
    })
}

module.exports.createNodeCountry = function (country, continentID) { //
  db.cypher({
    // Query Search the continent
    query: 'MERGE (c:Country {countryID : {idContry},continentID: {idContinent} ,name : {name}})  RETURN c',
    params: {
      idContinent: continentID,
      idContry: country.geonameId,
      name: country.name
    } },
    function (err, results) {
      if (err) throw err
      var result = results[0] // takes the first position of the result vector to check the answer
      if (!result) { // check if you found any results
        // if it does not find it, send error message
        console.log('Error in Node Creation')
      } else { // otherwise, send ok message
        console.log('Created Node') // send ok
        // console.log(result)
      }
    })
}

module.exports.createRelationshipContinent = function () {  // function that creates relationship between continent and country
  db.cypher({
    // Query Search the continent and country, compare the ids and create a relationship
    query: 'MATCH (c1:Country),(c2:Continent) WHERE c1.continentID = c2.continentID MERGE (c1)-[r:BelongsTo]->(c2) RETURN r',
    params: {
    } },
    function (err, results) {
      if (err) throw err
      var result = results[0] // takes the first position of the result vector to check the answer
      if (!result) { // check if you found any results
        // if it does not find it, send error message
        console.log('Error in Relastionship Creation')
      } else { // otherwise, send ok message
        console.log('Created Relastionship') // send ok
        // console.log(result)
      }
    })
}
