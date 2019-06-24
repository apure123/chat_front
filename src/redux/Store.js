import {createStore,compose,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import root_Reducer from "./reducer/Root_reducer";



export const store=createStore(root_Reducer,
    compose(
        applyMiddleware(...[]), // 需要使用的中间件数组
       /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
    ))
