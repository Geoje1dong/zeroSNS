import React,{ useState } from 'react';
import { Menu, Input, Row, Col} from 'antd';
import Link from 'next/link';
import LoginForm from './LoginForm';
import UserProfile from '../components/UserProfile';
import {useSelector} from 'react-redux';

const AppLayout = ({ children }) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
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
            
            <Row gutter={24} style={{margin:'40px 0'}}>
                <Col xs={24} md={6}>{isLoggedIn ? <UserProfile />:<LoginForm />}</Col>
                <Col xs={24} md={12}>{ children }</Col>
                <Col xs={24} md={6}></Col>
            </Row>
        </div>
    )
}

export default AppLayout;