import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/PostCard';
import { loadUserPostsRequestAction, loadUserRequestAction } from '../reducers/user';
import {Card, Avatar} from 'antd';

const User = ({id}) => {
    const dispatch = useDispatch();
    const {mainPosts} = useSelector(state => state.post)

    useDispatch(() => {
        dispatch(loadUserRequestAction({
            data:id,
        }))
        dispatch(loadUserPostsRequestAction({
            data:id,
        }))
    },[])

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