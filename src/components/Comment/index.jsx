import React from 'react';
import './index.css';

const Comment = (props) => {
    return (
        <div className="comment" data-testid="comment">
            <div className="comment-header">
                <h4 className="comment-title">{props.name}</h4>
                <span>{props.email}</span>
            </div>
            <p>{props.body}</p>
        </div>
    )
}

export default Comment;