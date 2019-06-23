import React,{Component} from 'react';
import {connect} from "react-redux"
import axios from 'axios';
import { Layout, Menu, Avatar,Icon ,List,Button,Popconfirm } from "antd";
import FriendDetail from "../../../FriendDetail/FriendDetail";
import ajax_url from "../../../../ajax/ajax_url";
import Friend_edit from "../../../Chat_page/chat_page";



class Friends extends Component{

    constructor(props) {
        super(props);

    }
componentDidMount() {
        this.props.get_friend_data()
}

    //选中要聊天的好友
    select_chat_friend=(friend_id,friend_remark,friend_imageUml)=>{
        this.props.set_chat_params_friend_id(friend_id)
        this.props.set_chat_params_friend_remark(friend_remark)
        if (friend_imageUml && friend_imageUml!=="image.jpg"){
            this.props.set_friend_imageUml(friend_imageUml)
        }
        //切换聊天窗口的绑定数据


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

    //删除好友函数
    deleteFriend=(userID,friendID)=>{

        //向后台发送删除请求
        var fd = new FormData();
        fd.append("userID",userID);
        fd.append("friendID",friendID);
        let config = {
            headers: {
                'Content-Type':'multipart/form-data',
            }
        }
        axios.post(`${ajax_url}/deleteFriend.php`,fd,config)
            .then(res => {
                console.log(res)
                //这里应该有反馈

            }).catch( res => {
            console.log(res);
        })

        //删除之后再次获取好友列表
        this.props.get_friend_data()
    }

    render() {
        return(
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.friend_list}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<span onClick={()=>this.open_friend_detail(item.friendID)}>
                                    {
                                        item.imageUrl==="image.jpg"?<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        :
                                            <Avatar src={item.imageUrl} />
                                    }
                                    </span>}
                                title={<a onClick={()=>this.select_chat_friend(item.friendID,item.remark,item.imageUrl)}>{`备注：${item.remark}`}</a>}
                                description={`这个好友的id为:${item.friendID}`}
                            />
                            <Popconfirm
                                onConfirm={()=>this.deleteFriend(this.props.userid,item.friendID)}
                                title="确定删除？" okText="删除" cancelText="我再想想">
                                <Button type="danger">删除好友</Button>
                            </Popconfirm>

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
        friend_list:state.friend_list.friend_list
    }
}

function mapDispatchToProps(dispatch){
    return{

        set_visible:(visible)=>{dispatch({type:"set_friend_detail_visible",visible:visible})},
        set_friend_detail_message:(friend_detail_message)=>{dispatch({type:"set_friend_detail_message",friend_detail_message:friend_detail_message})},
        set_select_friend_id:(select_friend_id)=>{dispatch({type:"set_select_friend_id",select_friend_id:select_friend_id})},
        set_chat_params_friend_id:(friend_id)=>{dispatch({type:"set_chat_params_friend_id",friend_id:friend_id})},
        set_chat_params_friend_remark:(friend_remark)=>{dispatch({type:"set_chat_params_friend_remark",friend_remark:friend_remark})},
        set_friend_imageUml:(friend_imageUml)=>{dispatch({type:"set_friend_imageUml",friend_imageUml:friend_imageUml})}
    }
}

Friends=connect(mapStateToProps,mapDispatchToProps)(Friends)
export default Friends;
