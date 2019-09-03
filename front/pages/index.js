import React,{useEffect} from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction, logoutAction} from '../reducers/user';
import LoginFrom from '../components/LoginForm';
import { loadMainPostsRequestAction, LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const { user, me } = useSelector(state => state.user);
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    
    const dispatch = useDispatch();

    const onScroll = () => {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            
            if(hasMorePost){
                const lastId = mainPosts[mainPosts.length - 1].id;
                dispatch({
                    type:LOAD_MAIN_POSTS_REQUEST,
                    lastId
                })
            }            
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    },[mainPosts.length]);

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

Home.getInitialProps = async(context) => {
    context.store.dispatch({
        type:LOAD_MAIN_POSTS_REQUEST
    })

}

export default Home;