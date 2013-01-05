function Barcharts(id, subjects) {

    this.nested;
    this.barchartElements = [];

    this.addChart = function(indicator) {
            this.barchartElements.push(new Barchart(id, indicator, window.data[indicator]));
    };

    console.log(window.data);

    for (indicator in window.data) {
        console.log(indicator);
        this.addChart(indicator);
    }
}
