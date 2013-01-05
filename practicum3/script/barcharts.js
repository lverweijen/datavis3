function Barcharts(id, subjects) {

    this.nested;
    this.barchartElements = [];

    this.addChart = function(indicator) {
            this.barchartElements.push(new Barchart(id, indicator, window.data[indicator]));
    };

    for (indicator in window.data) {
        this.addChart(indicator);
    }
}
