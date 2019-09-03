import React, { useEffect } from 'react';
import NoLoginLayout from './NoLoginLayout';
import LoginLayout from './LoginLayout';
import {useSelector, useDispatch} from 'react-redux';
import { loadUserAction } from '../reducers/user';

const AppLayout = ({ children }) => {
    const {me} = useSelector(state => state.user)
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if(!me){
    //         dispatch(loadUserAction);
    //     }
    // }, []);

    let loginState = null;
    if(me){
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
