function Barcharts(id, subjects) {

    var barchartElements = [];

    this.addChart = function(barchart) {
        barchartElements.push(new Barchart(id));
    };

    for(var i=0; i < 6; i++) {
        this.addChart();
    }


}
