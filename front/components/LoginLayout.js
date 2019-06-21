import React from 'react';
import { Input, Icon} from 'antd';
import Link from 'next/link';
import UserProfile from '../components/UserProfile';
import styled,{createGlobalStyle} from 'styled-components';
import {useSelector} from 'react-redux';

const LoginLayout = ({ children }) => {
    const GlobalStyle = createGlobalStyle`
        body{
            background:rgb(245, 248, 250);
        }
    `

    const {isLoggedIn} = useSelector(state => state.user);
    return(
        <>
            <GlobalStyle />
            <StyledMenuBox>
                <StyledMenuContainer>
                    <Link href='/'><a><img src='/static/images/logo.png' alt='logo'/></a></Link>
                    <Input.Search enterButton style={{verticalAlign:'middle'}}/>
                    <ul>
                        <li><Link href='/profile'><a><Icon type="user" /></a></Link></li>
                    </ul>
                </StyledMenuContainer>
            </StyledMenuBox>
            <StyledBox>    
                <StyledChildrenBox>
                    { children }
                </StyledChildrenBox>
                <StyledSideBox>
                    {isLoggedIn && <UserProfile />}
                </StyledSideBox>
            </StyledBox>
        </>
    )
}

const StyledBox = styled.div`
    width:935px;
    padding:20px;
    margin:40px auto 40px;
    display:flex;
`

const StyledChildrenBox = styled.div`
    flex:1;
    width:100%;
    margin-right:32px;
`

const StyledSideBox = styled.div`
    max-width:293px;
    width:100%;
`

const StyledMenuBox = styled.div`
    background:#fff;
    border-bottom:1px solid rgba(0,0,0,0.0975);
    height:77px;
    padding:20px;
    display:flex;
`

const StyledMenuContainer = styled.div`
    max-width:935px;
    width:100%;
    margin: 0 auto;
    display:flex;
    align-items:center;
    >span{width:260px;}
    a{
        flex:1;
        i > svg {
            width:24px;
            height:24px;
            fill:#000;
        }
    }
    ul{
        list-style:none;
        flex:1;
        margin:0;
        padding:0;
        > li{
            list-stlye:none;
            text-align:right;
        }
    }

`

export default LoginLayout;
