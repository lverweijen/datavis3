//GLOBAL VARIABLES
var year 					= 2005;
var life_expectancy 		= [];
var life_expectancy_data	= [[]];
var selected_country 		= "Netherlands";
var selection_1				= null;
var selection_2				= null;
var selection_3				= null;
var coeficients				=["10","10","10","10","10","10","10"];
var quality_of_life			= {};

//GLOBAL OBJECTS
var colors = new Colors();
var map;
var azimuthal;
var barcharts;
var graph;

//GLOBAL OPERATIONS
$(document).ready(function(){
    d3.csv("data/simplified.csv", function(data) {
        window.data = d3.nest()
        .key(function(d) {return d["Indicator Name"]})
        .key(function(d) {return d["Country Name"]})

        .rollup(function(v) { return v[0]; })
        .map(data);

        map 		= new Map("#map");
        azimuthal 	= new Azimuthal("#globe", 160, "ortographic");
        barcharts 	= new Barcharts("#barcharts");
        graph 	        = new Graph("#graph");    
        calcQOL();
        graph.updateCountries();
    });
});

function setSelection(country) {
	
}

function calcQOL()
{
	var a = window.data["CO2 emissions (metric tons per capita)"];
	var b = window.data["Death rate, crude (per 1,000 people)"];
	var c = window.data["GDP per capita (current US$)"];
	var d = window.data["GDP per capita growth (annual %)"];
	var e = window.data["Life expectancy at birth, total (years)"];
	var f = window.data["Mortality rate, infant (per 1,000 live births)"];
	var g = window.data["Unemployment, total (% of total labor force)"];

	var countries = Object.keys(a);
	var container = {};
	for(var i=0;i<countries.length;i++)
	{
		var country = countries[i];
		var collection = {};
	 for(year=1960;year<2012;year++)
	 {
	 	collection[year]= 	
	 		a[country][""+year]*coeficients[0]/10+
	 		b[country][""+year]*coeficients[1]/10+
	 		c[country][""+year]*coeficients[2]/10+
	 		d[country][""+year]*coeficients[3]/10+
			e[country][""+year]*coeficients[4]/10+
			f[country][""+year]*coeficients[5]/10+
			g[country][""+year]*coeficients[6]/10;
	 }
	 container[country]=collection;
	}
	quality_of_life=container;
        graph.updateCountries();

}


function updateSlider(value)
{
	calcQOL();

	var yearDisp = $('#yearDisp');
	year = value;
	yearDisp.html(""+ year);

	var output = {};
	var countries = Object.keys(quality_of_life);

	for(var i=0;i<countries.length;i++)
		output[countries[i]] = quality_of_life[countries[i]][year];

    map.loadMap(output);
    azimuthal.loadMap(output);
};

function updateSlider1(value)
{
	coeficients[0]=value;
	calcQOL();
	graph.updateCountries();
}
function updateSlider2(value)
{
	coeficients[1]=value;
	calcQOL();
	graph.updateCountries();

}
function updateSlider3(value)
{
	coeficients[2]=value;
	calcQOL();
	graph.updateCountries();

}
function updateSlider4(value)
{
	coeficients[3]=value;
	calcQOL();
	graph.updateCountries();

}
function updateSlider5(value)
{
	coeficients[4]=value;
	calcQOL();
	graph.updateCountries();

}
function updateSlider6(value)
{
	coeficients[5]=value;
	calcQOL();
	graph.updateCountries();

}
function updateSlider7(value)
{
	coeficients[6]=value;
	calcQOL();
	graph.updateCountries();
	
}

updateSlider(1998);

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
