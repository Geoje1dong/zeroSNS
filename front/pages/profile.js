import React, {useEffect, useCallback} from 'react';
import {Button, List, Card, Icon} from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOW_USER_REQUEST } from '../reducers/user';
import {LOAD_USER_POSTS_REQUEST} from '../reducers/post';
import PostCard from '../components/PostCard'

const Profile = () => {
    const dispatch = useDispatch();
    const {me, followerList, followingList} = useSelector(state => state.user);
    const {mainPosts} = useSelector(state => state.post)
    useEffect(() => {
        if(me){
            dispatch({
                type:LOAD_FOLLOWERS_REQUEST,
                data:me.id
            });
            dispatch({
                type:LOAD_FOLLOWINGS_REQUEST,
                data:me.id
            });
            dispatch({
                type:LOAD_USER_POSTS_REQUEST,
                data:me.id
            });
        }
    }, [me && me.id])

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
    return(
        <React.Fragment>
            <NicknameEditForm />
            <List
                grid={{gutter:4, xs:2, md:3}}
                size='small'
                header={<div>팔로워 목록</div>}
                loadMore={<Button>더 보기</Button>}
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
                loadMore={<Button>더 보기</Button>}
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

export default Profile