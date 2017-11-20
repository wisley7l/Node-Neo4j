'use strict'

/* setInterval(function () {
  console.log('Wisley')
}, 3000) // function que  sera executada entre 3 em 3 segundos
*/
const http = require('http') // variable for http

// get continent request
http.get('http://www.geonames.org/childrenJSON?geonameId=6295630', (res) => {
  const { statusCode } = res
  const contentType = res.headers['content-type']

  let error
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`)
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`)
  }
  if (error) {
    console.error(error.message)
    // consume response data to free up memory
    res.resume()
    return
  }
  res.setEncoding('utf8')
  let rawData = ''
  res.on('data', (chunk) => { rawData += chunk }
  )
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData)
      // console.log(parsedData.geonames)
      // execute function to treat array of continent
      treatContinent(parsedData.geonames)
    } catch (e) {
      console.error(e.message)
    }
  })
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})

// fucntion to treat of continent
// create a function that does the processing of the data in NEO4J creating a continent node

function treatContinent (continent) {
  for (var i = 0; i < continent.length; i++) { // For each continent, create a continent node and search the countries
    // use function for data processing in NEO4J
    console.log(continent[i].name) // test
    getCountry(continent[i].geonameId) // busca os países de cada continente, fazendo requisição get
  }
}

// get country request

function getCountry (continentID) { //
  http.get('http://www.geonames.org/childrenJSON?geonameId=' + continentID, (res) => {
    const { statusCode } = res
    const contentType = res.headers['content-type']

    let error
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`)
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`)
    }
    if (error) {
      console.error(error.message)
      // consume response data to free up memory
      res.resume()
      return
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => { rawData += chunk }
    )
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData)
        console.log('ContinentID = ' + continentID)
        // console.log(parsedData.geonames)
        // treat data
        treatCountry(parsedData.geonames)
      } catch (e) {
        console.error(e.message)
      }
    })
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`)
  })
}
// treat Country
function treatCountry (country) {
  for (var i = 0; i < country.length; i++) { // For each continent, create a continent node and search the countries
    // use function for data processing in NEO4J
    console.log(country[i].name) // test
    // getCountry(country[i].geonameId) // busca os países de cada continente, fazendo requisição get
  }
}
