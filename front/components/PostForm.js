import React from 'react';
import { Input, Form, Button} from 'antd';
import { useSelector } from 'react-redux';
const PostForm = () => {
    const imagePaths = useSelector(state => state.post.imagePaths);

    return(
        <>
            <Form encType='multipart/form-data'>
                <Input.TextArea maxLength={150} placeholder='어떤 신기한 일이 있었나요?' />
                <div>
                    <input type="file" multiple hidden />
                    <Button>이미지 업로드</Button>
                    <Button type='primary' htmlType='submit'>짹쨱</Button>
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