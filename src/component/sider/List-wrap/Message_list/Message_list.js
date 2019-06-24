import React,{Component} from 'react';
import {connect} from "react-redux"
import axios from 'axios';
import { Layout, Menu, Avatar,Icon ,List,Badge} from 'antd';
import ajax_url from "../../../../server_config/ajax_url";



class Message_list extends Component{

    constructor(props) {
        super(props);
        this.get_contact_detial(this.props.userid)
    }


    //选中要聊天的好友
    select_chat_friend=(friend_id,friend_remark,friend_imageUml)=>{
        this.props.set_chat_params_friend_id(friend_id)
        this.props.set_chat_params_friend_remark(friend_remark)
        if (friend_imageUml && friend_imageUml!=="image.jpg"){
            this.props.set_friend_imageUml(friend_imageUml)
        }
        //切换聊天窗口的绑定数据

        //去掉头像未读小红点
        this.props.set_a_contact_read(friend_id)

    }

    //打开好友详情弹窗
    open_friend_detail=(friendID)=>{
        this.props.set_select_friend_id(friendID)
        this.props.set_visible(true)
        //向后台获取这个好友的详情信息
        this.get_friend_detial(this.props.userid,friendID)
    }

    //获取好友详情信息
    get_friend_detial=(userID,friendID)=>{
        var fd = new FormData();
        fd.append("userID",userID);
        fd.append("friendID",friendID);
        let config = {
            headers: {
                'Content-Type':'multipart/form-data',
            }
        }
        axios.post(`${ajax_url}/checkFriend.php`,fd,config)
            .then(res => {
                console.log(res)
                //这里存储数据
                if (res.data[0]) {
                    this.props.set_friend_detail_message(res.data[0])
                }

            }).catch( res => {
            console.log(res);
        })
    }

    //获取最近聊天详情信息
    get_contact_detial=(userID)=>{
        var fd = new FormData();
        fd.append("userID",userID);
        let config = {
            headers: {
                'Content-Type':'multipart/form-data',
            }
        }
        axios.post(`${ajax_url}/checkRecentContact.php`,fd,config)
            .then(res => {
                console.log(res)
                //这里存储数据
                this.props.set_contact_list(res.data)
            }).catch( res => {
            console.log(res);
        })
    }





    render() {
        return(
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.contact_list}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<span onClick={()=>this.open_friend_detail(item.contact)}>
                                    <Badge dot={item.is_new}>
                                    {item.imageurl&&item.imageurl!=="image.jpg"?
                                        <Avatar src={item.imageurl} />:
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    </Badge>
                                </span>}
                                title={<a onClick={()=>this.select_chat_friend(item.contact,item.remark,item.imageurl)}>{`备注：${item.remark}`}</a>}
                                description={item.type==="1"?`${limit_string_length(item.text)}`:"[图片]"}
                            />

                        </List.Item>
                    )}
                />
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
        visible:state.disflag.friend_detail_visible,
        friend_list:state.friend_list.friend_list,
        contact_list:[...state.contact.contact_list]
    }
}

function mapDispatchToProps(dispatch){
    return{

        set_visible:(visible)=>{dispatch({type:"set_friend_detail_visible",visible:visible})},
        set_friend_detail_message:(friend_detail_message)=>{dispatch({type:"set_friend_detail_message",friend_detail_message:friend_detail_message})},
        set_select_friend_id:(select_friend_id)=>{dispatch({type:"set_select_friend_id",select_friend_id:select_friend_id})},
        set_chat_params_friend_id:(friend_id)=>{dispatch({type:"set_chat_params_friend_id",friend_id:friend_id})},
        set_chat_params_friend_remark:(friend_remark)=>{dispatch({type:"set_chat_params_friend_remark",friend_remark:friend_remark})},
        set_contact_list:(contact_list)=>{dispatch({type:"set_contact_list",contact_list:contact_list})},
    set_friend_imageUml:(friend_imageUml)=>{dispatch({type:"set_friend_imageUml",friend_imageUml:friend_imageUml})},
        set_a_contact_read:(friend_id)=>{dispatch({
            type:"set_a_contact_read",
            friend_id:friend_id
        })}

    }
}
Message_list=connect(mapStateToProps,mapDispatchToProps)(Message_list)
export default Message_list;


function limit_string_length(str) {
    if(str.length>20){
        return str.substr(0,20)+"..."
    }else return str
}
