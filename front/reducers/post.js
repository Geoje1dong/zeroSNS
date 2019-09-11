import produce, { isDraft } from 'immer';

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
    return produce(state, (draft) => {
        switch(action.type){
            case REMOVE_POST_REQUEST:{ //게시글 삭제
                break;
            }
            case REMOVE_POST_SUCCESS:{
                const index = draft.mainPosts.findIndex(post => post.id === action.data);
                draft.mainPosts.splice(index, 1);
                break;
            }
            case REMOVE_POST_FAILURE:{
                break;
            }
    
            case ADD_POST_REQUEST:{ //게시글 등록
                draft.isAddingPost = true;
                draft.addPostErrorReason = '';
                draft.postAdded = false;
                break;
            }
            case ADD_POST_SUCCESS:{
                draft.isAddingPost = false;
                draft.mainPosts.unshift(action.data);
                draft.postAdded = true;
                draft.imagePaths = [];
                break;
            }
            case ADD_POST_FAILURE:{
                draft.isAddingPost = false;
                draft.addPostErrorReason = action.error;
                draft.postAdded = false;
                break;
            }
            case UPLOAD_IMAGES_REQUEST:{    //이미지 업로드
                break;
            }
            case UPLOAD_IMAGES_SUCCESS:{
                draft.imagePaths = draft.imagePaths.concat(action.data);
                action.data.forEach((p) => {
                    draft.imagePaths.push(p);
                })
                break;
            }
            case UPLOAD_IMAGES_FAILURE:{
                break;
            }
            case REMOVE_IMAGE:{ //이미지 삭제
                const index = draft.imagePaths.findIndex((v, i) => i === action.index)
                draft.imagePaths.splice(index, 1);
                break;
            }
            case ADD_COMMENT_REQUEST:{  // 코멘트 등록
                draft.isAddingComment = true;
                draft.addCommentErrorReason = '';
                draft.postAdded = false
                break;
            }
            case ADD_COMMENT_SUCCESS:{
                const postIndex = draft.mainPosts.findIndex(post => post.id === action.data.postId) //게시글 위치 확인
                draft.mainPosts[postIndex].Comments.push(action.data.comment);
                draft.isAddingComment = false;
                draft.commentAdded = true
                break;
            }
            case ADD_COMMENT_FAILURE:{
                draft.isAddingComment = false;
                draft.addCommentErrorReason = action.error;
                draft.commentAdded = false;
                break;
            }
            case LOAD_COMMENTS_SUCCESS: {   // 코멘트 불러오기
                const postIndex = draft.mainPosts.findIndex(post => post.id === action.data.postId);
                draft.mainPosts[postIndex].Comments = action.data.comments;
                break;
            }
            case LIKE_POST_REQUEST:{ //좋아요 등록
                break;
            }
            case LIKE_POST_SUCCESS:{
                const postIndex = draft.mainPosts.findIndex(post => post.id === action.data.postId);
                draft.mainPosts[postIndex].Likers.unshift({id:action.data.userId});
                break;
            }
            case LIKE_POST_FAILURE:{
                break;
            }
            case UNLIKE_POST_REQUEST:{ //좋아요 취소
                break;
            }
            case UNLIKE_POST_SUCCESS:{
                const postIndex = draft.mainPosts.findIndex(post => post.id === action.data.postId);
                const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(post => post.id === action.data.userId);
                draft.mainPosts[postIndex].Likers.splice(likeIndex, 1)
                break;
            }
            case UNLIKE_POST_FAILURE:{
                break;
            }
            case RETWEET_REQUEST:{ //retweet
                break;
            }
            case RETWEET_SUCCESS:{
                draft.mainPosts.unshift(action.data);
                break;
            }
            case RETWEET_FAILURE:{
                break;
            }
            case LOAD_MAIN_POSTS_REQUEST:   //메인 포스트 불러오기
            case LOAD_HASHTAG_POSTS_REQUEST:    //해쉬태그 불러오기
            case LOAD_USER_POSTS_REQUEST:{  //유저 프로필 불러오기
                draft.mainPosts = action.lastId === 0 ? [] : draft.mainPosts;
                draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
                break;
            }
            case LOAD_MAIN_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
            case LOAD_USER_POSTS_SUCCESS:{
                action.data.forEach((post) => {
                    draft.mainPosts.push(post);
                })
                draft.hasMorePost = action.data.length === 4;
                break;
            }
            case LOAD_MAIN_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
            case LOAD_USER_POSTS_FAILURE:{
                break;
            }
            default: {
                break;
            }
        }
    });
}

export default reducer;