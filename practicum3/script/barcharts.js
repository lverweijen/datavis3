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

    this.selectCountry = function(countryName, countryCss) {
        this.barchartElements.forEach(function(chart) {
            chart.selectCountry(countryName, countryCss);
        }.bind(this))
    }

    this.deselectCountry = function(countryName) {
        this.barchartElements.forEach(function(chart) {
            chart.deselectCountry(countryName);
        }.bind(this))
    }

    this.updateCountries = function() {
        this.barchartElements.forEach(function(chart) {
            chart.updateCountries();
        }.bind(this))
    }

    this.selectCountry("United States", null);
    //this.selectCountry("United Kingdom", null);
    //this.selectCountry("The Netherlands", null);
    this.updateCountries();
}
