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
    LOAD_USER_FAILURE,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
    UNFOLLOW_USER_FAILURE,
    UNFOLLOW_USER_SUCCESS,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST,
    REMOVE_FOLLOW_USER_SUCCESS,
    REMOVE_FOLLOW_USER_FAILURE,
    REMOVE_FOLLOW_USER_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    EDIT_NICKNAME_SUCCESS,
    EDIT_NICKNAME_FAILURE,
    EDIT_NICKNAME_REQUEST
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

//유저 팔로우
function followAPI(userId){
    return axios.post(`/user/${userId}/follow`, {}, {
        withCredentials: true,
    });
}

function* follow(action){
    try{
        const result = yield call(followAPI, action.data);
        console.log(result);
        yield put({
            type:FOLLOW_USER_SUCCESS,
            data:result.data
        });
    }catch(e){
        console.log(e);
        yield put({
            type:FOLLOW_USER_FAILURE,
            error:e,
        });
    }
}

function* watchFollow(){
    yield takeEvery(FOLLOW_USER_REQUEST,follow)
}

//언팔로우
function unFollowAPI(userId){
    return axios.delete(`/user/${userId}/follow`, {
        withCredentials: true,
    });
}

function* unFollow(action){
    try{
        const result = yield call(unFollowAPI, action.data);
        yield put({
            type:UNFOLLOW_USER_SUCCESS,
            data:result.data
        });
    }catch(e){
        console.log(e);
        yield put({
            type:UNFOLLOW_USER_FAILURE,
            error:e,
        });
    }
}

function* watchUnFollow(){
    yield takeEvery(UNFOLLOW_USER_REQUEST,unFollow)
}

//나의 팔로잉 정보 불러오기
function loadFollowingsAPI(userId){
    return axios.get(`/user/${userId}/followings`, {
        withCredentials: true,
    });
}

function* loadFollowings(action){
    try{
        const result = yield call(loadFollowingsAPI, action.data);
        yield put({
            type:LOAD_FOLLOWINGS_SUCCESS,
            data:result.data
        });
    }catch(e){
        console.log(e);
        yield put({
            type:LOAD_FOLLOWINGS_FAILURE,
            error:e,
        });
    }
}

function* watchLoadFollowings(){
    yield takeEvery(LOAD_FOLLOWINGS_REQUEST,loadFollowings)
}

//나의 팔로워 정보 불러오기
function loadFollowersAPI(userId){
    return axios.get(`/user/${userId}/followers`, {
        withCredentials: true,
    });
}

function* loadFollowers(action){
    try{
        const result = yield call(loadFollowersAPI, action.data);
        yield put({
            type:LOAD_FOLLOWERS_SUCCESS,
            data:result.data
        });
    }catch(e){
        console.log(e);
        yield put({
            type:LOAD_FOLLOWERS_FAILURE,
            error:e,
        });
    }
}

function* watchLoadFollowers(){
    yield takeEvery(LOAD_FOLLOWERS_REQUEST,loadFollowers)
}

//내 팔로워 삭제
function removeFollowAPI(userId){
    return axios.delete(`/user/${userId}/follower`, {
        withCredentials: true,
    });
}

function* removeFollow(action){
    try{
        const result = yield call(removeFollowAPI, action.data);
        yield put({
            type:REMOVE_FOLLOW_USER_SUCCESS,
            data:result.data
        });
    }catch(e){
        console.log(e);
        yield put({
            type:REMOVE_FOLLOW_USER_FAILURE,
            error:e,
        });
    }
}

function* watchRemoveFollow(){
    yield takeEvery(REMOVE_FOLLOW_USER_REQUEST,removeFollow)
}

//닉네임 수정
function editNicknameAPI(nickname){
    return axios.patch('/user/nickname', {nickname}, {
        withCredentials: true,
    });
}

function* editNickname(action){
    try{
        const result = yield call(editNicknameAPI, action.data);
        yield put({
            type:EDIT_NICKNAME_SUCCESS,
            data:result.data
        });
    }catch(e){
        console.log(e);
        yield put({
            type:EDIT_NICKNAME_FAILURE,
            error:e,
        });
    }
}

function* watchEditNickname(){
    yield takeEvery(EDIT_NICKNAME_REQUEST,editNickname)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),   //로그인
        fork(watchLogout),  //로그아웃
        fork(watchSignUp),  //회원가입
        fork(watchLoadUser),    //내정보 불러오기
        fork(watchFollow),    //팔로우
        fork(watchUnFollow),    //언팔로우
        fork(watchRemoveFollow),    //내가 팔로워 삭제
        fork(watchLoadFollowers),    //내 팔로워 정보 불러오기
        fork(watchLoadFollowings),    //내 팔로잉 정보 불러오기
        fork(watchEditNickname),  //닉네임 수정
    ]);
}