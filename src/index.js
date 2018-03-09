import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// BrowserRouter interacts with History lib and decides what
// to do with change in url; i want BrowserRouter to look at entire url
//Route is real workhorse; Route component can render in any other component
// purpose of Route component is provide config that says url looks like this
// then show this components; if that then show these components
// import App from './components/app';
// don't need App.js anymore with react BrowserRouter
// no central component; delete app.js
// <Switch> matches the first close match of route children
import promise from 'redux-promise';
// this allows asynchronous calls to be resoved before next action
//wire by applyMiddleware(promise)

import reducers from './reducers';
import PostsIndex from './components/post_index';
import PostsNew from './components/posts_new';
// here is the root url
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
