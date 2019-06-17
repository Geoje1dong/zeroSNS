import React,{useCallback, useState, useEffect} from 'react';
import { Input, Form, Button} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {addPostRequestAction} from '../reducers/post'

import { useInput } from '../pages/Signup';

const PostForm = () => {
    const {imagePaths, isAddingPost, postAdded} = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const onChangeText = useCallback((e) => {
        setText(e.target.value)
    },[])

    useEffect(()=> {
        setText('')
    },[postAdded === true]);
    
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch(addPostRequestAction({
            text,
        }));
    },[])


    return(
        <>
            <Form encType='multipart/form-data' onSubmit={onSubmitForm}>
                <Input.TextArea maxLength={150} placeholder='어떤 신기한 일이 있었나요?' value={text} onChange={onChangeText}/>
                <div>
                    <input type="file" multiple hidden />
                    <Button>이미지 업로드</Button>
                    <Button type='primary' htmlType='submit' loading={isAddingPost}>짹쨱</Button>
                </div>
                <div>
                    {imagePaths.map((v) => {
                        return(
                            <div key={v}>
                                <img src={'http://localhost:3000/'+v} style={{width:'200px'}} alt={v} />
                                <div>
                                    <Button>제거</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Form>
        </>
    )
}

export default PostForm;