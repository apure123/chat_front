import axios from "axios"
import {connect} from "react-redux"
import ajax_url from "../ajax_url";
import React,{Component} from 'react';

 class Get_friend_list {

        get_friend_list=()=> {
         console.log("进入进行ajax请求的专用类了，接下来先看一下props映射了没：")
           console.log(this)
        var fd = new FormData()
        fd.append('userID', 1)
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post(`${ajax_url}/checkFriendList.php`, fd,config)
            .then( (response) => {
                console.log("获取好友列表完成!" )
                console.log(response)
                }
                )
            .catch(function (error) {
                console.log(error);

            })
    }
}
function mapStateToProps(state)
{
    return{

        loginflag:state.login.loginflag,

        userid:state.login.uid,

        friend_list:state.friend_list.friend_list
    }
}

function mapDispatchToProps(dispatch){
    return{

        set_friend_list:(friend_list)=>{dispatch({type:"set_friend_list",friend_list:friend_list})}
    }
}

Get_friend_list=connect(mapStateToProps,mapDispatchToProps)(Get_friend_list)
export default Get_friend_list
