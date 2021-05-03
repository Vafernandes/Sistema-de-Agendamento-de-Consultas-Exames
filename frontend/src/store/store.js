import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from "./reducers";
import createSagaMiddleware from 'redux-saga';
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [ sagaMiddleware ];

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(...middlewares)
    )
)

sagaMiddleware.run(sagas);

export { store }