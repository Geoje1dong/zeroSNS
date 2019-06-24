import {all, takeLatest, fork, call, put, delay} from 'redux-saga/effects';
import {ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_FAILURE, ADD_COMMENT_SUCCESS, LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_FAILURE, LOAD_MAIN_POSTS_SUCCESS} from '../reducers/post';
import axios from 'axios';

function addcommentAPI(){
    
}

function* addcomment(action){
    try{
        yield delay(2000);
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
            },
        })
    } catch(e){
        console.log(e);
        yield put({
            type:ADD_COMMENT_FAILURE
        })
    }
};

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addcomment)
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
        yield put({
            type:ADD_POST_SUCCESS,
            data:result.data,
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

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadMainPosts),
    ]);
}