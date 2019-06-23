import axios from 'axios';
import {connect} from "react-redux";
import React,{Component} from 'react';
import { Modal, Button } from 'antd';

class Add_friend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false
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
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return(
            <div style={{display:"flex",width:"100px",float:"right"}}>
                <Button size={"small"} onClick={this.showModal}>
                    添加好友
                </Button>
                <Modal
                    title="添加好友"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
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
