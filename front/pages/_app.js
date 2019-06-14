import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../reducers';
import withRedux from 'next-redux-wrapper';

const NodeBird = ({Component, store}) =>{
    return(
        <Provider store={store}>
            <Head>
                <title>zeroSNS</title>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </Provider>
    )
}

// NodeBird.PropTypes = {
//     Component: PropTypes.elementType.isRequired,
//     store:PropTypes.object,
// };

export default withRedux((initialState, options) => {    
    const middlewares = [];
    const enhancer = compose(
        applyMiddleware(...middlewares), typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    return store;
})(NodeBird);