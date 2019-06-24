import React from 'react';
import "./chat_page.css"
import Chat_main from "../chat-main/Chat_main";
import Sider from "../sider/Sider";
import {Redirect }from "react-router-dom"
import {connect} from "react-redux"
import axios from 'axios';
import Friend_edit from "../FriendDetail/Friend_edit";
import Update_info from "../update_info/Update_info";
import { Button,Popconfirm } from "antd";
import ajax_url from "../../server_config/ajax_url";


class Chat_page extends React.Component{

    deleteRecentContact=(userID,friendID)=>{
        var fd = new FormData();
        fd.append("userID",userID);
        fd.append("friendID",friendID);
        let config = {
            headers: {
                'Content-Type':'multipart/form-data',
            }
        }
        axios.post(`${ajax_url}/deleteRecentContact.php`,fd,config)
            .then(res => {
                console.log(res)
                //这里反馈删除结果

            }).catch( res => {
            console.log(res);
        })
    }


    render() {

        return(
            <div style={{backgroundColor:"#9da49b",width:"100%",height:"100%"}} >

                {!this.props.loginflag?<Redirect to={"/"}/>:""}

                <div style={{width:"100%",display:"flex",margin:"auto"}}>
                    <div style={{float:"left",width:"30%", backgroundColor:"#305a56"}}>
                        <Sider/>
                    </div>
                    <div style={{width:"70%",float:"right",height:"100vh",display:"block",backgroundColor:"#1da57a"}}>

                        <div style={{backgroundColor:"#fff", height:"7vh",float:"top"}} className={"message_header"}>
                            <h2 style={{float:"left",margin:"10px",marginLeft:"30px"}}>{this.props.chat_params_friend_remark}</h2>

                            <Popconfirm
                                onConfirm={()=>this.deleteRecentContact(this.props.userid,this.props.friend_id)}
                                title={`确定要删除与好友“${this.props.chat_params_friend_remark}”(id为${this.props.friend_id})的所有聊天记录吗？下次登录生效`} okText="删除" cancelText="我再想想">
                            <Button type={"danger"} style={{float:"right",marginRight:"16px",marginTop:"9px"}}
                            disabled={this.props.friend_id==="0"}>删除消息记录</Button>
                            </Popconfirm>
                        </div>
                        <div style={{backgroundColor:"#e0e7e3",height:"93vh"}}><Chat_main/></div>

                    </div>

                    <Friend_edit/>
                    <Update_info/>

                </div>

            </div>
        )
    }
}


function mapStateToProps(state)
{
    return{

        loginflag:state.login.loginflag,
        nickname:state.login.nickname,
        userid:state.login.uid,
        chat_params_friend_remark:state.chat_params.friend_remark,
        friend_id:state.chat_params.friend_id
    }
}

function mapDispatchToProps(dispatch){
    return{

    }
}

Chat_page=connect(mapStateToProps,mapDispatchToProps)(Chat_page)
export default Chat_page;
