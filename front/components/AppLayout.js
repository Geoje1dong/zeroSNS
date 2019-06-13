import React from 'react';
import { Menu, Input, Button, Row, Col, Card, Avatar } from 'antd';
import Link from 'next/link';

const dummy = {
    nickname: '제로초',
    Post: [],
    Followings:[],
    Followers:[]
}

const AppLayout = ({ children }) => {
    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item key='home'><Link href='/'><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key='profile'><Link href='/profile'><a>프로필</a></Link></Menu.Item>
                <Menu.Item key='mail'>
                    <Input.Search enterButton style={{verticalAlign:'middle'}}/>
                </Menu.Item>
                <Menu.Item key='signup'><Link href='/signup'><a>회원가입</a></Link></Menu.Item>
            </Menu>
            
            <Row>
                <Col xs={24} md={6}>
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
                </Col>
                <Col xs={24} md={12}>{ children }</Col>
                <Col xs={24} md={6}></Col>
            </Row>
        </div>
    )
}

export default AppLayout;