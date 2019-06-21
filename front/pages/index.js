import React,{useEffect} from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction, logoutAction} from '../reducers/user';
import LoginFrom from '../components/LoginForm';

const Home = () => {
    const { user, isLoggedIn } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    //const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(loginAction)
    //     dispatch(logoutAction)
    // },[]);
    return (
        <React.Fragment>
            {isLoggedIn ?
                <div>
                    <PostForm />
                    {mainPosts.map((c)=> {return <PostCard key={c.User.id} post={c}/>})}
                </div>
                
            :<LoginFrom />}
            
        </React.Fragment>
    )
}

export default Home;