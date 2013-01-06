// Zo maak je een class in javascript
function Map(id) {
    var width = 800,
        height = 400,
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
        .attr("n",function(d,i){
            return json.features[i].properties.name;
        })
        .style("fill",function(d,i)
        {
            return "rgb(40,40,40)";
        })
        .style("stroke",function(d,i)
        {
            return "rgb(0,0,0)";
        }) 
        .attr("map",function(){
          return "fill:rgb(40,40,40);stroke:rgb(0,0,0)"
        })    
          .attr("d", path)
          .on("click", click)
          .on("mouseover", selectLand)
          .on("mouseout" , deselectLand);
    });

    this.loadMap = function(data)
    {
        var list = g.selectAll("path")[0];
        
        var min =  9999;
        var max = -9999;

        list.forEach(function(i)
        {
            var value = data[$(i).attr("n")];
            if(value>max && !isNaN(value))
                max=value;
            if(value<min && !isNaN(value))
                min=value;
        });

        list.forEach(function(i)
        {
          $(i).attr("map",function(){
            var value = data[$(i).attr("n")];
            var color = gradient(1,0.35,0,min,max,value);
            return "fill: " + color + ";stroke: rgb(0,0,0)";
          });
          $(i).attr("style",$(i).attr("map"));
        });

        list.forEach(function(i)
        {
          if(selection_1 != undefined && $(i).attr("n")==selection_1.attr("n"))
            $(i).attr("style","fill:rgb(256,0,0);stroke:rgb(0,0,0)");
          if(selection_2 != undefined && $(i).attr("n")==selection_2.attr("n"))
            $(i).attr("style","fill:rgb(256,0,256);stroke:rgb(0,0,0)");
          if(selection_3 != undefined && $(i).attr("n")==selection_3.attr("n"))
            $(i).attr("style","fill:rgb(256,256,0);stroke:rgb(0,0,0)");
        });
    }

    function clear()
    {
      console.log("cleared map");
      var list = g.selectAll("path")[0];
      list.forEach(function(i)
      {
        $(i).attr("style",$(i).attr("map"));
      });
    }

    this.zoom = function(d)
    {
          var x = 0,
              y = 0,
              k = 1;

          if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = -centroid[0];
            y = -centroid[1];
            k = 4;
            centered = d;
          } 
          else {
            centered = null;
          }

          g.selectAll("path")
              .classed("active", centered && function(d) { return d === centered; });

          g.transition()
              .duration(1000)
              .attr("transform", "scale(" + k + ")translate(" + x + "," + y + ")")
              .style("stroke-width", 1.5 / k + "px");

          clear();
          var list = g.selectAll("path")[0];
          list.forEach(function(i)
          {
            if(selection_1 != undefined && $(i).attr("n")==selection_1.attr("n"))
              $(i).attr("style","fill:rgb(256,0,0);stroke:rgb(0,0,0)");
            if(selection_2 != undefined && $(i).attr("n")==selection_2.attr("n"))
              $(i).attr("style","fill:rgb(256,0,256);stroke:rgb(0,0,0)");
            if(selection_3 != undefined && $(i).attr("n")==selection_3.attr("n"))
              $(i).attr("style","fill:rgb(256,256,0);stroke:rgb(0,0,0)");
          });
    }


    function click(d) {
      // var x = 0,
      //     y = 0,
      //     k = 1;

      // if (d && centered !== d) {
      //   var centroid = path.centroid(d);
      //   x = -centroid[0];
      //   y = -centroid[1];
      //   k = 4;
      //   centered = d;
      // } else {
      //   centered = null;
      // }

      // g.selectAll("path")
      //     .classed("active", centered && function(d) { return d === centered; });

      // g.transition()
      //     .duration(1000)
      //     .attr("transform", "scale(" + k + ")translate(" + x + "," + y + ")")
      //     .style("stroke-width", 1.5 / k + "px");

      // var selection = d3.select(this);
      // selected_country = selection.attr("n");
      // console.log(selected_country);
      // graph.selectCountry(selected_country);
    }

    function selectLand()
    {
      // //Set Color
      // var selection = d3.select(this);
      // selection.attr("oldcolor",selection.style("fill"));
      // selection.style("fill","white");
    }

    function deselectLand()
    {
      // //Set Color
      // var selection = d3.select(this);
      // var tmp = selection.attr("name");
      // selection.style("fill",selection.attr("oldcolor"));
    }
}


function AdBox() {
    this.width = 200;
    this.height = 60;
    this.text = 'default ad text';
    this.prototype.move = function() {
        console.log("hello world");
    }
    this.prototype.display = function() {
    // code for display method goes here
    }
}
