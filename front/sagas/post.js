import {all, takeLatest, fork, call, put, delay} from 'redux-saga/effects';
import {
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS, 
    ADD_POST_FAILURE, 
    ADD_COMMENT_REQUEST, 
    ADD_COMMENT_FAILURE, 
    ADD_COMMENT_SUCCESS, 
    LOAD_MAIN_POSTS_REQUEST, 
    LOAD_MAIN_POSTS_FAILURE, 
    LOAD_MAIN_POSTS_SUCCESS, 
    LOAD_HASHTAG_POSTS_REQUEST, 
    LOAD_HASHTAG_POSTS_FAILURE, 
    LOAD_HASHTAG_POSTS_SUCCESS, 
    LOAD_USER_POSTS_SUCCESS, 
    LOAD_USER_POSTS_FAILURE, 
    LOAD_USER_POSTS_REQUEST,
    LOAD_COMMENTS_REQUEST,
    LOAD_COMMENTS_FAILURE,
    LOAD_COMMENTS_SUCCESS,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_SUCCESS,
    LIKE_POST_REQUEST,
    LIKE_POST_FAILURE,
    LIKE_POST_SUCCESS,
    RETWEET_REQUEST,
    RETWEET_FAILURE,
    RETWEET_SUCCESS
} from '../reducers/post';
import {ADD_POST_TO_ME} from '../reducers/user'

import axios from 'axios';

// 코멘트 등록
function addcommentAPI(data){
    return axios.post(`/post/${data.postId}/comment`, {content: data.content}, {
        withCredentials: true,  // 크로스 사이트 엑세스 제어 요청 여부
    })
}

function* addcomment(action){
    try{
        const result = yield call(addcommentAPI, action.data);
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
                comment: result.data,
            },
        })
    } catch(e){
        console.error(e);
        yield put({
            type:ADD_COMMENT_FAILURE
        })
    }
};

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addcomment)
}

// 코멘트 불러오기
function loadCommentAPI(postId){
    return axios.get(`/post/${postId}/comments`);
}

function* loadComment(action){
    try{
        const result = yield call(loadCommentAPI, action.data);
        yield put({
            type:LOAD_COMMENTS_SUCCESS,
            data: {
                postId: action.data,
                comments: result.data,
            },
        })
    } catch(e){
        console.log(e);
        yield put({
            type:LOAD_COMMENTS_FAILURE,
            error:e,
        })
    }
};

function* watchLoadCommnet(){
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComment)
}

// 포스터 등록
function addpostAPI(postData){
    return axios.post('/post', postData,{
        withCredentials: true,
    })
}

function* addpost(action) {
    try{
        const result = yield call(addpostAPI, action.data);
        yield put({ //post reducer의 데이터 수정
            type:ADD_POST_SUCCESS,
            data:result.data,
        })
        yield put({ //user reducer의 데이터 수정
            type:ADD_POST_TO_ME,
            data:result.data.id
        })
    }catch(e) {
        console.log(e);
        yield put({
            type:ADD_POST_FAILURE,
            error:e
        })
            
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addpost)
}

//게시글 불러오기
function loaadMainPostsAPI(){
    return axios.get('/posts')
}

function* loaadMainPosts(){
    try{
        const result = yield call(loaadMainPostsAPI)
        yield put({
            type:LOAD_MAIN_POSTS_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.log(e);
        yield put({
            type:LOAD_MAIN_POSTS_FAILURE
        })
    }
}

function* watchLoadMainPosts(){
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loaadMainPosts)
}

//이미지 업로드
function uploadImagesAPI(formData){
    return axios.post('/post/images', formData, {
        withCredentials: true,
    })
}

function* uploadImages(action){
    try{
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type:UPLOAD_IMAGES_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.log(e);
        yield put({
            type:UPLOAD_IMAGES_FAILURE
        })
    }
}

function* watchUploadImages(){
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

//해쉬태그 불러오기
function loadHashtagPostsAPI(tag){
    return axios.get(`/hashtag/${tag}`)
}

function* loadHashtagPosts(action){
    try{
        const result = yield call(loadHashtagPostsAPI, action.data)
        yield put({
            type:LOAD_HASHTAG_POSTS_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.log(e);
        yield put({
            type:LOAD_HASHTAG_POSTS_FAILURE
        })
    }
}

function* watchLoadHashtagPosts(){
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
}

//남의 유저정보 불러오기
function loadUserPostsAPI(id){
    return axios.get(`/user/${id}/posts`)
}

function* loadUserPosts(action){
    try{
        const result = yield call(loadUserPostsAPI, action.data);
        yield put({
            type:LOAD_USER_POSTS_SUCCESS,
            data:result.data,
        })
    }catch(e){
        console.log(e);
        yield put({
            type:LOAD_USER_POSTS_FAILURE
        })
    }
}

function* watchLoadUserPosts(){
    yield takeLatest(LOAD_USER_POSTS_REQUEST,loadUserPosts)
}

//좋아요
function likePostAPI(postId){
    return axios.post(`/post/${postId}/like`, {}, {
        withCredentials:true,
    });
}

function* likePost(action){
    try{
        const result = yield call(likePostAPI, action.data);
        yield put({
            type:LIKE_POST_SUCCESS,
            data:{
                postId: action.data,
                userId: result.data.userId
            },
        })
    }catch(e){
        console.log(e);
        yield put({
            type:LIKE_POST_FAILURE
        })
    }
}

function* watchLikePost(){
    yield takeLatest(LIKE_POST_REQUEST,likePost)
}

//좋아요 취소
function unLikePostAPI(postId){
    return axios.delete(`/post/${postId}/like`, {
        withCredentials:true,
    });
}

function* unLikePost(action){
    try{
        const result = yield call(unLikePostAPI, action.data);
        yield put({
            type:UNLIKE_POST_SUCCESS,
            data:{
                postId: action.data,
                userId: result.data.userId
            },
        })
    }catch(e){
        console.log(e);
        yield put({
            type:UNLIKE_POST_FAILURE
        })
    }
}

function* watchUnlikePost(){
    yield takeLatest(UNLIKE_POST_REQUEST,unLikePost)
}

//리트윗
function retweetAPI(postId){
    return axios.post(`/post/${postId}/retweet`, {}, {
        withCredentials:true,
    });
}

function* retweet(action){
    try{
        const result = yield call(retweetAPI, action.data);
        yield put({
            type:RETWEET_SUCCESS,
            data:result.data
        })
    }catch(e){
        console.error(e);
        yield put({
            type:RETWEET_FAILURE,
            error:e,
        });
        console.log(e);
        console.dir(e);
        alert(e.response && e.response.data);
    }
}

function* watchRetweet(){
    yield takeLatest(RETWEET_REQUEST,retweet)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadCommnet),
        fork(watchLoadMainPosts),
        fork(watchLoadHashtagPosts),
        fork(watchLoadUserPosts),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchRetweet)
    ]);
}