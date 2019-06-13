import React from 'react';
import { dummy } from '../components/dummy';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    return (
        <React.Fragment>
            <div>
                {dummy.isLoggedIn &&<PostForm />}
                {dummy.mainPosts.map((c)=> {return <PostCard key={c} post={c}/>})}
            </div>
        </React.Fragment>
    )
}

export default Home;