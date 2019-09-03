import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

import rootSaga from '../sagas';
import reducer from '../reducers';
import AppLayout from '../components/AppLayout';
import { loadUserAction } from '../reducers/user';

const NodeBird = ({Component, store, pageProps}) =>{
    return(
        <Provider store={store}>
            <Head>
                <title>zeroSNS</title>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <AppLayout>
                <Component {...pageProps}/>
            </AppLayout>
        </Provider>
    )
}

// NodeBird.PropTypes = {
//     Component: PropTypes.elementType.isRequired,
//     store:PropTypes.object,
// };


NodeBird.getInitialProps = async(context) => {
    const {ctx, Component} = context;
    let pageProps = {};

    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(ctx.isServer && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    if(!state.user.me){
        ctx.store.dispatch(loadUserAction)
    }
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx) || {};
    }
    return {pageProps}
};

const configureStore = (initialState, options) => {    
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
        console.log(action);
        next(action);
    }];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares),)
        : compose(
            applyMiddleware(...middlewares),
            !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
        )
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));