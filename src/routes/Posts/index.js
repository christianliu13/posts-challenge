import React from 'react';
import Post from '../../components/Post';
import { Link } from 'react-router-dom';

export default class Posts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            post : {},
            comments: [],
            newComment : {
                body: "",
                name: "",
                email: "",
                id: "",
                postId: ""
            },
            id : "",
        }
    }
    
    componentDidMount(){
        const id = new URLSearchParams(window.location.search).get('postId');
        this.setState({id: id})

        this.GetPostData(id);
        this.GetCommentsData(id);
    }

    GetPostData(id){
        const url = new URL('https://jsonplaceholder.typicode.com/posts');
        const params = {id: id}

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

       fetch(url)
        .then(res => {
            if (res.ok)
            return res.json()
        })
        .then(json =>{
            this.setState({post: json[0]})
        })
        .catch(err => {
            this.setState({post:null});
            console.log(err);
        })
    }

    GetCommentsData(id){
        const url = new URL('https://jsonplaceholder.typicode.com/comments');
        const params = {postId: id}

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url)
        .then(res => {
            if(res.ok)
            return res.json()
        })
        .then(json =>{
            this.setState({comments: json})
        })
        .catch(err => {
            this.setState({post:null});
            console.log(err);
        })
    }

    AddComment(e){
        e.preventDefault();
        if (this.state.newComment.body.length > 0 && this.state.newComment.name.length >0 && this.state.newComment.email.length > 0 ) {
            return fetch('https://jsonplaceholder.typicode.com/comments', {method: 'POST'})
            .then((response) => {
                if (response.ok)
                return response.json()
            })
            .then((data) => {
                let temp = this.state.comments;
                temp.push({
                    id: data.id,
                    body: this.state.newComment.body,
                    postId : this.state.id,
                    name: this.state.newComment.name,
                    email: this.state.newComment.email,
                });
                this.setState({comments: temp})
                this.setState({newComment: {
                    body: "",
                    name: "",
                    email: "",
                    id: "",
                    postId: ""
                    }
                })
            })
            .catch((err) => {
                alert('Something went wrong. Please try again.')
                console.log(err);
            })
        }
    }

    LogInput(e){
        const newComment = this.state.newComment;
        let name = e.target.name;
        newComment[name] = e.target.value;
        this.setState({newComment : newComment});
    }

   render() {
        if (this.state.post != null) {
            return (
                <div className='post-container'>
                    <div className="back-button">
                        <Link to={'/'}>
                            <p>Back</p>
                        </Link>
                    </div>
                    <Post 
                        id={this.state.post.id}
                        body={this.state.post.body}
                        title={this.state.post.title}
                        comments={this.state.comments}
                    />
                    <div className="input-container">
                        <form>
                            <div className='pull-left'>
                                <div className='input-row'>
                                    <input data-testid="name-input" type="text" name="name" value={this.state.newComment.name} placeholder="John Smith" onChange={this.LogInput.bind(this)}/>
                                    <input data-testid="email-input" type="email" name="email" value={this.state.newComment.email} placeholder="email@email.com" onChange={this.LogInput.bind(this)}/>
                                </div>
                                <div className='input-row'>
                                    <input data-testid="comment-input" type="text" name="body" value={this.state.newComment.body} placeholder="say something" onChange={this.LogInput.bind(this)}/>
                                </div>
                            </div>
                            <button data-testid="submitbtn" classtype="submit" onClick={this.AddComment.bind(this)}>+</button>
                        </form>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="container">
                    <h2>Invalid Post ID: {this.state.id}</h2>
                    <Link to={'/'}>
                        <h3>Go Home</h3>
                    </Link>
                </div>
            )
        }
        
    }
   
}
