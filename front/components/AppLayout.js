import React from 'react';
import NoLoginLayout from './NoLoginLayout';
import LoginLayout from './LoginLayout';
import {useSelector} from 'react-redux';

const AppLayout = ({ children }) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    
    let loginState = null;
    if(loginState){
        loginState = <LoginLayout children={children}/>
    }else{        
        if(children.type.name == 'Home' || children.type.name == 'Signup'){
            loginState = <NoLoginLayout children={children} />;
        }
    }
    

    return(
        <>
            {loginState}
        </>
    )
}

export default AppLayout;
