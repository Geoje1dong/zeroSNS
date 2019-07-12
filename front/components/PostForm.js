import React,{useCallback, useState, useEffect, useRef} from 'react';
import { Input, Form, Button, Icon} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE} from '../reducers/post'
import styled from 'styled-components';

const PostForm = () => {
    const {imagePaths, isAddingPost, postAdded} = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const imageInput = useRef();

    const onChangeText = useCallback((e) => {
        setText(e.target.value)
    },[])

    useEffect(()=> {
        setText('')
    },[postAdded === true]);
    
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }

        const formData = new FormData();
        imagePaths.forEach((i) => {
            formData.append('image', i);
        })
        formData.append('content', text);
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    },[text, imagePaths]);

    const onChangeImages = useCallback((e) => {
        console.log(e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f)
        });
        dispatch({
            type:UPLOAD_IMAGES_REQUEST,
            data: imageFormData
        });
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    //이미지 삭제
    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type:REMOVE_IMAGE,
            index,
        })
    }, []);

    return(
        <>
        <StyledPostFormBox>
            <Form encType='multipart/form-data' onSubmit={onSubmitForm}>
                <Input.TextArea maxLength={150} placeholder='어떤 신기한 일이 있었나요?' value={text} onChange={onChangeText}/>
                <div>
                    <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
                    <StyledButton onClick={onClickImageUpload}><Icon type="picture" /></StyledButton>
                    <StyledButton><Icon type="notification" /></StyledButton>
                    {/* <Button type='primary' htmlType='submit' loading={isAddingPost}></Button> */}
                </div>
                <div>
                    {imagePaths.map((v, i) => {
                        return(
                            <div key={v.id}>
                                <img src={'http://localhost:8080/'+v} style={{width:'200px'}} alt={v} />
                                {/* <img src={v} style={{width:'200px'}} alt={v} /> */}
                                <div>
                                    <Button onClick={onRemoveImage(i)}>제거</Button>
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