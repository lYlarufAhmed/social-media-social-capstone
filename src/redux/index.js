import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {logger} from "redux-logger/src";
import thunk from "redux-thunk";
import appReducer from "./reducers/appReducer";
import userReducer from "./reducers/userReducer";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(logger, thunk),
    // other redux enhancers if any
);
const reducers = combineReducers({'app': appReducer, 'user': userReducer})
export const store = createStore(reducers, enhancer);
