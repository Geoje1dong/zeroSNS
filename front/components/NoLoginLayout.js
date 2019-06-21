import React, {useState, useCallback} from 'react';
import { Form, Input, Button } from 'antd';
import { useInput } from '../pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import {loginRequestAction} from '../reducers/user'
import Link from 'next/link';
import styled from 'styled-components';

const NoLoginLayout = ( {children} ) => {
    

    return(
        <>
        <StyledBox>
            <StyledIntroBox>
                써본 사람들의 놀이터, 인스타 클론!
            </StyledIntroBox>
            <StyledLoginBox>
                { children }
            </StyledLoginBox>
        </StyledBox>
        </>
    )
}

const StyledBox = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    height:100vh;
    position:relative;
`

const StyledIntroBox = styled.div`
    width:30%;
    text-align:center;
    background:#000;
    height:100vh;
    padding:40px;
    color:#fff;
`

const StyledLoginBox = styled.div`
    position:relative;
    width:70%;
    padding:40px;
    > form {
        max-width:580px;
        margin: 0 auto;
        h1{
            line-height:1em;
            margin-bottom:8px;
        }
        p{
            margin-bottom:32px;
        }
        > div{
            
            margin-bottom:24px;
            >label {
                font-weight:700;
                margin-bottom:8px;
                display:block;
            }
            >input {
                padding:15px;
                line-height:22px;
                height:52px;
            }
        }
        > div:last-child{
            text-align:center;
            button{
                padding: 0px 100px;
                border-radius:32px;
                height:50px;
                margin-top:22px;
            }
        }
    }
`



export default NoLoginLayout;