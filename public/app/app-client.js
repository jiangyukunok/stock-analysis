import React from 'react'
import ReactDOM from 'react-dom'
import GetRequest from './say-hello'
import GetStockData from './get-stock-data'

var CommentBox = React.createClass({
    render: function() {
        return (
            <div>
                <GetRequest />
                <GetStockData />
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox />,
    document.getElementById('app-client')
);