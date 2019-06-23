import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reportsReducer from '../reducers/reports'
import filtersReducer from '../reducers/filters'

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            reports: reportsReducer,
            filters: filtersReducer
        }),
        composeEnhacers(applyMiddleware(thunk))
    )
    return store;
}