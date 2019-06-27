import React,{ useState, useCallback,useEffect } from 'react';
import {Button, Card, Avatar, Icon, List, Input, Form, Comment } from 'antd';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux'
import {addCommentRequestAction, LOAD_COMMENTS_REQUEST} from '../reducers/post'
import styled from 'styled-components';

const PostCard = ({ post }) => {
    const [commnetFormOpened, setCommentFormOpend] = useState(false);
    const [commnetText, setCommentText] = useState('');
    const {me}= useSelector(state => state.user);
    const {commentAdded, isAddingComment} = useSelector(state => state.post);
    const dispatch = useDispatch();

    const onToggleComment = useCallback(() => { //댓글창 토글
        setCommentFormOpend(prev => !prev);
        if(!commnetFormOpened){
            dispatch({
                type:LOAD_COMMENTS_REQUEST,
                data: post.id,
            })
        }
    }, [])

    // useCallback 에서 state를 넣을때 []안에 스테이트를 넣어줘야 하는대 객체 넣는건 별로임 그래서 me & me.id
    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if(!me){
            return alert('로그인이 필요합니다.');
        }
        dispatch(addCommentRequestAction({
            postId: post.id,
            content:commnetText,
        }))
    }, [me && me.id, commnetText])

    useEffect(()=> {
        setCommentText('');
    },[commentAdded == true])

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, [])

    return(
        <>
            <StyledBox>
                <Card
                    key={+post.createdAt}
                    cover={post.img && <img alt='example' src={post.img} />}
                    actions={[
                        <Icon type='retweet' key='retweet' />,
                        <Icon type='heart' key='heart' />,
                        <Icon type='message' key='message' onClick={onToggleComment} />,
                        <Icon type='ellipsis' key='ellipsis' />,
                    ]}
                    extra={<Button>팔로우</Button>}
                >
                    <Card.Meta 
                        avatar={
                            <Link href={{pathname:'/user', query: {id:post.User.id}}} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>
                        }
                        title={post.User.nickname}
                        description={(
                            <div>
                                {post.content.split(/(#[^\s]+)/g).map((v) => {
                                    if(v.match(/#[^\s]+/)){
                                        return(
                                            <Link href={{pathname:'/hashtag', query: {tag:v.slice(1)}}} key={v} as={`/hashtag/${v.slice(1)}`}><a>{v}</a></Link>
                                        )
                                    }
                                    return v;
                                })}
                            </div>
                        )}
                    />
                </Card>
                {commnetFormOpened && (
                    <>
                        <Form onSubmit={onSubmitComment}>
                            <Form.Item>
                                <Input.TextArea rows={4} value={commnetText} onChange={onChangeCommentText}/>
                            </Form.Item>
                            <Button type='primary' htmlType="submit" loading={isAddingComment}>댓글 등록</Button>
                        </Form>
                        <List 
                            header = {`${post.Comments ? post.Comments.length : 0} 댓글`}
                            itemLayout='horizontal'
                            dataSource={post.Comments || []}
                            renderItem={item => (
                                <li>
                                    <Comment 
                                        author={item.User.nickname}
                                        avatar={<Link href={{pathname:'/user', query:{id:item.User.id}}} as={`/user/${item.User.id}`}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                                        content={item.content}
                                    />
                                </li>
                            )}
                        />
                    </>
                )}
            </StyledBox>
        </>
    )
}

const StyledBox = styled.div`
    margin-bottom:40px;
`

// PostCard.PropTypes = {
//     post: PropTypes.shape({
//         User: PropTypes.object,
//         content:PropTypes.string,
//         img:PropTypes.string,
//         createAt:PropTypes.object,
//     })
// }

export default PostCard;