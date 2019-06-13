import React from 'react';
import { Input, Form, Button, Card, Avatar, Icon } from 'antd';

const dummy = {
    isLoggedIn: true,
    imagePaths: [],
    mainPosts: [{
        User: {
            id:1,
            nickname:'제로초',
        },
        content:'첫번째 게시글',
        img:'https://m.foxtoon.com/cdn/board/?img=20190515104546_7a30920fb218edb10d11cf723bd72b24.gif',
    }],
}

const Home = () => {
    return (
        <React.Fragment>
            <div>
                {dummy.isLoggedIn &&
                    <Form encType='multipart/form-data'>
                        <Input.TextArea maxLength={150} placeholder='어떤 신기한 일이 있었나요?' />
                        <div>
                            <input type="file" multiple hidden />
                            <Button>이미지 업로드</Button>
                            <Button type='primary' htmlType='submit'>짹쨱</Button>
                        </div>
                        <div>
                            {dummy.imagePaths.map((v, i) => {
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
                }
                {dummy.mainPosts.map((c)=> {
                    return(
                        <Card
                            key={+c.createdAt}
                            cover={c.img && <img alt='example' src={c.img} />}
                            actions={[
                                <Icon type='retweet' key='retweet' />,
                                <Icon type='heart' key='heart' />,
                                <Icon type='message' key='message' />,
                                <Icon type='ellipsis' key='ellipsis' />,
                            ]}
                            extra={<Button>팔로우</Button>}
                        >
                            <Card.Meta 
                                avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
                                title={c.User.nickname}
                                description={c.content}
                            />
                        </Card>
                    );
                })}
            </div>
        </React.Fragment>
    )
}

export default Home;