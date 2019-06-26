import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/PostCard';
import { loadUserRequestAction } from '../reducers/user';
import { loadUserPostsRequestAction } from '../reducers/post';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import {Card, Avatar} from 'antd';

const User = ({id}) => {
    const dispatch = useDispatch();
    const {mainPosts} = useSelector(state => state.post)
    const {userInfo} = useSelector(state => state.user)

    // useEffect(() => {
    //     dispatch(loadUserRequestAction({
    //         data:id,
    //     }))
    //     dispatch(loadUserPostsRequestAction({
    //         data:id,
    //     }))
    // },[]);

    useEffect(() => {
        dispatch({
          type: LOAD_USER_REQUEST,
          data: id,
        });
        dispatch({
          type: LOAD_USER_POSTS_REQUEST,
          data: id,
        });
      }, []);

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
                <PostCard key={+c.createdAt} post={c} />
            ))}
        </div>
    )
}

User.getInitialProps = async (context) => {
    return { id: parseInt(context.query.id) }
}

export default User;