const Message_reducer=(state={
    all_message:[{
        friend_id:"0",
        messageList: [{owner: "other", content: "这里是消息演示",type:"text"}, {owner: "other", content: "请先选择一个聊天的好友，再发送消息",type:"text"},
            {
            owner: "other",type:"image"
            ,content:"data:image/jpeg;base64,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"
            }],
        get_history_flag:false
    }]      }
    ,action)=>{
    switch (action.type) {
        case "add_message":{
            //先找这个friend_id有没有对应的消息记录对象
            let new_all_message=state.all_message
            let new_message_list_perfriend={}
            let found_flag=0
            for (let i = 0; i <new_all_message.length ; i++) {
                if(state.all_message[i].friend_id===action.friend_id){
                    found_flag=1
                    //有的话直接在上面新增
                    new_message_list_perfriend=state.all_message[i]
                    if(action.message_type==="image"){
                        new_message_list_perfriend.messageList.push({owner:action.owner,content:action.message_content,type:"image"})
                    }else {
                        new_message_list_perfriend.messageList.push({owner:action.owner,content:action.message_content,type:"text"})
                    }
                    //直接修改new_all_message
                    new_all_message[i]=new_message_list_perfriend
                }
            }
            //没有找到的话要创建一个对象
            if(found_flag===0){
                new_message_list_perfriend.friend_id=action.friend_id
                new_message_list_perfriend.messageList=[]
                if(action.message_type==="image"){
                    new_message_list_perfriend.messageList.push({owner:action.owner,content:action.message_content,type:"image"})
                }
                else {
                    new_message_list_perfriend.messageList.push({owner:action.owner,content:action.message_content,type:"text"})
                }

                //加进all_message里面
                new_all_message.push(new_message_list_perfriend)
            } else {
                 //找到的话在上面循环里就改了，这里不用动
            }

            return{
                ...state,
                all_message:new_all_message
            }
        }
        case "add_history_message":{//参数：friend_id,history_message
            //首先要找到是与哪个好友的聊天记录
            let new_all_message=state.all_message
            let message_old={}
            let friend_Key=0
            for (let i = 0; i <state.all_message.length ; i++) {
                //如果找到对应的好友的历史记录
                if (state.all_message[i].friend_id===action.friend_id){
                    friend_Key=i;
                    message_old=state.all_message[i]
                }
            }

            if (friend_Key===0){//消息记录里面没有和这个好友的聊天记录
                if(action.friend_id==="0"){
                    //如果传进来的friend_id真的是0，不做任何操作
                }
                else {
                    let new_message_obj_by_friend={}
                    new_message_obj_by_friend.friend_id=action.friend_id
                    new_message_obj_by_friend.get_history_flag=true

                    let temp_history_message=[]//用来暂时保存转换后的历史messageList
                    for( let i=0;i<action.history_message.length;i++){//遍历参数里的所有消息
                        if (action.history_message[i].friendID===action.friend_id){//当这条消息是由自己发送的
                            //这条消息是文本信息
                            if (action.history_message[i].type==="1"){
                                let permessage={owner: "me", content: action.history_message[i].text}
                                temp_history_message.push(permessage)
                            }

                        }else {//当这条消息是由好友发送的
                            //这条消息是文本信息
                            if (action.history_message[i].type==="1"){
                                let permessage={owner: "other", content: action.history_message[i].text}
                                temp_history_message.push(permessage)
                            }
                        }
                    }

                    //合入新的new_messageList_by_friend
                    new_message_obj_by_friend.messageList=temp_history_message
                    new_all_message.push(new_message_obj_by_friend)
                }
            }
            else {
                //找的到对应的好友的历史记录
                //friend_Key和message_old保存位置和消息记录
                if (message_old.get_history_flag===false){
                    //还没获取过历史
                    let temp_history_message=[]//用来暂时保存转换后的历史消息
                    for( let i=0;i<action.history_message.length;i++){
                        if (action.history_message[i].friendID===action.friend_id){//当这条消息是由自己发送的
                            //这条消息是文本信息
                            if (action.history_message[i].type==="1"){
                                let permessage={owner: "me", content: action.history_message[i].text}
                                temp_history_message.push(permessage)
                            }

                        }else {//当这条消息是由好友发送的
                            //这条消息是文本信息
                            if (action.history_message[i].type==="1"){
                                let permessage={owner: "other", content: action.history_message[i].text}
                                temp_history_message.push(permessage)
                            }
                        }
                    }
                    let new_messageList_by_friend=temp_history_message.concat(message_old)
                        //合入新的new_messageList_by_friend
                    new_all_message[friend_Key].messageList=new_messageList_by_friend
                    //表示已经获取完历史消息了
                    new_all_message[friend_Key].get_history_flag=true
                }
                else {
                    //已经获取过历史了，什么都不干
                }

            }

        return{
                ...state,
            all_message:new_all_message
        }
        }
        default:return state
    }
}
export default Message_reducer
