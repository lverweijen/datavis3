function Barchart(id, indicator, data) {
    console.log(id);    
    function countries(countries) {
        var stack = d3.layout.stack(),
        layers = stack(countries.map(function(country){
            var countryData = data[country];

            var paired = [];
            for (var year = 1960; year <= 2012; year++) {
                paired.push({x: year, y: isNaN(countryData[year]) ? 0 : +countryData[year]});
            }

            return paired;

        }));
        return layers;
    }

    var layer;
    //var svg = d3.select("#barcharts").append("svg")

    var selectedCountries = [];
    var styles = new Object();

    this.selectCountry = function(country, cssclass) {
        // FIXME cssclass wordt genegeerd
        if (data[country]) {
            selectedCountries.push(country);
            styles[country] = cssclass;
            //updateCountries(selectedCountries);
            console.log(selectedCountries );
        } else {
            console.log("I dunna bout " + country);
        }
    };

    this.deselectCountry = function(country) {
        delete styles[country];
        var index = selectedCountries.indexOf(country);
        if (index != -1)
            selectedCountries.pop(index)
        //updateCountries(selectedCountries);
    };

    this.clear = function() {
        updateCountries([]);
    };

    var svg;

    this.updateCountries = function() {
        newcountries = selectedCountries;
        // Sommige delen van deze functie kunnen misschien ook hierboven gedeclareerd worden.
        // Ik weet alleen niet welke.

        if (svg) {
        //d3.select(id).selectAll("svg").remove();
        svg.remove();
    }

        svg = d3.select("#barcharts").append("svg")

        if (layer)
            layer.data([]).exit().remove();

        var n = 4, // number of layers
            m = 58, // number of samples per layer
            layers = countries(newcountries);
            yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
            yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });


        var margin = {top: 40, right: 10, bottom: 20, left: 10},
            width = colors.map_dim()[0] - margin.left - margin.right,
            height = 150 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            //.domain(d3.range(m))
            .domain(d3.range(1960, 2012))
            // .attr("style",colors.text)
            .rangeRoundBands([0, width], .08);
            //.rangeRoundBands([0, width], 3);

            // x-as
        //var x2 = d3.ordinal.scale()
            //.range([0, width])
            //.domain(d3.range(1960, 2012, 10));
            ////.domain(function(h) {console.log("H " + h)});

        var y = d3.scale.linear()
            .domain([0, yStackMax])
            .range([height, 0]);

        var color = d3.scale.ordinal().range(["red", "purple", "yellow"]);

        // TODO gebruik dit als cssClass werkt
        //var color = function(domain) {
            //return styles[selectedCountries[domain]];
        //}

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(0)
            .tickPadding(6)
            // .tickFormat(d3.format(",.0f"))
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"));

        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        layer = svg.selectAll(".layer")
            .data(layers)
          .enter().append("g")
            .attr("class", "layer")
            //.style("fill", function(d, i) { return color(i); });
            //.style("fill", function(d, i) { return color(i); })
            .attr("style", function(d,i){
                if(i==0)
                    return colors.country_selected1();
                if(i==1)
                    return colors.country_selected2();
                if(i==2)
                    return colors.country_selected3();
            });

        var rect = layer.selectAll("rect")
            .data(function(d) { return d; })
          .enter().append("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", height)
            .attr("width", x.rangeBand())
            .attr("height", 0);

        rect.transition()
            .delay(function(d, i) { return i * 10; })
            .attr("y", function(d) { return y(d.y0 + d.y); })
            .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height+15) + ")")
            .attr("style",colors.text)
            .call(xAxis).selectAll("g").attr("transform",function(){
                return $(this).attr("transform")+" rotate(-90)";
            });

        svg.append("g")
            .attr("class", "y axis")
            .attr("style",colors.text)
            .call(yAxis)
          .append("text")
            .attr("transform", "translate("+ width+"," + (height+30) +") rotate(0)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(indicator);


            svg.append("svg:line")
                .attr("x1",20)
                .attr("y1",height)
                .attr("x2",width)
                .attr("y2",height)
                .attr("style", colors.line);
    }



    //updateCountries([]);

    //updateCountries(["United States"]);
    //updateCountries(["United States", "United Kingdom"]);
    //updateCountries(["United States", "United Kingdom", "Italy"]);
    //updateCountries(["United Kingdom"]);
};
