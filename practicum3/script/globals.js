//GLOBAL VARIABLES
var year = 2005;
var life_expectancy_data = [];

//GLOBAL OBJECTS
var map;
var azimuthal;
var barcharts;
var graph;

$(document).ready(function(){
	map 		= new Map("#map");
	azimuthal 	= new Azimuthal("#globe", 160, "ortographic");
	barcharts 	= new Barcharts("#barcharts");
	// graph 		= new Graph("#graph");
});

function updateSlider(value)
{
	var yearDisp = $('#yearDisp');
	year = value;
	yearDisp.html(""+ year);

	//Load data
	d3.csv("/data/datasets/life_expectancy_test.csv", function(csv)
	{
		csv.forEach(function(row)
		{
			life_expectancy_data[row["Country Name"]] = row[""+year];
		});
	});

	//refresh stuff
	//map.loadMap(life_expectancy_data);
};

updateSlider(1998);

d3.csv("data/simplified.csv", function(data) {
    console.log("data");
    window.data = d3.nest()
        .key(function(d) {return d["Indicator Name"]})
        .key(function(d) {return d["Country Name"]})

        .rollup(function(v) { return v[0]; })
        .map(data);
});

function gradient(red, green, blue, min, max, data)
{
	var constant = (data-min)/(max-min);
	var grad = 40;
	var inv  = 256-grad;
	var diff = inv*constant;
	r = grad+Math.round(diff*red);
	g = grad+Math.round(diff*green);
	b = grad+Math.round(diff*blue);	
	base = "rgb("+grad+","+grad+","+grad+")";
	color = "rgb("+r+","+g+","+b+")";
    return (!isNaN(data)) ? color : base;
}
