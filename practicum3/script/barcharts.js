function Barcharts(id, subjects) {

    var barchartElements = [];

    this.addChart = function(barchart) {
        barchartElements.push(new Barchart(id));
    };

    for(var i=0; i < 6; i++) {
        this.addChart();
    }

    d3.csv("data/WDIandGDF_csv/simplified.csv", function(data) {
        window.data = data;
        console.log(data);

    })


}
