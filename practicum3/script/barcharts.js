function Barcharts(id, subjects) {

    this.nested;
    this.barchartElements = [];

    this.addChart = function(indicator) {
            this.barchartElements.push(new Barchart(id, indicator, this.nested[indicator]));
    };

    d3.csv("data/simplified.csv", function(data) {
        this.nested = d3.nest()
            .key(function(d) {return d["Indicator Name"]})
            .key(function(d) {return d["Country Name"]})
            .rollup(function(v) { return v.map(function(d) { return d; }); })
            .map(data);

        for (indicator in this.nested) {
            this.addChart(indicator);
        }
        //console.log(this.nested);
    }.bind(this));
}
