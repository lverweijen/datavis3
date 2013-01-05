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
        .attr("d", clip);

    feature.append("svg:title")
        .text(function(d) { return d.properties.name; });
    });

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
