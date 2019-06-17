import {all, takeLatest, fork, call, put, delay} from 'redux-saga/effects';
import {ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE} from '../reducers/post';
import axios from 'axios';

function* addpostAPI(){
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
    ]);
}