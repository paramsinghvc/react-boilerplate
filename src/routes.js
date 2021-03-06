import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/app/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
    require.ensure = function requireModule(deps, callback) {
        callback(require);
    };
}

// const lazyLoadComponent = (path) => (nextState, callback) => {
//     require.ensure([], require => callback(null, require(path).default));
// };

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV == 'development') {
    // Require async routes only in development for react-hot-reloader to work.
    require('./modules/home/Home');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
const routes = 
    (<Route path="/" component={App}>
            <IndexRoute
              getComponent={(nextState, cb) => {
                require.ensure([], require => {
                  cb(null, require('./modules/home/Home').default);
                });
              }}
            />
            {/*<Route
              path="/posts/:slug-:cuid"
              getComponent={(nextState, cb) => {
                require.ensure([], require => {
                  cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
                });
              }}
            />*/}
    </Route>
    );

export default routes;
