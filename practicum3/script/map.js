// Zo maak je een class in javascript
function Map(id) {
    var width = 800,
        height = 600,
        centered;

    var projection = d3.geo.equirectangular()
        .scale(width)
        .translate([0, 0]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select(id).append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", click);

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .append("g")
        .attr("id", "states");

    d3.json("data/world-countries.json", function(json) {
      g.selectAll("path")
          .data(json.features)
        .enter().append("path")
          .attr("d", path)
          .on("click", click);
    });

    function click(d) {
      var x = 0,
          y = 0,
          k = 1;

      if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = -centroid[0];
        y = -centroid[1];
        k = 4;
        centered = d;
      } else {
        centered = null;
      }

      g.selectAll("path")
          .classed("active", centered && function(d) { return d === centered; });

      g.transition()
          .duration(1000)
          .attr("transform", "scale(" + k + ")translate(" + x + "," + y + ")")
          .style("stroke-width", 1.5 / k + "px");
    }
}
