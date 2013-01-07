//GLOBAL VARIABLES
var year 					= 2005;
var life_expectancy 		= [];
var life_expectancy_data	= [[]];
var selected_country 		= "Netherlands";
var selection_1				= null;
var selection_2				= null;
var selection_3				= null;
var coeficients				=["10","10","10","10","10","10","10"];

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
    });

    d3.csv("/data/datasets/life_expectancy_test.csv", function(csv)
        {
            csv.forEach(function(row)
                {
                    life_expectancyy_data[row["Country Name"]] = row;
                });
        });
});

function setSelection(country) {
	
}




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
			life_expectancy[row["Country Name"]] = row[""+year];
		});
	});

	//refresh stuff
        map.loadMap(life_expectancy);
        azimuthal.loadMap(life_expectancy);
	// graph 		= new Graph("#graph");
};

function computeQOL()
{
	console.log(coeficients);
}

function updateSlider1(value)
{
	coeficients[0]=value;
	computeQOL();
}
function updateSlider2(value)
{
	coeficients[1]=value;
	computeQOL();
}
function updateSlider3(value)
{
	coeficients[2]=value;
	computeQOL();
}
function updateSlider4(value)
{
	coeficients[3]=value;
	computeQOL();
}
function updateSlider5(value)
{
	coeficients[4]=value;
	computeQOL();
}
function updateSlider6(value)
{
	coeficients[5]=value;
	computeQOL();
}
function updateSlider7(value)
{
	coeficients[6]=value;
	computeQOL();
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
