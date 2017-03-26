import React from 'react'
import $ from 'jquery'
import Highcharts from 'highcharts'

var GetStockData = React.createClass({
    getInitialState: function(){
        return {
            ticker: '',
            stockData: []
        }
    },
    componentDidMount: function(){
    },
    handleChange: function(event) {
        this.setState({ticker: event.target.value});
    },
    handleSubmit: function(event) {
        event.preventDefault(); // this will prevent from refreshing page!
        this.getChart();
    },
    getChart: function() {
        $.get('/getStockData', {ticker: this.state.ticker}, function(res){
            if(res.sendSuccessful){
                this.setState({
                    stockData: res.sendStockData
                });
                Highcharts.chart('stockPlot', {
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: this.state.ticker + ' Stock Price Year 2016'
                    },
                    subtitle: {
                        text: document.ontouchstart === undefined ?
                                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Stock Price'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'area',
                        name: this.state.ticker,
                        data: this.state.stockData
                    }]
                });
            } else {
                $('#stockPlot').html('<h2>' + res.sendStockData + '</h2>');
            }
        }.bind(this));
    },
    render: function(){
        return (
            <div>
                {/* <div>{this.state.stockData}</div> */}
                <form onSubmit={this.handleSubmit}>
                    <label>
                      Ticker:
                      <input type="text" value={this.state.ticker} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Get Chart" />
                </form>
                <div id="stockPlot"></div>
            </div>
        )
    }
});

module.exports = GetStockData;