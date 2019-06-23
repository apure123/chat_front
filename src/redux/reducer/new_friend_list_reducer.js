const new_friend_list_reducer=(state={
    new_friend_list:[{}]
},action)=>{
    switch (action.type) {
        case "set_new_friend_list":{

            return{
                ...state,
                new_friend_list:action.friend_list
            }
        }

        default:return state
    }
}
export default new_friend_list_reducer
