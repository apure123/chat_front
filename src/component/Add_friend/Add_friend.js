import axios from 'axios';
import {connect} from "react-redux";
import React,{Component} from 'react';
import { Modal, Button,Input,message } from 'antd';
import ajax_url from "../../server_config/ajax_url";

class Add_friend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            friendID:""
        };
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            confirmLoading: true,
        });
        setTimeout(()=>{
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            if (this.state.friendID&&this.state.friendID!==""){
                this.send_add_feind_request(this.props.userID,this.state.friendID)
            }else {
                message.error("请先输入好友的id")
            }

        },500)

    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleInputChange= e =>{
        this.setState({
            friendID:e.target.value
        })
    }

    send_add_feind_request=(userID,friendID)=>{
        var fd = new FormData();
        fd.append("userID",userID);
        fd.append("friendID",friendID);
        let config = {
            headers: {
                'Content-Type':'multipart/form-data',
            }
        }
        axios.post(`${ajax_url}/sendRequest.php`,fd,config)
            .then(res => {
                console.log(res)
                //这里反馈结果
                if(res.data=="0"){
                    message.success("好友请求已发送")
                }
            }).catch( res => {
            console.log(res);
        })
    }

    render() {
        return(
            <div style={{display:"flex",width:"100px",float:"right"}}>
                <Button ghost size={"small"} onClick={this.showModal}>
                    添加好友
                </Button>
                <Modal
                    title="添加好友"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <p>根据好友的id发送添加好友请求</p>
                    <Input onChange={this.handleInputChange} placeholder={"在这里输入好友的id"}/>

                </Modal>
            </div>
        )
    }
}


function mapStateToProps(state)
{
    return{
        userID:state.login.uid,
    }
}

function mapDispatchToProps(dispatch){
    return{

    }
}
Add_friend=connect(mapStateToProps,mapDispatchToProps)(Add_friend)
export default Add_friend;
