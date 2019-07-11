import React,{useEffect} from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction, logoutAction} from '../reducers/user';
import LoginFrom from '../components/LoginForm';
import { loadMainPostsRequestAction } from '../reducers/post';

const Home = () => {
    const { user, me } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    //const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(loginAction)
    //     dispatch(logoutAction)
    // },[]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadMainPostsRequestAction);
    },[])
    return (
        <React.Fragment>
            {me ?
                <div>
                    <PostForm />
                    {mainPosts.map((c)=> {return <PostCard key={c.id} post={c}/>})}
                </div>
                
            :<LoginFrom />}
            
        </React.Fragment>
    )
}

export default Home;