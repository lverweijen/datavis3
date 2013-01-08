//GLOBAL VARIABLES
var year_now				= 1960;
var life_expectancy 		= [];
var life_expectancy_data	= [[]];
var selected_country 		= [undefined,undefined,undefined];
var coefficients		= d3.range(13).map(function(){return "0"});
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
        createSliders();
        //calcQOL();

        map 		= new Map("#map");
        azimuthal 	= new Azimuthal("#globe", 160, "ortographic");
        barcharts 	= new Barcharts("#barcharts");
        graph 	    = new Graph("#graph");    
        calcQOL();
        graph.updateCountries();
    });
});

function setSelection(country) {
	
}

function MAX(a)
{
	var countries = Object.keys(a); 
	return d3.range(1960, 2012).map(function(year) 
			{
			return d3.max(countries,function(country)
				{
					return +a[country][year];
				});  
			});
}

function MEAN(a)
{
    var countries = Object.keys(a); 
    var g = d3.mean(countries, function(country) {  
        return d3.mean(d3.range(1960, 2012),
            function(k){return +a[country][k]});  
    });
    return g;
}

function init()
{
        //var means = {};
        //for(var indicator in window.data)
            //means[indicator] = MEAN(window.data[indicator]);

        //console.log(means);

        for(var indicator in window.data) {
            var a = window.data[indicator];
            var countries = Object.keys(a);

            countries.forEach(function(country) {
                var cc = 0; //means[indicator];

                d3.range(1960, 2012).forEach(function(y) {
                    if(a[country][y]=="")
                        a[country][y]=cc;
                    else
                        cc=a[country][y];
                });

            });

            filtered_data.push(a);
            filtered_data_max.push(MAX(a));
        }

}

function createSliders() {
    var table = d3.select("#sliders").append("tbody");
    var table_id = 0;
    for (var indicator in window.data) {
        console.log("creating barchart for indicator");
        //table.append("text").attr("mama", "joe");
        //table.append("<p>hello</p>");
        var slider = table.append("tr")
            .append("td")
            .text("" + indicator);

            //slider
            //.text(indicator + "\n<br> <br/>")

        slider.append("br");

        slider
            .append("input")
            .attr("type", "range")
            .attr("value", "0")
            .attr("min", "-10")
            .attr("max", "10")
            .attr("step", "0.05")
            .attr("onchange", "updateCoefficientSlider(this.value, " + table_id + ")")
            .style("width", "800px");
        //table.append("p").text(indicator);
        //table.append("circle");
    }
}

function calcQOL()
{
    console.log("UPDATE");
    var countries = Object.keys(filtered_data[0]);
    var container = {};

    console.log(filtered_data);
    console.log(filtered_data_max);

    for(var i=0;i<countries.length;i++)
    {
        var country = countries[i];
        var collection = {};
        for(year=1960;year<2012;year++)
        {
            collection[year]=0;
            for(var j=0;j<filtered_data.length;j++)
            {
                collection[year]+=filtered_data[j][country][year]/filtered_data_max[j][year-1960] * coefficients[j];
            }
            collection[year]/=filtered_data.length;
        }
        container[country]=collection;
    }
    quality_of_life=container;
}


function updateSlider(value)
{
	calcQOL();

	var yearDisp = $('#yearDisp');
	year_now = value;
	yearDisp.html(""+ year_now);

	var output = {};
	var countries = Object.keys(quality_of_life);

	for(var i=0;i<countries.length;i++)
		output[countries[i]] = quality_of_life[countries[i]][year_now];

    map.loadMap(output);
    azimuthal.loadMap(output);
};

function updateCoefficientSlider(value, index) {
    coefficients[index] = value;
    calcQOL();
    graph.updateCountries();
    updateSlider(year_now);
}

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
