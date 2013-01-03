// Zo maak je een class in javascript
function Map(id) {

    //var width = 960,
        //height = 500;
    var width = 640,
        height = 400;

    //var quantize = d3.scale.quantize()
        //.domain([0, .15])
        //.range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

    var path = d3.geo.path();

    var svg = d3.select(id).append("svg")
        .attr("width", width)
        .attr("height", height);

    var counties = svg.append("g")
        .attr("id", "counties")
        .attr("class", "Blues");

    var states = svg.append("g")
        .attr("id", "states");

    d3.json("data/world-countries.json", function(json) {
        counties.selectAll("path")
        .data(json.features)
        .enter().append("path")
        //.attr("class", data ? quantize : null)
        .attr("d", path);
    });

    //d3.json("data/us-states.json", function(json) {
        //states.selectAll("path")
        //.data(json.features)
        //.enter().append("path")
        //.attr("d", path);
    //});

    //queue()
        //.defer(d3.json, "/d/4090846/us.json")
        //.defer(d3.tsv, "unemployment.tsv")
        //.await(ready);

    //function ready(error, us, unemployment) {
        //var rateById = {};

        //unemployment.forEach(function(d) { rateById[d.id] = +d.rate; });

        //svg.append("g")
            //.attr("class", "counties")
            //.selectAll("path")
            //.data(topojson.object(us, us.objects.counties).geometries)
            //.enter().append("path")
            //.attr("class", function(d) { return quantize(rateById[d.id]); })
            //.attr("d", path);

        //svg.append("path")
            //.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a.id !== b.id; }))
            //.attr("class", "states")
            //.attr("d", path);
    //}
}
