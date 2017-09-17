import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import {fetchCategory,fetchAllPosts} from './actions'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose





const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk,logger))
    )


// get all posts from server
store.dispatch(fetchAllPosts())


// get the cats from the server // for URL routing purposes
// the router provider route and app are only rendered
// after the categories have been fetched to avoid unwanted behaviour on app
// will mount and propwillreceiveChanges
store.dispatch(fetchCategory()).then( () => {

ReactDOM.render(
    <Router>
    <Provider store={store}>
    <Route path="/:cat?/:postId?" component={App} />
    </Provider>
    </Router>
    ,
    document.getElementById('root')
    )

})

registerServiceWorker();
