import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import tasksReducer from "./Tasks.js/TasksReducer";
import storage from "redux-persist/lib/storage";
import newTaskReducer from "./TaskNewVersion.js/TaskNewVersionReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    tasksReducer: tasksReducer,
    newTaskReducer: newTaskReducer
})

const persistConfig = {
    key: 'taskState',
    storage
}

// const persistedState = localStorage.getItem('taskState')
//     ? JSON.parse(localStorage.getItem('taskState'))
//     : {}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeEnhancers())
const Persistor = persistStore(store)
// store.subscribe(() => {
//     localStorage.setItem('reduxState', JSON.stringify(store.getState()))
// })

export { Persistor }
export default store
