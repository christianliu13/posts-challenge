import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Comment from '../../components/Comment'


export default class Post extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        let comments = [];
        
        if (this.props.comments && this.props.comments.length > 0){
            this.props.comments.forEach((com) => {
                comments.push(
                    <Comment 
                            key={com.id}
                            body={com.body}
                            name={com.name}
                            email={com.email}
                    />  
                )
                })
        }
        return(
            <div className='post' data-testid="post">
                <Link to={`/posts?postId=${this.props.id}`}>
                    <div className='post-header'> 
                        <h3>{this.props.title}</h3>
                    </div>
                    <p>{this.props.body}</p>
                    <div className='comments-container'>
                        {comments}
                    </div>
                </Link>
            </div>
        )
    }

};
