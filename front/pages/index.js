import React,{useEffect} from 'react';
import { dummy } from '../components/dummy';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user'

const Home = () => {
    const dispatch = useDispatch();
    const {user, isLoggedIn} = useSelector(state => state.user);
    console.log(user);
    useEffect(() => {
        dispatch(loginAction)
        // dispatch(logoutAction)
    },[]);
    return (
        <React.Fragment>
            <div>
                { user ? <div>로그인 {user.nickname}</div> : <div>로그아웃 하여주세요.</div>}
                {dummy.isLoggedIn &&<PostForm />}
                {dummy.mainPosts.map((c)=> {return <PostCard key={c} post={c}/>})}
            </div>
        </React.Fragment>
    )
}

export default Home;