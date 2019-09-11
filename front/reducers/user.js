import produce from 'immer'

export const initialState ={
    isLoggingOut: false,    //로그아웃 시도중
    isLoggingIn: false, //로그인 시도중
    logInErrorReason: '',   //로그인 에러 사유
    logoutErrorReason:'',   //로그아웃 에러 사유
    signedUp: false,    //회원가입 성공
    isSigningUp: false, //회원가입 시도중
    signUpErrorReason: '',  // 회원가입 실패 사유
    followingList:[],   //팔로잉 리스트
    followerList: [],   //팔로워 리스트
    me: null,   //내정보
    userInfo: null, //남의 정보]
    isEditingNickname: false,    //닉네임 변경중
    editNicknameErrorReason:'', //닉네임 변경 에러 사유
    hasMoreFollower:false,  //팔로워 더보기 버튼
    hasMoreFollowing:false, //팔로잉 더보기 버튼
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';  //로그인
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';  // 로드 유저 데이터 
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';   //회원가입
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';   //로그 아웃
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';  // 나의 팔로워 로드
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';  // 나의 팔로잉 로드
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';  // 팔로워
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';  // 팔로워 취소
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOW_USER_REQUEST = 'REMOVE_FOLLOW_USER_REQUEST';  // 내가 이상한 팔로워 삭제하는 기능
export const REMOVE_FOLLOW_USER_SUCCESS = 'REMOVE_FOLLOW_USER_SUCCESS';
export const REMOVE_FOLLOW_USER_FAILURE = 'REMOVE_FOLLOW_USER_FAILURE';

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';   //닉네임 수정
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'; //유저 게시물 숫자 + 카운터
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'; //유저 게시물 숫자 - 카운터

export const loginRequestAction = (data) => {
    return {
        type:LOG_IN_REQUEST,
        data:data,
    }
}

export const logoutRequestAction = {
    type:LOG_OUT_REQUEST,
}

export const signUpRequestAction = (data) => {
    return {
        type:SIGN_UP_REQUEST,
        data:data,
    }
}

export const loadUserAction = {
    type:LOAD_USER_REQUEST,
}

export const loadUserRequestAction = (data) => {
    return{
        type:LOAD_USER_REQUEST,
        data:data,
    }
}

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type){
            case REMOVE_POST_OF_ME:{  //user 정봉에 데이터 변경을 위해
                const sliceData = draft.me.Posts.findIndex(post => post.id !== action.data);
                draft.me.Posts.splice(sliceData ,1)
                break;
            }
            case ADD_POST_TO_ME:{  //user 정봉에 데이터 변경을 위해
                draft.me.Posts.unshift({id:action.data});
                break;
            }
            case EDIT_NICKNAME_REQUEST: { //나의 닉네임 변경
                draft.isEditingNickname = true;
                draft.editNicknameErrorReason = '';
                break;
            }
            case EDIT_NICKNAME_SUCCESS: {
                draft.isEditingNickname = false;
                draft.me.nickname = action.data;
                break;
            }
            case EDIT_NICKNAME_FAILURE: {
                draft.isEditingNickname = false;
                draft.editNicknameErrorReason = action.error;
                break;
            }
            case LOAD_FOLLOWERS_REQUEST: { //나의 팔로워 정보 불러오기
                draft.hasMoreFollower = action.offset ? draft.hasMoreFollower : true;
                break;
            }
            case LOAD_FOLLOWERS_SUCCESS: {
                action.data.forEach(follower => {
                    draft.followerList.push(follower);
                });
                draft.hasMoreFollower = action.data.length === 3;
                break;
            }
            case LOAD_FOLLOWERS_FAILURE: {
                break;
            }
            case LOAD_FOLLOWINGS_REQUEST: { //나의 팔로잉 정보 불러오기
                draft.hasMoreFollowing = action.offset ? state.hasMoreFollowing : true;
                break;
            }
            case LOAD_FOLLOWINGS_SUCCESS: {
                action.data.forEach(following => {
                    draft.followingList.push(following);
                })
                draft.hasMoreFollowing = action.data === 3
                break;
            }
            case LOAD_FOLLOWINGS_FAILURE: {
                break;
            }
            case REMOVE_FOLLOW_USER_REQUEST: { //나의 팔로워 유저 삭제
                break;
            }
            case REMOVE_FOLLOW_USER_SUCCESS: {
                const followerData = draft.me.Followers.findIndex(user => user.id !== action.data);
                const followerListData = draft.followerList.findIndex(user => user.id !== action.data);
                draft.me.Followers.splice(followerData, 1);
                draft.followerList.splice(followerListData, 1);
                break;
            }
            case REMOVE_FOLLOW_USER_FAILURE: {
                break;
            }
            case FOLLOW_USER_REQUEST: { //유저 팔로워
                break;
            }
            case FOLLOW_USER_SUCCESS: {
                draft.me.Followings.unshift({id:action.data});
                break;
            }
            case FOLLOW_USER_FAILURE: {
                break;
            }
            case UNFOLLOW_USER_REQUEST: { //유저 팔로워 취소
                break;
            }
            case UNFOLLOW_USER_SUCCESS: {
                const followerData = draft.me.Followings.findIndex(user => user.id === action.data);
                draft.me.Followings.splice(followerData, 1);
                const followingListData = draft.followingList.findIndex(user => user.id === action.data);
                draft.followingList.splice(followingListData, 1);
                break;
                // const index = draft.me.Followings.findIndex(v => v.id === action.data);
                // draft.me.Followings.splice(index, 1);
                // const index2 = draft.followingList.findIndex(v => v.id === action.data);
                // draft.followingList.splice(index2, 1);
                // break;
            }
            case UNFOLLOW_USER_FAILURE: {
                break;
            }
            case LOG_IN_REQUEST: {
                draft.isLoggingIn = true;
                draft.logInErrorReason = '';
                break;
            }
            case LOG_IN_SUCCESS: {
                draft.me = action.data;
                draft.isLoggingIn = false;
                break;
            }
            case LOG_IN_FAILURE:{
                draft.isLoggingIn = false;
                draft.me = null;
                draft.logInErrorReason = action.error;
                break;
            }
            case LOG_OUT_REQUEST: {
                draft.logoutErrorReason = '';
                draft.isLoggingOut = true;
                break;
            }
            case LOG_OUT_SUCCESS: {
                draft.isLoggingOut = false;
                draft.me = null;
                break;
            }
            case LOG_OUT_FAILURE: {
                draft.isLoggingOut = false;
                draft.me = null;
                draft.logoutErrorReason = action.error;
                break;
            }
            case SIGN_UP_REQUEST: {
                draft.signUpData = action.data;
                draft.isSigningUp = true;
                draft.signUpErrorReason = '';
                break;
            }
            case SIGN_UP_SUCCESS: {
                draft.signedUp = true;
                draft.isSigningUp = false;
                break;
            }
            case SIGN_UP_FAILURE: {
                draft.isSigningUp = false;
                draft.signUpErrorReason = action.error;
                break;
            }
            case LOAD_USER_REQUEST: {
                break;
            }
            case LOAD_USER_SUCCESS: {
                if(action.me){
                    draft.me = action.data;
                    break;
                }
                draft.userInfo = action.data;
                break;
            }
            case LOAD_USER_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    })
}

export default reducer;