import React,{Component} from 'react';
import { Modal, Button,Row, Col } from 'antd';
import {connect} from "react-redux"
import Detail from "./Detail_body";
import Friend_edit from "../Chat_page/chat_page";

class FriendDetail extends Component{

    constructor(props) {
        super(props);

    }
    componentDidMount() {
        console.log("弹窗挂载了")
    }

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
        this.props.set_visible(true)
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
        this.props.set_visible(false)
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
        this.props.set_visible(false)
    };

    edit=()=>{
        this.props.set_visible(false)
        this.props.set_edit_visible(true)
    }

    render() {
        return (
            <div>

                <Modal
                    title="好友详细信息"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >

                    <p>这里是好友的详细信息</p>
                    <br/>
                    <Row>
                        <Col span={12}>
                            <p>昵称</p>
                        </Col>
                        <Col span={12}>
                            <p>{this.props.friend_detail_message.nickname}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <p>签名</p>
                        </Col>
                        <Col span={12}>
                            <p>{this.props.friend_detail_message.signature}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <p>性别</p>
                        </Col>
                        <Col span={12}>
                            {this.props.friend_detail_message.gender==="0"?<p>0是什么性别</p>:<p>1的性别</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <p>email</p>
                        </Col>
                        <Col span={12}>
                            <p>{this.props.friend_detail_message.email}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <p>remark</p>
                        </Col>
                        <Col span={12}>
                            <p>{this.props.friend_detail_message.remark}</p>
                        </Col>
                    </Row><Row>
                    <Col span={12}>
                        <p>分组名称</p>
                    </Col>
                    <Col span={12}>
                        <p>{this.props.friend_detail_message.groupName}</p>
                    </Col>
                </Row>




                    <Button onClick={()=>this.edit()}>打开抽屉，编辑这个好友的信息</Button>
                </Modal>

            </div>
        );
    }

}

function mapStateToProps(state)
{
    return{

        loginflag:state.login.loginflag,
        nickname:state.login.nickname,
        userid:state.login.uid,
        visible:state.disflag.friend_detail_visible,
        friend_detail_message:state.friend_detail.friend_detail_message
    }
}

function mapDispatchToProps(dispatch){
    return{

        set_visible:(visible)=>{dispatch({type:"set_friend_detail_visible",visible:visible})},
        set_edit_visible:(visible)=>{dispatch({type:"set_friend_edit_visible",visible:visible})}
    }
}

FriendDetail=connect(mapStateToProps,mapDispatchToProps)(FriendDetail)
export default FriendDetail;
