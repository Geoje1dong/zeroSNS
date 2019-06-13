import React, { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { Form, Input, Checkbox, Button } from 'antd';
const Signup = () => {
    const [id, setId] = useState('');
    const [nick,setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);

    const onSubmit = () => {};
    const onChangeId = (e) => {
        setId(e.target.value);
    };
    const onChangeNick = (e) => {
        setNick(e.target.value)
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    };
    const onChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value)
    };
    const onChangeTerm = (e) => {
        setTerm(e.target.value)
    };

    const formStyle = {
        width: '1000px',
        margin: '100px auto'
    }

    return(
        <React.Fragment>
            <AppLayout>
                <Form onSubmit={onSubmit} style={formStyle}>
                    <div>
                        <label htmlFor='user-id'>아이디</label>
                        <br />
                        <Input name='user-id' value={id} required onChange={onChangeId} />
                    </div>
                    <div>
                        <label htmlFor='user-nick'>닉네임</label>
                        <br />
                        <Input name='user-nick' value={nick} required onChange={onChangeNick} />
                    </div>
                    <div>
                        <label htmlFor='user-password'>비밀번호</label>
                        <br />
                        <Input name='user-password' value={password} type='password' required onChange={onChangePassword} />
                    </div>
                    <div>
                        <label htmlFor='user-pass-check'>비밀번호 체크</label>
                        <br />
                        <Input name='user-pass-check' value={passwordCheck} type='password' required onChange={onChangePasswordCheck} />
                    </div>
                    <div>
                        <Checkbox naem='user-term' value={term} onChange={onChangeTerm}>회원가입 체크</Checkbox>
                    </div>
                    <div>
                        <Button type='primary' htmlType='submit'>가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </React.Fragment>
    )
}

export default Signup