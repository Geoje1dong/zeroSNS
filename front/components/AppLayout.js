import React from 'react';
import { Menu, Input, Button } from 'antd';
import Link from 'next/link';

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
            { children }
        </div>
    )
}

export default AppLayout;