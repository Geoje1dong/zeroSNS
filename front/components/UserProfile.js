import React,{useCallback} from 'react';
import {Card, Avatar, Button} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {logoutRequestAction} from '../reducers/user';
const UserProfile = () => {
    const {me} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const onLogout = useCallback(()=>{
        dispatch(logoutRequestAction)
    },[])
    return(
        <Card
            actions={[
                <div key='twit'>twit: {me.Posts.length}</div>,
                <div key='following'>팔로잉: {me.Followings.length}</div>,
                <div key='follower'>팔로워: {me.Followers.length}</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile