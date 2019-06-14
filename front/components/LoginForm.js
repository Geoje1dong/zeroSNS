import React, {useState, useCallback} from 'react';
import { Form, Input, Button } from 'antd';
import { useInput } from '../pages/Signup';
import { useDispatch } from 'react-redux';
import {loginAction, logoutAction} from '../reducers/user'
const LoginForm = () => {
    const [Id, onChangeId] = useInput('');
    const [Password, onChangePassword] = useInput('');
    const dispatch = useDispatch();

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch(loginAction);
    },[Id, Password])

    return(
        <>
        <Form onSubmit={onSubmitForm}>
            <div>
                <label htmlFor='user-id'>아이디</label>
                <br />
                <Input name='user-id' value={Id} required onChange={onChangeId} />
            </div>
            <div>
                <label htmlFor='user-password'>패스워드</label>
                <br />
                <Input name='user-password' value={Password} type='password' required onChange={onChangePassword} />
            </div>
            <div>
                <Button type='primary' htmlType='submit' loading={false}>로그인</Button>
            </div>
        </Form>
        </>
    )
}

export default LoginForm;