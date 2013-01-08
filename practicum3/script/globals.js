//GLOBAL VARIABLES
var year 			= 2005;
var life_expectancy 		= [];
var life_expectancy_data	= [[]];
var selected_country 		= "Netherlands";
var selection_1			= null;
var selection_2			= null;
var selection_3			= null;
var coeficients			=["1","-1","1","1","1","-1","-1"];
var quality_of_life		= {};
var filtered_data_max = [];
var filtered_data = [];


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
    
        init();

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

function MAX(a)
{
    var countries = Object.keys(a); 
    var g = d3.max(countries, function(country) {  
        return d3.max(d3.range(1960, 2012),
            function(k){return +a[country][k]});  
    });
    return g;
}

function init()
{
	var a = window.data["CO2 emissions (metric tons per capita)"];
	var b = window.data["Death rate, crude (per 1,000 people)"];
	var c = window.data["GDP per capita (current US$)"];
	var d = window.data["GDP per capita growth (annual %)"];
	var e = window.data["Life expectancy at birth, total (years)"];
	var f = window.data["Mortality rate, infant (per 1,000 live births)"];
	var g = window.data["Unemployment, total (% of total labor force)"];

        var amax = MAX(a);
        var bmax = MAX(b);
        var cmax = MAX(c);
        var dmax = MAX(d);
        var emax = MAX(e);
        var fmax = MAX(f);
        var gmax = MAX(g);

        filtered_data = [a,b,c,d,e,f,g];
        filtered_data_max = [amax,bmax,cmax,dmax,emax,fmax,gmax];
}

function calcQOL()
{
        var countries = Object.keys(filtered_data[0]);
	var container = {};
	for(var i=0;i<countries.length;i++)
	{
		var country = countries[i];
		var collection = [];
	 for(year=1960;year<2012;year++)
         {
            collection[year]=0;
             for(var j=0;j<7;j++)
                 collection[year]+=filtered_data[j][country][year]*coeficients[j]/filtered_data_max[j];
         }
	 container[country]=collection;
	}
	quality_of_life=container;
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
	coeficients[0]=value/10;
	calcQOL();
	graph.updateCountries();
}
function updateSlider2(value)
{
	coeficients[1]=-value/10;
	calcQOL();
	graph.updateCountries();

}
function updateSlider3(value)
{
	coeficients[2]=value/10;
	calcQOL();
	graph.updateCountries();

}
function updateSlider4(value)
{
	coeficients[3]=value/10;
	calcQOL();
	graph.updateCountries();

}
function updateSlider5(value)
{
	coeficients[4]=value/10;
	calcQOL();
	graph.updateCountries();

}
function updateSlider6(value)
{
	coeficients[5]=-value/10;
	calcQOL();
	graph.updateCountries();

}
function updateSlider7(value)
{
	coeficients[6]=-value/10;
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
