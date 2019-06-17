import {all, takeLatest, fork, call, put, delay} from 'redux-saga/effects';
import {ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_FAILURE, ADD_COMMENT_SUCCESS} from '../reducers/post';
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
function addpostAPI(){
    //return axios.post('/login');
}

function* addpost() {
    try{
        //call(addpostAPI);
        yield delay(2000);
        yield put({
            type:ADD_POST_SUCCESS
        })
    }catch(e) {
        console.log(e);
        yield put({
            TYPE:ADD_POST_FAILURE
        })
            
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addpost)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ]);
}