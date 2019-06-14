export const initalState ={
    isLoggedIn: false,
    user: {},
};

const LOG_IN = 'LOG_IN';  //액션의 이름
const LOG_OUT = 'LOG_OUT';

const loginAction = {
    type:LOG_IN,
    data:{
        nickname:'제로초',
    },
}

const logoutAction = {
    type:LOG_OUT,
}

const reducer = (state = initalState, action) => {
    switch(action.type){
        case loginAction: {
            return{
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case logoutAction: {
            return{
                ...state,
                isLoggedIn: false,
                user:null
            }
        }
        default: {
            return{
                ...state
            }
        }
    }
}

export default reducer;