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
    userInfo: null, //남의 정보
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

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';  // 나의 팔로우 팔로워 로드
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';  // 팔로워
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';  // 팔로워 취소
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOW_USER_REQUEST = 'REMOVE_FOLLOW_USER_REQUEST';  // 내가 이상한 팔로워 삭제하는 기능
export const REMOVE_FOLLOW_USER_SUCCESS = 'REMOVE_FOLLOW_USER_SUCCESS';
export const REMOVE_FOLLOW_USER_FAILURE = 'REMOVE_FOLLOW_USER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

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
    switch(action.type){
        case FOLLOW_USER_REQUEST: { //유저 팔로워
            return{
                ...state,
            }
        }
        case FOLLOW_USER_SUCCESS: {
            return{
                ...state,
                me:{
                    ...state.me,
                    Followings:[{
                        id:action.data,
                        ...state.me.Followings
                    }]
                }
            }
        }
        case FOLLOW_USER_FAILURE: {
            return{
                ...state,
            }
        }
        case UNFOLLOW_USER_REQUEST: { //유저 팔로워 취소
            return{
                ...state,
            }
        }
        case UNFOLLOW_USER_SUCCESS: {
            return{
                ...state,
                me:{
                    ...state.me,
                    Followings:state.me.Followings.filter(user => user.id !== action.data),
                },
                followingList: state.followingList.filter(user => user.id !== action.data),
            }
        }
        case UNFOLLOW_USER_FAILURE: {
            return{
                ...state,
            }
        }
        case LOG_IN_REQUEST: {
            return{
                ...state,
                isLoggingIn:true,
                logInErrorReason:'',
            }
        }
        case LOG_IN_SUCCESS: {
            return{
                ...state,
                me: action.data,
                isLoggingIn:false,
            }
        }
        case LOG_IN_FAILURE:{
            return {
                ...state,
                isLoggingIn:false,
                me:null,
                logInErrorReason: action.error,   
            }
        }
        case LOG_OUT_REQUEST: {
            return{
                ...state,
                logoutErrorReason:'',
                isLoggingOut:true,
            }
        }
        case LOG_OUT_SUCCESS: {
            return{
                ...state,
                isLoggingOut:false,
                me:null,
            }
        }
        case LOG_OUT_FAILURE: {
            return{
                ...state,
                isLoggingOut:false,
                me:null,
                logoutErrorReason:action.error,
            }
        }
        case SIGN_UP_REQUEST: {
            return{
                ...state,
                signUpData: action.data,
                isSigningUp: true,
                signUpErrorReason:''
            }
        }
        case SIGN_UP_SUCCESS: {
            return{
                ...state,
                signedUp:true,
                isSigningUp:false,
            }
        }
        case SIGN_UP_FAILURE: {
            return{
                ...state,
                isSigningUp:false,
                signUpErrorReason:action.error,
            }
        }
        case LOAD_USER_REQUEST: {
            return {
                ...state,
            };
        }
        case LOAD_USER_SUCCESS: {
            if(action.me){
                return {
                    ...state,
                    me: action.data,
                };
            }
            return {
                ...state,
                userInfo: action.data,
            }
        }
        case LOAD_USER_FAILURE: {
            return {
                ...state,
            };
        }
        default: {
            return{
                ...state
            }
        }
    }
}

export default reducer;