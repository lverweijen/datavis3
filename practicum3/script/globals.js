var year = 2008;
var life_expectancy_data = [[]];

function updateSlider(value)
{
	var yearDisp = $('#yearDisp');
	year = value;
	yearDisp.html(""+ year);

	//Load in the life expectancy data for given year
	d3.csv("/data/datasets/life_expectancy_test.csv", function(csv)
	{
		csv.forEach(function(row)
		{
			life_expectancy_data[row["Country Name"]] = row[""+year];
		});
	});
};

d3.csv("data/simplified.csv", function(data) {
    window.data = d3.nest()
        .key(function(d) {return d["Indicator Name"]})
        .key(function(d) {return d["Country Name"]})

        .rollup(function(v) { return v[0]; })
        .map(data);
});

function gradient(red, green, blue, min, max, data)
{
	var constant = min*(max-min)*data;
	r = red*constant;
	g = green*constant;
	b = blue*constant;
    return "rgb("+r+","+g+","+b+")";
}
