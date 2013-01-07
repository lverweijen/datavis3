function Azimuthal(id, projection, mode) {

    var feature;

    this.projection = d3.geo.azimuthal()
        .mode(mode || "orthographic")
        .scale(200)
            .origin([25,35])
            .translate([200,200]);

    this.circle = d3.geo.greatCircle()
        .origin(this.projection.origin());

    var path = d3.geo.path()
        .projection(this.projection);

    var svg = d3.select(id).append("svg:svg")
        .attr("width", 400)
        .attr("height", 400);

    d3.json("data/world-countries.json", function(collection) {
        feature = svg.selectAll("path")
        .data(collection.features)
        .enter().append("svg:path")
        .attr("n",function(d,i){
            return collection.features[i].properties.name;
        })
        .attr("style",function(d,i)
        {
            return "fill:rgb(40,40,40);stroke:rgb(0,0,0)";
        })
        .attr("map",function(d,i)
        {
            return "fill:rgb(40,40,40);stroke:rgb(0,0,0)";
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

        //Find minumum and maximum values in data
        list.forEach(function(i)
        {
            var value = data[$(i).attr("n")];
            if(value>max && !isNaN(value))
                max=value;
            if(value<min && !isNaN(value))
                min=value;
        });

        //Set the map parameter
        list.forEach(function(i)
        {
            $(i).attr("map",function(){
                var value = data[$(i).attr("n")];
                // var color = gradient(0.35,0,1,min,max,value);
                return colors.gradient(0.35,0,1,min,max,value);
                // return "fill: " + color + ";stroke: rgb(0,0,0)";
            });
            $(i).attr("style",$(i).attr("map"));
        });

        if(selection_1 != undefined)
            selection_1.attr("style",colors.country_selected1());
        if(selection_2 != undefined)
            selection_2.attr("style",colors.country_selected2());
        if(selection_3 != undefined)
            selection_3.attr("style",colors.country_selected3());
    }

    function setSelection(d)
    {


        var selection = d3.select(this);

        //NOTE: Warom werkt deze if statement niet?
        if(selection != selection_1 && selection != selection_2 && selection != selection_3)
        {  
            if(selection_3 != undefined)
            {
                old = selection_3;
                selection_3.attr("style",selection_3.attr("map"));
                barcharts.deselectCountry(old.attr("n"));
                graph.deselectCountry(old.attr("n"));
            }

                selection_3 = selection_2;
                selection_2 = selection_1;
                selection_1 = selection;

                if(selection_1 != undefined)
                    selection_1.attr("old",colors.country_selected1());
                if(selection_2 != undefined)
                    selection_2.attr("style",colors.country_selected2());
                if(selection_3 != undefined)
                    selection_3.attr("style",colors.country_selected3());

                //console.log(barcharts);
                barcharts.selectCountry(selection_1.attr("n"));
                barcharts.updateCountries();
                graph.selectCountry(selection_1.attr("n"));
        }
        map.zoom(d);        
    }

    function selectLand()
    {
        //Set Color
        var selection = d3.select(this);
        selection.attr("old",selection.attr("style"));
        selection.attr("style",colors.country_hover());
    }

    function deselectLand()
    {
      //Set Color
      var selection = d3.select(this);
      selection.attr("style",selection.attr("old"));
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
