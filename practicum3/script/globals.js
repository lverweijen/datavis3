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
	});

	console.log(life_expectancy_data);
}

