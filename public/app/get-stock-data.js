import React from 'react'
import $ from 'jquery'

var GetStockData = React.createClass({
    getInitialState: function(){
        return {
            timeData: [],
            stockData: []
        }
    },
    componentDidMount: function(){
        $.get('/getStockData', function(res){
            this.setState({
                timeData: res.sendStockData.time_data,
                stockData: res.sendStockData.price_data
            })
        }.bind(this));
    },
    render: function(){
        return (
            <div>
                <div>{this.state.timeData[1]}</div>
                <div>{this.state.stockData[1]}</div>
            </div>
        )
    }
});

module.exports = GetStockData;