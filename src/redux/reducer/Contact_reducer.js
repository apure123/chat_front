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

        default:return state
    }
}
export default contact_reducer
