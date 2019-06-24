import React,{useCallback, useState, useEffect} from 'react';
import { Input, Form, Button, Icon} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {addPostRequestAction} from '../reducers/post'
import styled from 'styled-components';
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
        if (!text || !text.trim()) {
            alert('게시글을 작성하세요.');
        }
        dispatch(addPostRequestAction({
            content:text,
        }));
    },[text]);

    return(
        <>
        <StyledPostFormBox>
            <Form encType='multipart/form-data' onSubmit={onSubmitForm}>
                <Input.TextArea maxLength={150} placeholder='어떤 신기한 일이 있었나요?' value={text} onChange={onChangeText}/>
                <div>
                    <input type="file" multiple hidden />
                    <StyledButton><Icon type="picture" /></StyledButton>
                    <StyledButton><Icon type="notification" /></StyledButton>
                    {/* <Button type='primary' htmlType='submit' loading={isAddingPost}></Button> */}
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
        </StyledPostFormBox>
        </>
    )
}

const StyledPostFormBox = styled.div`
    background:#fff;
    padding:20px;
    > textarea{
        background-color:rgba(230,236,240,0);
        resize:none;
    }
    margin-bottom:40px;
`

const StyledButton = styled.button`
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    margin-top:10px;
    margin-right:10px;
    cursor:pointer;
    svg{
        width:20px;
        height:auto;
        fill:rgba(29,161,242,0.8);
    }
    &hover{
        svg{
            fill:rgba(29,161,242,1);
        }
    }
`

export default PostForm;