function Azimuthal(id, projection, mode) {

    var feature;

    this.projection = d3.geo.azimuthal()
        .mode(mode || "orthographic")
        .scale(projection || 400);

    this.circle = d3.geo.greatCircle()
        .origin(this.projection.origin());

    var path = d3.geo.path()
        .projection(this.projection);

    var svg = d3.select(id).append("svg:svg")
        .attr("width", 800)
        .attr("height", 400);

    d3.json("data/world-countries.json", function(collection) {
        feature = svg.selectAll("path")
        .data(collection.features)
        .enter().append("svg:path")
        .attr("n",function(d,i){
            return collection.features[i].properties.name;
        })
        .style("fill",function(d,i)
        {
            return "rgb(40,40,40)";
        })
        .style("stroke",function(d,i)
        {
            return "rgb(0,0,0)";
        })        
        .attr("d", clip)
        .on("click",setSelection)
        .on("mouseover", selectLand)
        .on("mouseout" , deselectLand);

    feature.append("svg:title")
        .text(function(d) { return d.properties.name; });
    });

    this.loadMap = function(data)
    {
        var list = svg.selectAll("path")[0];
        
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
            $(i).attr("style",function(d,index,rr){
                var value = data[$(i).attr("n")];
                var color = gradient(0.35,0,1,min,max,value);
                return "fill: " + color + ";stroke: rgb(0,0,0)";
            });
        });
    }

    function setSelection()
    {
        var selection = d3.select(this);
        console.log(selection.attr("n"));
        selected_country = selection.attr("n");
    }

    function selectLand()
    {
      //Set Color
      var selection = d3.select(this);
      selection.attr("oldcolor",selection.style("fill"));
      selection.style("fill","green");
    }

    function deselectLand()
    {
      //Set Color
      var selection = d3.select(this);
      var tmp = selection.attr("name");
      selection.style("fill",selection.attr("oldcolor"));
    }

    var m0, o0;

    this.mousedown = function () {
        //this.m0 = [d3.event.pageX, d3.event.pageY];
        //this.o0 = this.projection.origin();
        m0 = [d3.event.pageX, d3.event.pageY];
        o0 = this.projection.origin();
        d3.event.preventDefault();
    }

    this.mousemove = function() {
        if (m0) {
            var m1 = [d3.event.pageX, d3.event.pageY],
                o1 = [o0[0] + (m0[0] - m1[0]) / 8, o0[1] + (m1[1] - m0[1]) / 8];
            this.projection.origin(o1);
            this.circle.origin(o1)
            refresh();
        }
    }

    this.mouseup = function() {
        if (m0) {
            this.mousemove();
            m0 = null;
        }
    }

    d3.select(id)
        .on("mousemove", this.mousemove.bind(this))
        .on("mouseup", this.mouseup.bind(this))
        .on('mousedown', this.mousedown.bind(this));

    function refresh(duration) {

        (duration ? feature.transition().duration(duration) : feature).attr("d", clip);
    }

    var clip = function (d) {
        return path(this.circle.clip(d));
    }.bind(this)
}
