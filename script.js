Promise.all([
  window.fetch('land.json').then(res => res.json()),
  window.fetch('stad.json').then(res => res.json())
]).then(([countries, cities]) => {
  let fragment = document.createDocumentFragment()
  countries.sort((a, b) => a.countryname.localeCompare(b.countryname, 'sv')).forEach(country => {
    let details = document.createElement('details')
    let summary = document.createElement('summary')
    summary.textContent = country.countryname
    details.appendChild(summary)
    let list = document.createElement('ol')
    cities.filter(city => city.countryid === country.id).sort((a, b) => b.population - a.population).forEach(city => {
      let item = document.createElement('li')
      item.innerHTML = `Name: ${city.stadname}<br>Population: ${city.population}`
      list.appendChild(item)
    })
    details.appendChild(list)
    fragment.appendChild(details)
  })
  document.body.appendChild(fragment)
})
