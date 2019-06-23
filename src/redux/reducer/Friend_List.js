const Friend_List_reducer=(state={
    friend_list:[{}]
},action)=>{
    switch (action.type) {
        case "set_friend_list":{

            return{
                ...state,
                friend_list:action.friend_list
            }
        }

        default:return state
    }
}
export default Friend_List_reducer
