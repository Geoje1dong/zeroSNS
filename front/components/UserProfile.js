import React from 'react';
import {Card, Avatar} from 'antd';
import {dummy} from '../components/dummy';

const UserProfile = () => {
    return(
        <Card
            actions={[
                <div key='twit'>twit: {dummy.Post.length}</div>,
                <div key='following'>팔로잉: {dummy.Followings.length}</div>,
                <div key='follower'>팔로워: {dummy.Followers.length}</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                title={dummy.nickname}
            />
        </Card>
    )
}

export default UserProfile