function Barcharts(id, subjects) {

    //subjects.forEach
    var barchartElements = d3.select(id);
    var barcharts = [];

    this.addChart = function(barchart) {
        barchartElements.append("svg");
    };

}
