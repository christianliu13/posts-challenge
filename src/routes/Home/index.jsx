import React from 'react';
import Post from '../../components/Post'


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : [],
        }
    }

    componentDidMount(){
        this.PostList();
    }
    
    PostList() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                if (res.ok)
                return res.json();
            })
            .then(data => {
                this.setState({posts : data})
            })
            .catch(err =>{
                alert('Something went wrong. Please refresh the page.')
                console.log(err);
            })
    }
    
    HandleClick(id){
        this.props.history.push('/posts?postId=' + id);
    }
    
    render() {
        const posts = [];
        const options =[];

        this.state.posts.map((post, i) => {
            posts.push(
                    <Post 
                        key={i}
                        id={post.id}
                        body={post.body}
                        title={post.title}
                    />
                )
            options.push(
                <option key={i} value={post.id}>{post.id}</option>
                )
        });

        return (
            <div>
                <div>
                    <div className='select-container'>
                        <select
                            value =''
                            onChange={(e)=> {this.HandleClick(e.target.value)}}
                        >
                            <option value=''>Select a post</option>
                            {options}
                        </select>
                    </div>
                    
                </div>
                <div className='post-container'>
                    {posts}
                </div>
            </div>
        );
    }

}