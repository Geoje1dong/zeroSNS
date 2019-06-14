export const initialState = {
    mainPosts: [{
        User: {
            id:1,
            nickname:'제로초',
        },
        content:'첫번째 게시글',
        img:'https://m.foxtoon.com/cdn/board/?img=20190515104546_7a30920fb218edb10d11cf723bd72b24.gif',
    }],
    imagePaths: [],
}

export const ADD_POST = 'ADD_POST';    //포스트 작성
export const ADD_DUMMY ='ADD_DUMMY';   //더미 데이터

const addPost = {
    type:ADD_POST,
}

const addDummy = {
    type:ADD_DUMMY,
    data:{
        UserId: 1,
        User: {
            nickname:'제로초',
        },
        content:'첫번째 게시글',
        img:'https://m.foxtoon.com/cdn/board/?img=20190515104546_7a30920fb218edb10d11cf723bd72b24.gif',
    }
}

const reducer = (state= initialState, action) => {
    switch(action.type){
        case ADD_POST:{
            return{
                ...state
            }
        }
        case ADD_DUMMY:{
            return {
                ...state,
                mainPosts: [
                    ...state,
                    action.data,
                ]
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