import React,{useCallback} from 'react';
import { Form, Input, Button } from 'antd';
import { useInput } from '../pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import {loginRequestAction} from '../reducers/user'
import Link from 'next/link';
import styled from 'styled-components';

const LoginForm = () => {
    const [Id, onChangeId] = useInput('');
    const [Password, onChangePassword] = useInput('');
    const { isLoggingIn, me } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch(loginRequestAction({
            Id, Password,
        }));
    },[Id, Password])

    return(
        <>
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
            <StyledSignUp>
                <p>계정이 없나요?</p>
                <Link href='/signup'><a>회원가입</a></Link>
            </StyledSignUp>
        </>
    )
}

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