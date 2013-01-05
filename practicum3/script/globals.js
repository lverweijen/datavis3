var year = 2008;
var life_expectancy_data = [];

function updateSlider(value)
{
	var yearDisp = $('#yearDisp');
	year = value;
	// console.log(year);
	yearDisp.html(""+ year);

	//Load in the life expectancy data
	d3.csv("/data/datasets/life_expectancy_test.csv", function(csv)
	{
		csv.forEach(function(row)
		{
			console.log(row);	
			life_expectancy_data[row["Country Name"]] = row["2008"];
		});
                console.log(life_expectancy_data);
	});
        console.log("kom hier");
                console.log(life_expectancy_data);
        // Hieronder is het misschien nog niet ingeladen

}

// Zo lees ik in
// En Dan gewoon data[indicatorName][countryName]
d3.csv("data/simplified.csv", function(data) {
    window.data = d3.nest()
        .key(function(d) {return d["Indicator Name"]})
        .key(function(d) {return d["Country Name"]})
        .rollup(function(v) { return v.map(function(d) { return d; }); })
        .map(data);
});

