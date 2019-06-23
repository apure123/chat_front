const Chat_params_reducer=(state={
    friend_id:"0",friend_remark:""
},action)=>{
    switch (action.type) {

        case "set_chat_params_friend_id":{

            return{
                ...state,
                friend_id:action.friend_id
            }
        }
        case "set_chat_params_friend_remark":{return{
            ...state,
            friend_remark: action.friend_remark
        }}

        default:return state
    }
}
export default Chat_params_reducer
