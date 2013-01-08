//GLOBAL VARIABLES
var year_now				= 1960;
var life_expectancy 		= [];
var life_expectancy_data	= [[]];
var selected_country 		= [undefined,undefined,undefined];
var coeficients			=["0","0","0","0","0","0","0"];
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
	var a = window.data["CO2 emissions (metric tons per capita)"];
	var b = window.data["Death rate, crude (per 1,000 people)"];
	var c = window.data["GDP per capita (current US$)"];
	var d = window.data["GDP per capita growth (annual %)"];
	var e = window.data["Life expectancy at birth, total (years)"];
	var f = window.data["Mortality rate, infant (per 1,000 live births)"];
	var g = window.data["Unemployment, total (% of total labor force)"];


	var amean=MEAN(a);
	var bmean=MEAN(b);
	var cmean=MEAN(c);
	var dmean=MEAN(d);
	var emean=MEAN(e);
	var fmean=MEAN(f);
	var gmean=MEAN(g);	


	var countries = Object.keys(a);
	for(var i=0;i<countries.length;i++)
	{
		var ac=amean;
		var bc=bmean;
		var cc=cmean;
		var dc=dmean;
		var ec=emean;
		var fc=fmean;
		var gc=gmean;	

		var country = countries[i];
		for(y=1960;y<2012;y++)
		{

			if(a[country][y]=="")
				a[country][y]=ac;
			else
				ac=a[country][y];

			if(b[country][y]=="")
				b[country][y]=bc;
			else
				bc=b[country][y];
			
			if(c[country][y]=="")
				c[country][y]=cc;
			else
				cc=c[country][y];
			
			if(d[country][y]=="")
				d[country][y]=dc;
			else
				dc=d[country][y];
			
			if(e[country][y]=="")
				e[country][y]=ec;
			else
				ec=e[country][y];
			
			if(f[country][y]=="")
				f[country][y]=fc;
			else
				fc=f[country][y];
			
			if(g[country][y]=="")
				g[country][y]=gc;
			else
				gc=g[country][y];

		}
	}

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
	console.log("UPDATE");
    var countries = Object.keys(filtered_data[0]);
	var container = {};


	for(var i=0;i<countries.length;i++)
	{
		var country = countries[i];
		var collection = [];
	 	for(year=1960;year<2012;year++)
         {
            collection[year]=0;
            for(var j=0;j<filtered_data.length;j++)
                	collection[year]+=filtered_data[j][country][year]/filtered_data_max[j][year-1960]*coeficients[j];
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

function updateSlider1(value)
{
	coeficients[0]=value/10;
	calcQOL();
	graph.updateCountries();
	updateSlider(year_now);
}
function updateSlider2(value)
{
	coeficients[1]=value/10;
	calcQOL();
	graph.updateCountries();
	updateSlider(year_now);
}
function updateSlider3(value)
{
	coeficients[2]=value/10;
	calcQOL();
	graph.updateCountries();
	updateSlider(year_now);

}
function updateSlider4(value)
{
	coeficients[3]=value/10;
	calcQOL();
	graph.updateCountries();
	updateSlider(year_now);

}
function updateSlider5(value)
{
	coeficients[4]=value/10;
	calcQOL();
	graph.updateCountries();
	updateSlider(year_now);

}
function updateSlider6(value)
{
	coeficients[5]=value/10;
	calcQOL();
	graph.updateCountries();
	updateSlider(year_now);

}
function updateSlider7(value)
{
	coeficients[6]=value/10;
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
