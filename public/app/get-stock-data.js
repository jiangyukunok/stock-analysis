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
                        categories: this.state.stockData.time_data,
                        tickInterval: 22, //each month 8 days for weekends
                        plotLines: [
                            {
                                name: 'stock good news',
                                color: 'yellow', // Color value
                                value: 15,
                                width: 8,
                                label: {
                                    text: 'event 1'
                                },
                                events: {
                                    mouseover: function(e){
                                        $('#events').html('<h4>' + this.axis.plotLinesAndBands[0].options.name + '<h4/>');
                                        //console.log(this);
                                    },
                                    mouseout: function(e){
                                        $('#events').empty();
                                    }
                                }
                            },
                            {   
                                name: 'stock bad news',
                                color: 'yellow',
                                value: 30,
                                width: 8,
                                label: {
                                    text: 'event 2'
                                },
                                events: {
                                    mouseover: function(e){
                                        $('#events').html('<h4>' + this.axis.plotLinesAndBands[1].options.name + '<h4/>');
                                    },
                                    mouseout: function(e){
                                        $('#events').empty();
                                    }
                                }
                            }
                        ]
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
                        data: this.state.stockData.price_data
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
                <form onSubmit={this.handleSubmit}>
                    <label>
                      Ticker:
                      <input type="text" value={this.state.ticker} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Get Chart" />
                </form>
                <div id="stockPlot"></div>
                <div id="events"></div>
            </div>
        )
    }
});

module.exports = GetStockData;