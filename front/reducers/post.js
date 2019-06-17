export const initialState = {
    mainPosts: [{
        id:1,
        User: {
            id:1,
            nickname:'제로초',
        },
        content:'첫번째 게시글',
        img:'https://m.foxtoon.com/cdn/board/?img=20190515104546_7a30920fb218edb10d11cf723bd72b24.gif',
        Comments: [],   //코멘트
    }], //화면에 보일 포스트들
    imagePaths: [], //미리보기 이미지 경로
    addPostErrorReason: false, //포스트 업로드 실패 사유
    isAddingPost: false,    //포스트 업로드 중
    postAdded: false, //포스트 업로드 성공
    isAddingComment: false,
    addPostErrorReason: '',
    commentAdded:false,
}

const dummyPost = {
    id:2,
    User: {
        id:2,
        nickname:'제로초',
    },
    content:'더미 포스트',
    img:'https://dcimg4.dcinside.co.kr/viewimage.php?id=29afd12be4ed36a379ed&no=24b0d769e1d32ca73fee80fa11d028315a8efe524a7018c72c9aa2b29c10978e3a8746f659f880dee2633a45acbbc988fdba4f4927d9f50185fec254bd7ad1c2997e2845de2b3f9ae662c0df17d2439077ebebde59943ce4ca39738751afc8b511f0a41d09b8',
    Comments:[],    //코멘트
}

const dummyComment = {
    id:1,
    User: {
        id:1,
        nickname:'거제2동',
    },
    createdAt: new Date(),
    content:'더미 코멘트 입니다.'
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
                mainPosts: [dummyPost, ...state.mainPosts],
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
            const Comments = [...post.Comments, dummyComment];
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
        default: {
            return{
                ...state,
            }
        }
    }
}

export default reducer;