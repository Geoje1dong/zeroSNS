import React,{ useState, useCallback,useEffect } from 'react';
import {Button, Card, Avatar, Icon, List, Input, Form, Comment } from 'antd';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux'
import {LOAD_COMMENTS_REQUEST, ADD_COMMENT_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST} from '../reducers/post'
import styled from 'styled-components';
import PostImages from './PostImages';

const PostCard = ({ post }) => {
    const [commnetFormOpened, setCommentFormOpend] = useState(false);
    const [commentText, setCommentText] = useState('');
    const {me}= useSelector(state => state.user);
    const {commentAdded, isAddingComment} = useSelector(state => state.post);
    const dispatch = useDispatch();
    
    const liked = me && post.Likers && post.Likers.find(liker => liker.id === me.id);

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
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content: commentText,
            },
        });
    }, [me && me.id, commentText]);

    useEffect(()=> {
        setCommentText('');
    },[commentAdded == true])

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, [])

    const onToggleLike = useCallback(() => {
        if(!me){
            return alert('로그인이 필요합니다.')
        }
        if(liked){   //좋아요 누른 상태
            dispatch({
                type:UNLIKE_POST_REQUEST,
                data:post.id,
            })
        }else{  //좋아요 누르지 않는 상태
            dispatch({
                type:LIKE_POST_REQUEST,
                data:post.id,
            })
        }
    }, [me && me.id, post && post.id, liked])

    return(
        <>
            <StyledBox>
                <Card
                    key={+post.id}
                    // cover={post.Images[0] && <img alt='example' src={`http://localhost:8080/${post.Images[0].src}`} />}
                    cover={post.Images[0] && <PostImages images={post.Images}/>}
                    actions={[
                        <Icon type='retweet' key='retweet' />,
                        <Icon type='heart' key='heart' theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" onClick={onToggleLike}/>,
                        <Icon type='message' key='message' onClick={onToggleComment} />,
                        <Icon type='ellipsis' key='ellipsis' />,
                    ]}
                >
                    <Card.Meta 
                        avatar={
                            <Link href={{pathname:'/user', query: {id:post.User.id}}} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>
                        }
                        title={post.User.nickname}
                        description={(
                            
                            <HashTagBox>
                                <Button>팔로우</Button>
                                {post.content.split(/(#[^\s]+)/g).map((v) => {
                                    if(v.match(/#[^\s]+/)){
                                        return(
                                            <Link href={{pathname:'/hashtag', query: {tag:v.slice(1)}}} key={v} as={`/hashtag/${v.slice(1)}`}><a>{v}</a></Link>
                                        )
                                    }
                                    return v;
                                })}
                            </HashTagBox>
                        )}
                    />
                </Card>
                {commnetFormOpened && (
                    <>
                        <Form onSubmit={onSubmitComment}>
                            <Form.Item>
                                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
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
    .ant-card-meta{
        position:relative;
    }
`

const HashTagBox = styled.div`
    >button{
        position:absolute;
        right:0;
        top:0;
    }
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