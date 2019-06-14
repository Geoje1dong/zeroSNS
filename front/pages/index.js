import React,{useEffect} from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from 'react-redux';

const Home = () => {
    const { user, isLoggedIn } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(loginAction)
    //     dispatch(logoutAction)
    // },[]);
    return (
        <React.Fragment>
            <div>
                {isLoggedIn &&<PostForm />}
                {mainPosts.map((c)=> {return <PostCard key={c} post={c}/>})}
            </div>
        </React.Fragment>
    )
}

export default Home;