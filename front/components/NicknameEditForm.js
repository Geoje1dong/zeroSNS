import React, { useState, useCallback } from 'react';
import {Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {

    const dispatch = useDispatch();
    const [editedName, setEditedName] = useState();
    const {me, isEditingNickname} = useSelector(state => state.user)
    const onChangeNickname = useCallback((e) => {
        setEditedName(e.target.value);
    }, [])
    const onEditNickname = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type:EDIT_NICKNAME_REQUEST,
            data:editedName
        })
    }, [editedName])
    return(
        <Form onSubmit={onEditNickname}>
            <Input addonBefore='닉네임' value={editedName || (me && me.nickname)} onChange={onChangeNickname}/>
            <Button type='primary' htmlType="submit" loading={isEditingNickname}>수정</Button>
        </Form>
    )
}

export default NicknameEditForm