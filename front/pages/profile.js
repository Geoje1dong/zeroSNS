import React, {useEffect, useCallback} from 'react';
import {Button, List, Card, Icon} from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOW_USER_REQUEST } from '../reducers/user';
import {LOAD_USER_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../components/PostCard'

const Profile = () => {
    const dispatch = useDispatch();
    const {me, followerList, followingList, hasMoreFollowing, hasMoreFollower} = useSelector(state => state.user);
    const {mainPosts} = useSelector(state => state.post)

    const onUnfollow = useCallback(userId => () => {
        dispatch({
            type:UNFOLLOW_USER_REQUEST,
            data:userId
        })
    }, [])

    const onRemoveFollower = useCallback(userId => () => {
        dispatch({
            type:REMOVE_FOLLOW_USER_REQUEST,
            data:userId
        })
    }, [])

    const loadMoreFollowings = useCallback(() => {
        dispatch({
            type:LOAD_FOLLOWINGS_REQUEST,
            offset: followingList.length
        })
    }, [followingList.length])
    const loadMoreFollowers = useCallback(() => {
        dispatch({
            type:LOAD_FOLLOWERS_REQUEST,
            offset: followerList.length
        })
    }, [followerList.length])
    return(
        <React.Fragment>
            <NicknameEditForm />
            <List
                grid={{gutter:4, xs:2, md:3}}
                size='small'
                header={<div>팔로워 목록</div>}
                loadMore={hasMoreFollower && <Button onClick={loadMoreFollowers}>더 보기</Button>}
                bordered
                dataSource={followerList}
                renderItem={item => (
                    <List.Item >
                        <Card actions={[<Icon key='stop' type='stop' onClick={onRemoveFollower(item.id)}/>]}>
                            <Card.Meta description={item.nickname} />
                        </Card>
                    </List.Item>
                )}
            />
            <List
                grid={{gutter:4, xs:2, md:3}}
                size='small'
                header={<div>팔로잉 목록</div>}
                loadMore={hasMoreFollowing && <Button onClick={loadMoreFollowings}>더 보기</Button>}
                bordered
                dataSource={followingList}
                renderItem={item => (
                    <List.Item >
                        <Card actions={[<Icon key='stop' type='stop' onClick ={onUnfollow(item.id)}/>]}>
                            <Card.Meta description={item.nickname} />
                        </Card>
                    </List.Item>
                )}
            />
            <div>
                {mainPosts.map((c)=> {return <PostCard key={c.id} post={c}/>})}
            </div>
        </React.Fragment>
    )
}

Profile.getInitialProps = async(context) => {
    const state = context.store.getState();
    context.store.dispatch({
        type:LOAD_FOLLOWERS_REQUEST,
        data:state.user.me && state.user.me.id
    })
    context.store.dispatch({
        type:LOAD_FOLLOWINGS_REQUEST,
        data:state.user.me && state.user.me.id
    })
    context.store.dispatch({
        type:LOAD_USER_POSTS_REQUEST,
        data:state.user.me && state.user.me.id
    })
}

export default Profile