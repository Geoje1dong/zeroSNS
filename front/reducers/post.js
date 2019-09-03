export const initialState = {
    mainPosts: [], //화면에 보일 포스트들
    imagePaths: [], //미리보기 이미지 경로
    addPostErrorReason: false, //포스트 업로드 실패 사유
    isAddingPost: false,    //포스트 업로드 중
    postAdded: false, //포스트 업로드 성공
    isAddingComment: false, //코멘트 업로드 중
    addPostErrorReason: '', //코멘트 업로드 실패 사유
    commentAdded:false, //코멘트 업로드 성공
    hasMorePost:false,  //더이상 포스트 가 없을때 스크롤
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

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';    //포스트 댓글 불러오는 액션
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'; 
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE'; 

export const RETWEET_REQUEST = 'RETWEET_REQUEST';    //리트윗
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS'; 
export const RETWEET_FAILURE = 'RETWEET_FAILURE'; 


export const loadUserPostsRequestAction = (data) =>{
    return{
        type:LOAD_USER_POSTS_REQUEST,
        data:data,
    }
}

export const addPostRequestAction = data => {
    return{
        type:ADD_POST_REQUEST,
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
        case REMOVE_POST_REQUEST:{ //게시글 삭제
            return{
                ...state,
            }
        }
        case REMOVE_POST_SUCCESS:{
            return{
                ...state,
                mainPosts: state.mainPosts.filter(post => post.id !== action.data),
            }
        }
        case REMOVE_POST_FAILURE:{
            return{
                ...state,
            }
        }

        case ADD_POST_REQUEST:{ //게시글 등록
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
                isAddingPost:false,
                imagePaths:[],
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
        case UPLOAD_IMAGES_REQUEST:{    //이미지 업로드
            return{
                ...state,
            }
        }
        case UPLOAD_IMAGES_SUCCESS:{
            return{
                ...state,
                imagePaths: [...state.imagePaths, ...action.data]
            }
        }
        case UPLOAD_IMAGES_FAILURE:{
            return{
                ...state,
            }
        }
        case REMOVE_IMAGE:{ //이미지 삭제
            return{
                ...state,
                imagePaths: state.imagePaths.filter((v,i) => i !== action.index)
            }
        }
        case ADD_COMMENT_REQUEST:{  // 코멘트 등록
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
        case LOAD_COMMENTS_SUCCESS: {   // 코멘트 불러오기
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Comments = action.data.comments;
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Comments };
            return {
                ...state,
                mainPosts,
            };
        }
        case LIKE_POST_REQUEST:{ //좋아요 등록
            return{
                ...state,
            }
        }
        case LIKE_POST_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(post => post.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = [{id:action.data.userId}, ...post.Likers];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Likers};
            return{
                ...state,
                mainPosts
            }
        }
        case LIKE_POST_FAILURE:{
            return{
                ...state,
            }
        }
        case UNLIKE_POST_REQUEST:{ //좋아요 취소
            return{
                ...state,
            }
        }
        case UNLIKE_POST_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(post => post.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = post.Likers.filter(post => post.id !== action.data.userId);
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Likers};
            return{
                ...state,
                mainPosts
            }
        }
        case UNLIKE_POST_FAILURE:{
            return{
                ...state,
            }
        }
        case RETWEET_REQUEST:{ //retweet
            return{
                ...state,
            }
        }
        case RETWEET_SUCCESS:{
            return{
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            }
        }
        case RETWEET_FAILURE:{
            return{
                ...state,
            }
        }
        case LOAD_MAIN_POSTS_REQUEST:   //메인 포스트 불러오기
        case LOAD_HASHTAG_POSTS_REQUEST:    //해쉬태그 불러오기
        case LOAD_USER_POSTS_REQUEST:{  //유저 프로필 불러오기
            return{
                ...state,
                mainPosts: action.lastId === 0 ? [] : state.mainPosts,
                hasMorePost: action.lastId ? state.hasMorePost : true,
            }
        }
        case LOAD_MAIN_POSTS_SUCCESS:
        case LOAD_HASHTAG_POSTS_SUCCESS:
        case LOAD_USER_POSTS_SUCCESS:{
            return{
                ...state,
                mainPosts: state.mainPosts.concat(action.data),
                hasMorePost: action.data.length === 4,
            }
        }
        case LOAD_MAIN_POSTS_FAILURE:
        case LOAD_HASHTAG_POSTS_FAILURE:
        case LOAD_USER_POSTS_FAILURE:{
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