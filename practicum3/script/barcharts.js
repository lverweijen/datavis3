function Barcharts(id, subjects) {

    var nested;
    var barchartElements = [];

    d3.csv("data/WDIandGDF_csv/simplified.csv", function(data) {
        nested = d3.nest()
            .key(function(d) {return d["Indicator Name"]})
            .key(function(d) {return d["Country Name"]})
            .rollup(function(v) { return v.map(function(d) { return d; }); })
            .map(data);

        for (indicator in nested) {
            barchartElements.push(new Barchart(id, indicator, nested[indicator]));
        }
        console.log(nested);
    }.bind(this));
}
