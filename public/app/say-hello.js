import React from 'react'
import $ from 'jquery'

var GetRequest = React.createClass({
    getInitialState: function(){
        return {
            testMessage: ''
        }
    },
    componentDidMount: function(){
        $.get('/getData', function(res){
            this.setState({
                testMessage: res.sendData
            })
        }.bind(this));
    },
    render: function(){
        return (
            <div>{this.state.testMessage}</div>
        )
    }
});

module.exports = GetRequest;