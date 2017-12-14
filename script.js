Promise.all([
  window.fetch('land.json').then(function (response) { return response.json() }),
  window.fetch('stad.json').then(function (response) { return response.json() })
]).then(function (data) {
  let [countries, allCities] = data
  countries.sort((a, b) => a.countryname.localeCompare(b.countryname, 'sv'))
  countries.forEach(country => {
    let details = document.createElement('details')
    let summary = document.createElement('summary')
    summary.textContent = country.countryname
    details.appendChild(summary)
    let cities = allCities.filter(city => city.countryid === country.id)
    cities.sort((a, b) => b.population - a.population)
    let list = document.createElement('ol')
    cities.forEach(city => {
      let item = document.createElement('li')
      item.innerHTML = `Name: ${city.stadname}<br>Population: ${city.population}`
      list.appendChild(item)
    })
    details.appendChild(list)
    document.body.appendChild(details)
  })
})
