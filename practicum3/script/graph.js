function Graph(id)
{

	// var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 7];
	// var data = ;
	var data = [];
	var temp = life_expectancy_data["Netherlands"];
	var j=0;
	for(var i=1960;i<=2012;i++)
	{
		var temp = life_expectancy_data["Netherlands"]
		if(temp != undefined)
		{
			temp = temp[""+i];
			if(temp != undefined && temp != "..")
			{
				data[j]=temp;
				j++;
			}
		}
	}

	console.log(data);

	w = 400;
	h = 200;
	margin = 20;
	y = d3.scale.linear().domain([0, d3.max(data)]).range([0 + margin, h - margin]);
	x = d3.scale.linear().domain([0, data.length]).range([0 + margin, w - margin]);

	var vis = d3.select(id)
	    .append("svg:svg")
	    .attr("width", w)
	    .attr("height", h)
	 
	var g = vis.append("svg:g")
	    .attr("transform", "translate(0, 200)");

	    var line = d3.svg.line()
	        .x(function(d,i) { return x(i); })
	        .y(function(d) { return -1 * y(d); })


	        g.append("svg:path").attr("d", line(data));
}