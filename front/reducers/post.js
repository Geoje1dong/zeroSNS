export const initialState = {
    mainPosts: [], //화면에 보일 포스트들
    imagePaths: [], //미리보기 이미지 경로
    addPostErrorReason: false, //포스트 업로드 실패 사유
    isAddingPost: false,    //포스트 업로드 중
    postAdded: false, //포스트 업로드 성공
    isAddingComment: false,
    addPostErrorReason: '',
    commentAdded:false,
}

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';   // 로드 메인 포스터
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST'; //해쉬태그 검색
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';   // 로드 유저 포스터
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';   //이미지 업로드 액션
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'; 
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'; 

export const REMOVE_IMAGE = 'REMOVE_IMAGE'  //이미지 삭제 액션

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';    //포스트 작성
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'; 
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'; 

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';    //포스트 삭제
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'; 
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'; 

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';    //포스트 LIKE 버튼
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'; 
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'; 

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';    //포스트 LIKE 버튼 취소
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'; 
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'; 

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';    //포스트 댓글 작성
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'; 
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'; 

export const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST';    //포스트 댓글 불러오는 액션
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS'; 
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE'; 

export const RETWEET_REQUEST = 'RETWEET_REQUEST';    //리트윗
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS'; 
export const RETWEET_FAILURE = 'RETWEET_FAILURE'; 

export const addPostRequestAction = data => {
    return{
        type:ADD_POST_REQUEST,
        data:data,
    }
}

export const addCommentRequestAction = data => {
    return{
        type:ADD_COMMENT_REQUEST,
        data:data,
    }
}

export const loadHashtagPostsRequestAction = data => {
    return{
        type:LOAD_HASHTAG_POSTS_REQUEST,
        data:data,
    }
}

export const loadMainPostsRequestAction = {
    type:LOAD_MAIN_POSTS_REQUEST,
}

const reducer = (state= initialState, action) => {
    switch(action.type){
        case ADD_POST_REQUEST:{
            return{
                ...state,
                isAddingPost:true,
                addPostErrorReason:'',
                postAdded:false,
            }
        }
        case ADD_POST_SUCCESS:{
            return{
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
                postAdded:true,
                isAddingPost:false
            }
        }
        case ADD_POST_FAILURE:{
            return{
                ...state,
                isAddingPost:false,
                addPostErrorReason:action.error,
                postAdded:false,
            }
        }
        case ADD_COMMENT_REQUEST:{
            return{
                ...state,
                isAddingComment:true,
                addCommentErrorReason:'',
                postAdded:false,
            }
        }
        case ADD_COMMENT_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId) //게시글 위치 확인
            const post = state.mainPosts[postIndex];
            const Comments = [...post.Comments, action.data.comment];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Comments};
            return{
                ...state,
                isAddingComment:false,
                mainPosts,
                commentAdded:true,                
            }
        }
        case ADD_COMMENT_FAILURE:{
            return{
                ...state,
                isAddingComment:false,
                addCommentErrorReason:action.error,
                commentAdded:false,
            }
        }
        case LOAD_MAIN_POSTS_REQUEST:{
            return{
                ...state,
                mainPosts: [],
            }
        }
        case LOAD_MAIN_POSTS_SUCCESS:{
            return{
                ...state,
                mainPosts: action.data,
            }
        }
        case LOAD_MAIN_POSTS_FAILURE:{
            return{
                ...state,
            }
        }
        default: {
            return{
                ...state,
            }
        }
    }
}

export default reducer;