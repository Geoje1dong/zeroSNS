import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    }, [])
    return [value, handler]
};

const Signup = () => {
    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [termError, setTermError] = useState('');
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true)
        }
    }, [password, passwordCheck, term]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value)
    }, [password]);
    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked)
    }, []);

    const formStyle = {
        width: '1000px',
        margin: '100px auto'
    }

    return(
        <React.Fragment>
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
                    {passwordError && <div>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <label htmlFor='user-pass-check'>비밀번호 체크</label>
                    <br />
                    <Input name='user-pass-check' value={passwordCheck} type='password' required onChange={onChangePasswordCheck} />
                    {passwordError && <div>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox naem='user-term' value={term} onChange={onChangeTerm}>회원가입 체크</Checkbox>
                    {termError && <div>약관에 동의하셔야 합니다.</div>}
                </div>
                <div>
                    <Button type='primary' htmlType='submit'>가입하기</Button>
                </div>
            </Form>
        </React.Fragment>
    )
}

export default Signup