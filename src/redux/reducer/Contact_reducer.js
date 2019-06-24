const contact_reducer=(state={
    contact_list:[{}]
},action)=>{
    switch (action.type) {

        case "set_contact_list":{

            return{
                ...state,
                contact_list:action.contact_list
            }
        }
        case "update_a_contact":{//friend_id,text，is_new
            let new_contact=state.contact_list
            if (action.friend_id){
                let contact_need_update={}
                let contact_need_update_Key=-1
                for (let i = 0; i <state.contact_list.length ; i++) {
                    if (state.contact_list[i].contact===action.friend_id){
                        contact_need_update=state.contact_list[i]
                        contact_need_update_Key=i
                    }
                }
                if (contact_need_update_Key!==-1){//找到了具体的会话
                    contact_need_update.text=action.text
                    contact_need_update.is_new=action.is_new
                    contact_need_update.type="1"
                    new_contact[contact_need_update_Key]=contact_need_update
                }
            }
            return{
                ...state,
                contact_list:new_contact
            }
        }

        case "set_a_contact_read":{//friend_id
            let new_contact=state.contact_list
            if (action.friend_id){
                let contact_need_update={}
                let contact_need_update_Key=-1
                for (let i = 0; i <state.contact_list.length ; i++) {
                    if (state.contact_list[i].contact===action.friend_id){
                        contact_need_update=state.contact_list[i]
                        contact_need_update_Key=i
                    }
                }
                if (contact_need_update_Key!==-1){//找到了具体的会话
                    contact_need_update.is_new=false
                    new_contact[contact_need_update_Key]=contact_need_update
                }
            }
            return{
                ...state,
                contact_list:new_contact
            }
        }
        default:return state
    }
}
export default contact_reducer
