import {all, fork, takeLatest,takeEvery, call, put, take, delay} from 'redux-saga/effects';
//put은 dispatch 기능과 동일
//call 동기 호출
//fork 비동기 호출
import axios from 'axios';
import {
    LOG_IN_REQUEST, 
    LOG_IN_SUCCESS, 
    LOG_IN_FAILURE, 
    SIGN_UP_REQUEST, 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAILURE, 
    LOG_OUT_FAILURE, 
    LOG_OUT_REQUEST, 
    LOG_OUT_SUCCESS, 
    LOAD_USER_REQUEST, 
    LOAD_USER_SUCCESS, 
    LOAD_USER_FAILURE
} from '../reducers/user';

//로그아웃
function logoutAPI(){
    return axios.post('/user/logout', {}, {
        withCredentials:true,   //다른 서버에 쿠키를 보내는걸 허용함
    });
}

function* logout(){
    try{
        yield call(logoutAPI);
        yield put({
            type:LOG_OUT_SUCCESS
        });
    }catch(e){
        console.log(e);
        yield put({
            type:LOG_OUT_FAILURE,
            error:e
        });
    }
}

function* watchLogout(){
    yield takeEvery(LOG_OUT_REQUEST, logout)
}

//로그인 
function loginAPI(loginData){
    return axios.post('/user/login', loginData, {
        withCredentials:true,
    });
}

function* login(action){
    try{    //성공
        const result = yield call(loginAPI, action.data);
        yield put({
            type:LOG_IN_SUCCESS,
            data: result.data,
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
    return axios.post('/user', signUpData);
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

//유저정보 불러오기
function loaduserAPI(userId){
    return axios.get(
        userId ? `/user/${userId}` : '/user/', {
        withCredentials: true,
    });
}

function* loadUser(action){
    try{
        const result = yield call(loaduserAPI, action.data);
        yield put({
            type:LOAD_USER_SUCCESS,
            data:result.data,
            me: !action.data
        });
    }catch(e){
        console.log(e);
        yield put({
            type:LOAD_USER_FAILURE,
            error:e,
        });
    }
}

function* watchLoadUser(){
    yield takeEvery(LOAD_USER_REQUEST,loadUser)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),   //로그인
        fork(watchLogout),  //로그아웃
        fork(watchSignUp),  //회원가입
        fork(watchLoadUser),    //내정보 불러오기
    ]);
}