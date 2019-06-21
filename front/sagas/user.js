import {all, fork, takeLatest,takeEvery, call, put, take, delay} from 'redux-saga/effects';
//put은 dispatch 기능과 동일
//call 동기 호출
//fork 비동기 호출
import {LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from '../reducers/user';
import axios from 'axios';

//로그인 
function loginAPI(){
    return axios.post('/login');
}

function* login(){
    try{    //성공
        //yield call(loginAPI);
        yield delay(2000);
        yield put({
            type:LOG_IN_SUCCESS
        });
    } catch(e) {    //실패
        console.log(e);
        yield put({
            type:LOG_IN_FAILURE
        });
    }
}

function* watchLogin(){
    yield takeEvery(LOG_IN_REQUEST, login)
}

//회원가입
function signUpAPI(signUpData){
    return axios.post('http://localhost:8080/api/user/', signUpData);
}

function* signUp(action){
    try{    //성공
        yield call(signUpAPI, action.data);
        yield put({
            type:SIGN_UP_SUCCESS
        });
    } catch(e) {    //실패
        console.log(e);
        yield put({
            type:SIGN_UP_FAILURE
        });
    }
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
    ]);
}