function Barchart(id, indicator, data) {

    var margin = {top: 20, right: 40, bottom: 30, left: 20},
        width = 300 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    var formatPercent = d3.format("04d");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    // An SVG element with a bottom-right origin.
    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // A label for the current year.
    var title = svg.append("text")
        .attr("class", "title")
        .attr("dy", ".71em")
        .text(indicator);

    this.selectCountry = function(selectId, country) {
        var countryData = data[country];

        // I just want a simple numeric array, bitch.
        var years = d3.range(1960, 2012 + 1);

        years.forEach(function(year) {
            countryData[year] = +countryData[year+""];
        })


        //window.x = x;
        //window.y = y;
        
        x.domain(years);
        //y.domain([0, d3.max(countryData, function(d) { return countryData[d]; })]);
        //y.domain([0, 100]);
        //y.domain(years.map(function(year){return countryData[year];}))
        y.domain([0, d3.max(years, function(d) { return countryData[d]; })]);
        //console.log(y.domain);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .attr("opacity", .333)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .attr("opacity", .333)
            .style("text-anchor", "end");
            //.text("Frequency");

        svg.selectAll(".bar")
            //.data(countryData)
            .data(years)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(countryData[d]); })
            .attr("opacity", .333)
            .attr("height", function(d) { 
                return height - y(countryData[d]); 
            });

    };

    this.deselectCountry = function(country) {

    };

    // Testing
    this.selectCountry(0, "United Kingdom");
    //this.selectCountry(0, "United States");
    //svg.transition().duration(0);

    // Nu gaan proberen united states er overheen te tekenen
    // als dit lukt, kan ik waarschijnlijk dingen weghalen en tevoorschijn naar wens
        var countryData = data["United States"];

        var years = d3.range(1960, 2012 + 1);

        years.forEach(function(year) {
            countryData[year] = +countryData[year+""];
        });

        var bar = svg.selectAll(".bar")
            .data(years.concat(years))
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(countryData[d]); })
            .attr("opacity", .5)
            .style("fill", "blue") // ANDER KLEURTJE
            //.css("color", "DDDDDD")
            .attr("height", function(d) { 
                return height - y(countryData[d]); 
            });

        years.forEach(function(year) {
            bar.push(year);
        });
}

//
    // Liever wil je de data precies 1 keer inlezen
    // Misschien moet data ingelezen worden in barcharts.js
    //d3.tsv("data/removal.tsv", function(data) {
        //data.forEach(function(d) {
            //d.count = +d.count;
        //});

        //x.domain(data.map(function(d) { return d.year; }));
        //y.domain([0, d3.max(data, function(d) { return d.count; })]);

        //x.domain([1960, 2012])
        //y.domain([0, 1])
        
        //x.domain(data.map(function(d) { return d; }));
        //y.domain([0, d3.max(data, function(d) { return data[d]; })]);


        //svg.append("g")
        //.attr("class", "x axis")
        //.attr("transform", "translate(0," + height + ")")
        //.call(xAxis);

    //svg.append("g")
        //.attr("class", "y axis")
        //.call(yAxis)
        //.append("text")
        //.attr("transform", "rotate(-90)")
        //.attr("y", 6)
        //.attr("dy", ".71em")
        //.style("text-anchor", "end")
        //.text("Frequency");

    //svg.selectAll(".bar")
        //.data(data)
        //.enter().append("rect")
        //.attr("class", "bar")
        //.attr("x", function(d) { return x(d); })
        //.attr("width", x.range())
        //.attr("y", function(d) { return y(data[d]); })
        //.attr("height", function(d) { 
            //return height - y(d.count); 
        //});
    //});



