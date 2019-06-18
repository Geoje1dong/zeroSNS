import React, {useState, useCallback} from 'react';
import { Form, Input, Button } from 'antd';
import { useInput } from '../pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import {loginRequestAction} from '../reducers/user'
import Link from 'next/link';
import styled from 'styled-components';

const LoginForm = () => {
    const [Id, onChangeId] = useInput('');
    const [Password, onChangePassword] = useInput('');
    const { isLoggingIn } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch(loginRequestAction({
            Id, Password,
        }));
    },[Id, Password])

    return(
        <>
        <StyledBox>
            <StyledIntroBox>
                써본 사람들의 놀이터, 인스타 클론!
            </StyledIntroBox>
            <StyledLoginBox>
                <Form onSubmit={onSubmitForm}>
                    <h1>인스타 클론에 로그인</h1>
                    <p>아래에 세부 정보를 입력하십시오.</p>
                    <div>
                        <label htmlFor='user-id'>아이디</label>
                        <Input name='user-id' value={Id} required onChange={onChangeId} />
                    </div>
                    <div>
                        <label htmlFor='user-password'>패스워드</label>
                        <Input name='user-password' value={Password} type='password' required onChange={onChangePassword} />
                    </div>
                    <div>
                        <Button type='primary' htmlType='submit' loading={isLoggingIn}>로그인</Button>
                    </div>
                </Form>
            </StyledLoginBox>
            <StyledSignUp>
                <p>계정이 없나요?</p>
                <Link href='/signup'><a>회원가입</a></Link>
            </StyledSignUp>
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

const StyledSignUp = styled.div`
    display:flex;
    align-items:center;
    width:200px;
    position:absolute;
    top:5%;
    right:5%;
    p{
        display:flex;
        flex:1;
        margin:0;
    }
    a{
        padding: 0px 20px;
        border-radius:32px;
        line-height:40px;
        height:40px;
        color:#000;
        border:1px solid rgba(0,0,0,0.5);
        display:inline-block;
        width:100px;
        text-align:center;
    }
`

export default LoginForm;