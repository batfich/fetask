$(document).ready(function () {
	var countrry = [];
	var dataCountry = {};
	$.ajax({
		type: "GET",
		url: "https://restcountries.eu/rest/v2/all",
		success: function (response) {
			for (var i = 0; i < response.length; i++) {
				countrry[response[i].name] = response[i];
				dataCountry[response[i].name] = response[i].flag;
			}
		},
	});

	$("input.autocomplete").autocomplete({
		data: dataCountry,
		limit: 5,
		onAutocomplete: function (txt) {
			countryInfo(countrry[txt]);
			showWeader(countrry[txt]);
		},
	});

	function countryInfo(data) {
		document.getElementById("name").innerHTML = data.name;
		document.getElementById("capital").innerHTML = data.capital;
		document.getElementById("region").innerHTML = data.region;
		document.getElementById("timezones").innerHTML = data.timezones;
		document.getElementById("lon").innerHTML = data.alpha2Code;
	}

	function showWeader(data) {
		$.ajax({
			type: "GET",
			url: "https://api.openweathermap.org/data/2.5/weather?q=" + data.capital + "," + data.alpha2Code + "&units=metric&APPID=c3e00c8860695fd6096fe32896042eda",
			success: function (response) {
				renderWeader(response);
			},
		});
	}

	function renderWeader(data) {
		document.getElementById("weatherMain").innerHTML = data.weather[0].main;
		document.getElementById("weatherDescription").innerHTML = data.weather[0].description;
		document.getElementById("temp").innerHTML = Math.round(data.main.temp) + " °C";
		document.getElementById("tempMin").innerHTML = Math.round(data.main.temp_min) + " °C";
		document.getElementById("tempMax").innerHTML = Math.round(data.main.temp_max) + " °C";
		document.getElementById("humidity").innerHTML = Math.round(data.main.humidity) + " °C";
	}
});
