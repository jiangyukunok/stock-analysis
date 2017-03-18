import React from 'react'
import ReactDOM from 'react-dom'
import GetRequest from './say-hello'

var CommentBox = React.createClass({
    render: function() {
        return (
            <div>
                <GetRequest />
                <div className="commentBox">
                    I am a Yukun Jiang.
                </div>
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox />,
    document.getElementById('app-client')
);