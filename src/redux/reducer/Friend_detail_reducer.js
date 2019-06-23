const Friend_detail_reducer=(state={
    friend_detail_message:{nickname:"昵称",signature:"",gender:"",email:"",imageUrl:"image.jpg",remark:"",groupName:""},
    select_friend_id:0
},action)=>{
    switch (action.type) {
        case "set_friend_detail_message":{

            return{
                ...state,
                friend_detail_message:action.friend_detail_message
            }
        }
        case "set_select_friend_id":{

            return{
                ...state,
                select_friend_id:action.select_friend_id
            }
        }

        default:return state
    }
}
export default Friend_detail_reducer
