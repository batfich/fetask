$(document).ready(function () {
	var countrry = [];
	var dataCountry = {};
	$.ajax({
		type: "GET",
		url: "https://restcountries.eu/rest/v2/all",
		success: function (response) {
			for (var i = 0; i < response.length; i++) {
				countrry[response[i].name] = response[i];
				dataCountry[response[i].name] = response[i].null;
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("Kole Poluchi li?");
		},
	});

	$("input.autocomplete").autocomplete({
		data: dataCountry,
		limit: 5,
		onAutocomplete: function (txt) {
			countryInfo(countrry[txt]);
			showWeader(countrry[txt]);
			currencies(countrry[txt]);
		},
	});

	function countryInfo(data) {
		document.getElementById("name").innerHTML = data.name;
		document.getElementById("capital").innerHTML = data.capital;
		document.getElementById("region").innerHTML = data.region;
		// document.getElementById("timezones").innerHTML = data.timezones;
		// document.getElementById("alpha2Code").innerHTML = data.alpha2Code;
		// document.getElementById("currencies").innerHTML = data.currencies[0].code;
		data.timezones;
		data.alpha2Code;
		data.currencies[0].code;
	}

	function showWeader(data) {
		$.ajax({
			type: "GET",
			url: "https://api.openweathermap.org/data/2.5/weather?q=" + data.capital + "," + data.alpha2Code + "&units=metric&APPID=c3e00c8860695fd6096fe32896042eda",
			success: function (response) {
				renderWeader(response);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log("Kole Poluchi li?");
			},
		});
	}

	function renderWeader(data) {
		document.getElementById("weatherMain").innerHTML = data.weather[0].main;
		document.getElementById("weatherDescription").innerHTML = data.weather[0].description;
		document.getElementById("temp").innerHTML = Math.round(data.main.temp) + " <span>°C</span>";
		document.getElementById("tempMin").innerHTML = Math.round(data.main.temp_min) + " <span>°C Lo</span>";
		document.getElementById("tempMax").innerHTML = Math.round(data.main.temp_max) + " <span>°C Max</span>";
		document.getElementById("humidity").innerHTML = data.main.humidity + " <span>%</span>";
	}

	function currencies(data) {
		// $("#result").val("Loading...");
		document.getElementById("amount-label").innerHTML = data.currencies[0].code;

		var from = "USD";
		var to = data.currencies[0].code;

		$.ajax({
			type: "GET",
			url: "https://free.currconv.com/api/v7/convert?apiKey=df9f138a5090a29e4eaf&q=" + from + "_" + to + "&compact=y",
			success: function (response) {
				renderCurrencies(response);
			},
		});
	}

	function renderCurrencies(data) {
		amount = document.getElementById("amount").value;
		var exchangeRate = JSON.stringify(data).replace(/[^0-9\.]/g, "");
		var result = amount * exchangeRate;

		$("#result").val(parseFloat(result).toFixed(2));

		$("#amount").keyup(function () {
			amount = document.getElementById("amount").value;
			var exchangeRate = JSON.stringify(data).replace(/[^0-9\.]/g, "");
			var result = amount * exchangeRate;

			$("#result").val(parseFloat(result).toFixed(2));
		});
	}

	// var d = new Date();
	// d + "";
	// d.toUTCString();
	// document.write(d);
});

// $("div.spanner").addClass("hide");
// $("div.overlay").addClass("hide");
