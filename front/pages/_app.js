import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import withRedux from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';
import reducer from '../reducers';
import AppLayout from '../components/AppLayout';

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
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx);
    }
    return {pageProps}
};

const configureStore = (initialState, options) => {    
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares),)
        : compose(
            applyMiddleware(...middlewares), typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
        )
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
};

export default withRedux(configureStore)(NodeBird)