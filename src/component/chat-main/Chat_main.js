import React,{Component} from 'react';
import "./Chat_main.css"
import {connect} from "react-redux";
import axios from 'axios';
import {Input,Button,List,Form,Avatar,message,Upload, Icon}from "antd"

import Message_window from "./message_window/Message_window";
import Send_window from "./send_window/Send_window";
import MyChat from "../Test_chat";
import Friend_edit from "../Chat_page/chat_page";
import ajax_url from "../../server_config/ajax_url";
const { TextArea } = Input;
var ws = new WebSocket("ws://127.0.0.1:8282");
ws.pingInterval = 55;
ws.pingNotResponseLimit = 1;
ws.pingData = '';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}




class Chat_main extends React.Component{

    //构造器，包含ws的事件函数
    constructor(props) {
        super(props);
        this.state={
            inputmsg:"",
            loading: false,
        }

        ws.onopen = (evt)=> {

            console.log("******************************Connection open ...************************");
            this.bind()
            /*ws.send("Hello WebSockets!");*/
        };

        //收到消息时
        ws.onmessage = (evt)=> {
            console.log( "***********************Received Message:*************************** " );
            console.log(evt.data)
            /*ws.close()*/
            let permessage=JSON.parse(evt.data)
            console.log("先打印消息的json对象")
            console.log(permessage)
            if (permessage.type==="text"){
                this.props.add_message(permessage.data,"other",this.props.friend_id,"text")
            }
            else if(permessage.type==="say_img"){
                /*console.log(permessage)
                console.log("++++++++++++++++++这里收到了一个图片+++++++++++++++++++++++++++++++++")
                console.log(permessage.data)*/
                this.props.add_message(permessage.data,"other",this.props.friend_id,"image")
            }
            else {//其他的数据类型，比如说save
                /*this.props.add_message(permessage.data,"other",this.props.friend_id,"text")*/
            }

        };

        ws.onclose = function(evt) {
            console.log("**************ws连接关闭了**************");
        };

    }

    componentDidMount() {
        console.log("执行绑定")
        this.bind()
        //获取历史记录
        this.get_history_message(this.props.userID,this.props.friend_id)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("********************获取历史记录*********************")
        //获取历史记录
        this.get_history_message(this.props.userID,this.props.friend_id)
    }

    //ws发送绑定信息
    bind=()=>
    {
        var data={type:"bind",fromid:this.props.userID,toid:this.props.friend_id}
        let senddata_s=JSON.stringify(data)
        console.log(ws)
        if (ws.readyState===1) {
            ws.send(senddata_s);
        }

    }

    //发送文本消息
    send=(userID,toid)=>{
        this.props.add_message(this.props.form.getFieldValue("message_input"),"me",toid,"text")
        let senddata={type:"say",data:this.props.form.getFieldValue("message_input"),
            fromid:userID,toid:toid}
            let senddata_s=JSON.stringify(senddata)
            console.log(senddata_s)
        ws.send(senddata_s)
    }

    //发送图片
    send_image=(userID,toid,imageUrl)=>{
        /*this.props.add_message(this.props.form.getFieldValue("message_input"),"me",toid)*/
        let senddata={type:"say_img",data:imageUrl,
            fromid:userID,toid:toid}
        let senddata_s=JSON.stringify(senddata)
        console.log(senddata_s)
        ws.send(senddata_s)
        //加到消息窗口
        this.props.add_message(imageUrl,"me",this.props.friend_id,"image")

}

    //获取与这个好友聊天的记录对象在总记录数组中的位置
    get_messageKey_by_friend_id=(friend_id)=>{

        for (let i = 0; i <this.props.all_message.length ; i++) {
        if(this.props.all_message[i].friend_id===friend_id){
            return i
        }
        }
        return 0
    }

