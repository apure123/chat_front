import axios from 'axios';
import {connect} from "react-redux";
import React,{Component} from 'react';
import { Modal, Button,Avatar,message } from 'antd';
import ajax_url from "../../ajax/ajax_url";

class MyInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            myinfo:{
                account:"",
                nickname:"",
                signature:"",
                gender:"",
                email:"",
                imageUrl:""
            }
        };
        this.get_my_info()
    }

    componentDidMount() {
        this.get_my_info()
    }


    showModal = () => {
        this.get_my_info()
        this.setState({
            visible: true,

        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    //获取个人详细信息
    get_my_info=()=>{
        var fd = new FormData()
        fd.append('userID', this.props.userID)
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post(`${ajax_url}/checkMyself.php`, fd,config)
            .then( (response) =>{
                console.log(response);
                if (response.data[0]){
                    this.setState({myinfo:response.data[0]})
                    //顺便把my_imageUrl存起来
                    this.props.set_my_imageUrl(response.data[0].imageUrl)
                }

            })
            .catch(function (error) {
                console.log(error);
                message.error("退出失败")
            })




    }

    render() {
        return(
            <div style={{margin:"auto"}}>
                <span onClick={this.showModal}>
                    {this.state.myinfo.imageUrl?<Avatar src={this.state.myinfo.imageUrl} />
                    :<Avatar shape="square" size={64} icon="user" />
                    }


                </span>
                <Modal
                    title="我的个人信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.state.myinfo.imageUrl&&this.state.myinfo.imageUrl!=="image.jpg"?<img src={this.state.myinfo.imageUrl}/>:
                        <Avatar shape="square" size={48} icon="user" />}
                        <br/>
                        <br/>
                    <p>{`账号：${this.state.myinfo.account}`}</p>
                    <p>{`ID：${this.props.userID}`}</p>
                    <p>{`昵称：${this.state.myinfo.nickname}`}</p>
                    <p>{`签名：${this.state.myinfo.signature}`}</p>
                    <p>{`性别：${this.state.myinfo.gender}`}</p>
                    <p>{`邮箱：${this.state.myinfo.email}`}</p>
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
        set_my_imageUrl:(my_imageUrl)=>{dispatch({type:"set_my_imageUrl",my_imageUrl:my_imageUrl})}
    }
}
MyInfo=connect(mapStateToProps,mapDispatchToProps)(MyInfo)
export default MyInfo;
