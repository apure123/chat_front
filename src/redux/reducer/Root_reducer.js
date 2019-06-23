import {combineReducers}from "redux"
import Message_reducer from "./Message_reducer";
import Login_reducer from "./Login";
import Friend_List_reducer from "./Friend_List";
import new_friend_list_reducer from "./new_friend_list_reducer";
import Chat_params_reducer from "./Chat_params_reducer";
import Disflag_reducer from "./Disflag_reducer";
import Friend_detail_reducer from "./Friend_detail_reducer";
import contact_reducer from "./Contact_reducer";
const root_Reducer=combineReducers({
    message:Message_reducer,
    login:Login_reducer,
    friend_list:Friend_List_reducer,
    new_friend_list:new_friend_list_reducer,
    chat_params:Chat_params_reducer,
    disflag:Disflag_reducer,
    friend_detail:Friend_detail_reducer,
    contact:contact_reducer

})
export default root_Reducer
