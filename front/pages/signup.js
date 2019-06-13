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
    const onChangeId = () => {};
    const onChangeNick = () => {};
    const onChangePassword = () => {};
    const onChangePasswordCheck = () => {};
    const onChangeTerm = () => {};

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
                        <Input name='user-id' required onChange={onChangeId} />
                    </div>
                    <div>
                        <label htmlFor='user-nick'>닉네임</label>
                        <br />
                        <Input name='user-nick' required onChange={onChangeNick} />
                    </div>
                    <div>
                        <label htmlFor='user-pass'>비밀번호</label>
                        <br />
                        <Input name='user-pass' type='password' required onChange={onChangePassword} />
                    </div>
                    <div>
                        <label htmlFor='user-pass-check'>비밀번호 체크</label>
                        <br />
                        <Input name='user-pass-check' type='password' required onChange={onChangePasswordCheck} />
                    </div>
                    <div>
                        <Checkbox naem='user-term' onChange={onChangeTerm}>회원가입 체크</Checkbox>
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