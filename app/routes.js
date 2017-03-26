// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/App/sagas'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, globalSagas, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(_.concat(globalSagas.default, sagas.default));

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/register',
      name: 'register',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RegisterPage/reducer'),
          import('containers/App/sagas'),
          import('containers/RegisterPage/sagas'),
          import('containers/RegisterPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, globalSagas, sagas, component]) => {
          injectReducer('register', reducer.default);
          injectSagas(_.concat(globalSagas.default, sagas.default));

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/playlist',
      name: 'playlist',
      getComponent(nextState, cb) {
        import('containers/PlayListPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/discover',
      name: 'discover',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchPage/reducer'),
          import('containers/App/sagas'),
          import('containers/SearchPage/sagas'),
          import('containers/SearchPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, globalSagas, sagas, component]) => {
          injectReducer('search', reducer.default);
          injectSagas(_.concat(globalSagas.default, sagas.default));

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/history',
      name: 'history',
      getComponent(nextState, cb) {
        import('containers/HistoryPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },{
      path: '/userName',
      name: 'history',
      getComponent(nextState, cb) {
        import('containers/UserNamePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, 
  ];
}
