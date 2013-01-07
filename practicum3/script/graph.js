function Graph(id) {

    var data = window.data;

    var selectedCountries = [];
    var styles = new Object();

    this.selectCountry = function(country, cssclass) {
        //if (data[country]) {
            selectedCountries.push(country);
            styles[country] = cssclass;
            updateCountries(selectedCountries);
            console.log(selectedCountries );
        //} else {
            //console.log("I dunna bout " + country);
        //}
    };

    this.deselectCountry = function(country) {
        delete styles[country];
        var index = selectedCountries.indexOf(country);
        if (index != -1)
            selectedCountries.pop(index)
        updateCountries(selectedCountries);
    };

    // Vul hier je eigen formule in.
    // TODO: geval afhandelen dat country niet bestaat
    var formula = function(country) {
        var countryData = window.data["Life expectancy at birth, total (years)"][country];

        var paired = [];
        for (var year = 1960; year <= 2010; year++) {
            if (!countryData || isNaN(countryData[year]))
                value = 0;
            else
                value = +countryData[year];
            paired.push({date: +year, temperature: value});
        }
        return paired;
    };

    var svg;

    function updateCountries(countries) {
        if(svg)
            svg.data([]).exit().remove();

        var margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = 800 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        //var parseDate = d3.time.format("%Y%m%d").parse;

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.ordinal().range(["red", "purple", "yellow"]);

        var xAxis = d3.svg.axis()
            //xAxis
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            yAxis
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.temperature); });

        //if (!svg) 
        //{
        //d3.sel

        d3.selectAll(id).selectAll("svg").remove();

            svg = d3.select(id).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //}

        color.domain(countries);

        var cities = color.domain().map(function(name) {
            return {
                name: name,
                values: formula(name)
            };
        });
        
        //x.domain([1, 2, 3, 4, 5]);
        x.domain([1960, 2012]);
        //x.domain(d3.range(1960, 2012));
        //x.domain(d3.extent(data, function(d) { return d.date; }));

        console.log("test3");
        console.log(cities);

        y.domain([
            d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
            d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
            ]);

        console.log(y.domain());

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Quality of Life");

        console.log("test5");

        var city = svg.selectAll(".city")
            //.data([]).exit().remove()
            .data(cities)
            .enter().append("g")
            .attr("class", "city");

        city.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return color(d.name); });

        city.append("text")
            .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })


            // FIXME
            .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
            .attr("x", 3)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });

        console.log("test6");
    }

    //updateCountries(["United States", "United Kingdom", "China"]);
    //updateCountries(["United States"]);
    //updateCountries(["United States", "United Kingdom", "China"]);
    //this.selectCountry("United States");
    //this.selectCountry("Italy");
}
