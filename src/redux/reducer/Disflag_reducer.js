const Disflag_reducer=(state={
    friend_detail_visible:false,
    friend_edit_visible:false,
    update_info_visible:false
},action)=>{
    switch (action.type) {
        case "set_friend_detail_visible":{

            return{
                ...state,
                friend_detail_visible:action.visible
            }
        }
        case "set_friend_edit_visible":{

            return{
                ...state,
                friend_edit_visible:action.visible
            }
        }
        case "set_update_info_visible":{

            return{
                ...state,
                update_info_visible:action.visible
            }
        }

        default:return state
    }
}
export default Disflag_reducer
