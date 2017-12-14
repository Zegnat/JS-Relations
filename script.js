$(document).ready(function()
{
    var country;
    var city;
    
    fetch("./land.json")
    .then(function(response)
    {
        return response.json();
    })
    .then(function(countryCol)
    {
        country = countryCol;
        country.sort(function(a, b) { return a.countryname > b.countryname });
        createCountryList();
    });

    function createCountryList()
    {
        var $list = $("<div id='countryHolder'></div>")
            .on({
                click: function()
                {
                    if (this.nextSibling != null)
                    {
                        if (this.nextSibling.getAttribute("class") != "cityList")
                        {
                            getCities(this.id);
                        }
                        else
                        {
                            this.nextSibling.remove();
                        }
                    }
                    else
                    {
                        getCities(this.id);
                    }
                }
            }, ".country");


        for(var i = 0; i < country.length; i++)
        {
            var $country = $("<div class='country' id=" + country[i].id + ">" + country[i].countryname + "</div>");
            $list.append($country);
        }
        $("body").append($list);
    }

    function getCities(countryId)
    {
        fetch("./stad.json")
        .then(function(response)
        {
            return response.json();
        })
        .then(function(cityCol)
        {
            city = cityCol;
            city.sort(function(a, b) { return a.population - b.population });
            city.reverse();
            createCityList(countryId);
        });
    }

    function createCityList(countryId)
    {
        var correctCitys = [];
        for(var i = 0; i < city.length; i++)
        {
            if (city[i].countryid == countryId)
            {
                correctCitys.push(city[i]);
            }
        }

        var $cityList = $("<ul class='cityList'></ul>");
        for(var i = 0; i < correctCitys.length; i++)
        {
            var $city = $("<li>Name: " + correctCitys[i].stadname + "<br/>Population: " + correctCitys[i].population + "</li>");
            $cityList.append($city);
        }

        $cityList.insertAfter("#" + countryId);
    }
});