    //获取与这个好友的历史聊天记录
    get_history_message=(userID,friendID)=>{
        var fd = new FormData();
        fd.append("userID",userID);
        fd.append("friendID",friendID);
        let config = {
            headers: {
                'Content-Type':'multipart/form-data',
            }
        }
        axios.post(`${ajax_url}/checkHistoryMessage.php`,fd,config)
            .then(res => {
                console.log(res)
                //这里存储数据
                this.props.add_history_message(friendID,res.data)
            }).catch( res => {
            console.log(res);
        })


    }


    //上传图片组件的handleChange
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>{
                    this.setState({
                        imageUrl,
                        loading: false,
                    })
                console.log("我们成功获取到了这个图片的base64")
                console.log(imageUrl)
                //发送图片
                this.send_image(this.props.userID,this.props.friend_id)
            },
            );
        }
    };

    //直接在这个函数里面获取base64
    beforeUpload=(file)=> {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        //获取图片base64
        if (isJPG && isLt2M){
            getBase64(file, imageUrl =>{
                this.setState({
                    imageUrl,
                    loading: false,
                })
                this.send_image(this.props.userID,this.props.friend_id,imageUrl)
            })

        }
        return isJPG && isLt2M;
    }

    render() {
        const { getFieldDecorator } = this.props.form

        let message_perfriend_Key=0
        message_perfriend_Key=this.get_messageKey_by_friend_id(this.props.friend_id)
       let message_perfriend=this.props.all_message[message_perfriend_Key].messageList
        return(
            <div style={{width:"100%",height:"100%"}} >


               {/* 这里是消息窗口*/}
                {message_window_creator.get_message_window(this.props.friend_id,this.get_messageKey_by_friend_id)}


                <div style={{height:"35%"}}>
                    <Form style={{height:"100%",marginBottom:"0px"}} >
                        <Form.Item style={{marginBottom:"0px"}} >
                            {getFieldDecorator('message_input', {
                                rules: [],
                            })(
                                <TextArea
                                    placeholder="发送测试消息"
                                    autosize={{ minRows: 6, maxRows: 6 }}
                                />
                            )}
                        </Form.Item>
                        <Upload
                            name="avatar"
                            /*listType="picture-card"*/
                            className="avatar-uploader"
                            showUploadList={false}
                            /*action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/
                            beforeUpload={this.beforeUpload}
                            /*onChange={this.handleChange}*/
                            style={{float:"right"}}

                        >
                            <Button size={"small"} style={{float:"right",marginTop:"0px",paddingTop:"0px",marginBottom:"10px"}}>
                                <Icon type="file-image" />
                            </Button>
                        </Upload>
                        <Button size={"small"} onClick={
                            ()=>{
                                if (this.props.form.getFieldValue("message_input")===""){
                                    message.error("不能发送空内容")
                                } else {
                                    //发送消息
                                    this.send(this.props.userID,this.props.friend_id)
                                    this.props.form.setFieldsValue({message_input:""})
                                }
                            }
                        } style={{float:"right",marginTop:"0px",paddingTop:"0px",marginBottom:"10px"}}>发送</Button>
                    </Form>

                </div>

            </div>
        )
    }
}


function mapStateToProps(state)
{
    return{
        all_message:state.message.all_message,
        userID:state.login.uid,
        friend_id:state.chat_params.friend_id
    }
}

function mapDispatchToProps(dispatch){
    return{
        add_message:(message_content,owner,friend_id,message_type)=>{dispatch(
            {type:"add_message",message_content:message_content,owner:owner,friend_id:friend_id,
                message_type:message_type}
            )},
        add_history_message:(friend_id,history_message)=>{dispatch(
            {type:"add_history_message",friend_id:friend_id,history_message:history_message}
            )}
    }
}
Chat_main=connect(mapStateToProps,mapDispatchToProps)(Chat_main)
export default Form.create()(Chat_main);



//工厂类
class message_window_creator {
    static get_message_window=(friend_id,get_messageKey_by_friend_id)=>{
            return(<Message_window
                get_messageKey_by_friend_id={get_messageKey_by_friend_id }
                friend_id={friend_id}
            />)
    }
}
