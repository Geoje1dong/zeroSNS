import React from 'react';
import {Button, Form, Input } from 'antd';

const NicknameEditForm = () => {
    return(
        <Form>
            <Input addonBefore='닉네임'/>
            <Button type='primary'>수정</Button>
        </Form>
    )
}

export default NicknameEditForm