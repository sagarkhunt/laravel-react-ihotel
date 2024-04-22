import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducers';
import rootSaga from './rootSaga';

export default function configureAppStore(preloadedState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(sagaMiddleware),
        preloadedState,
    });
    sagaMiddleware.run(rootSaga);

    if (
        process.env.NODE_ENV !== 'production' &&
        typeof module !== 'undefined' &&
        module.hot
    ) {
        module.hot.accept('./rootReducers', () => {
            const newRootReducer = require('./rootReducers').default;
            store.replaceReducer(newRootReducer);
        });
    }
    return store;
}
