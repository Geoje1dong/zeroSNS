import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/PostCard';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import {Card, Avatar} from 'antd';

const User = ({id}) => {
    const dispatch = useDispatch();
    const {mainPosts} = useSelector(state => state.post)
    const {userInfo} = useSelector(state => state.user)


    // useEffect(() => {
    //     dispatch({
          
    //     });
    //     dispatch({
          
    //     });
    //   }, []);

    return(
        <div>
            {userInfo 
                ?  (
                    <Card
                        actions={[
                            <div key='twit'>twit: {userInfo.Posts}</div>,
                            <div key='following'>팔로잉: {userInfo.Followings}</div>,
                            <div key='follower'>팔로워: {userInfo.Followers}</div>
                        ]}
                    >
                        <Card.Meta 
                            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                            title={userInfo.nickname}
                        />
                    </Card>
                )
                :
                null
            }
            {mainPosts.map(c => (
                <PostCard key={+c.id} post={c} />
            ))}
        </div>
    )
}

User.getInitialProps = async (context) => {
    const id = parseInt(context.query.id)

    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: id,
    })
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: id,
    })

    return { id }
}

export default User;