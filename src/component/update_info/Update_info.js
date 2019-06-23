import React, { Component } from 'react';
import {Button, Checkbox, Icon, Input,Form,Drawer,message,Radio} from "antd";
import {connect} from "react-redux";
import axios from "axios"
import ajax_url from "../../ajax/ajax_url";



const { TextArea } = Input
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 10},
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 4,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


class Update_info extends Component{

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        value: 1,
    };


    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    //关闭抽屉
    onClose = () => {
        this.props.set_visible(false);
    };

    //修改信息按钮
    handle_edit_friend=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.edit_friend_submit(this.props.userID,values.nickname,values.password,values.signature,"test.jpg",values.email,this.state.value)
            }
        })

        //关闭抽屉
        this.onClose()

        //重新获取好友列表
        /*this.get_friend_data()*/
    }

    //向后端提交修改个人信息的接口
    edit_friend_submit=(userID,nickname,password,signature, imageUrl,email,gender)=>{
        var fd = new FormData();
        fd.append("userID",userID);
        fd.append("nickname",nickname);
        fd.append("password",password);
        fd.append("signature",signature);
        fd.append("imageUrl",imageUrl);
        fd.append("email",email);
        fd.append("gender",gender);
        let config = {
            headers: {
                'Content-Type':'multipart/form-data',
            }
        }
        axios.post(`${ajax_url}/updateinfo.php`,fd,config)
            .then(res => {
                console.log(res)
                //这里写反馈


            }).catch( res => {
            console.log(res);
        })

    }


    get_friend_data=()=>{

        var fd = new FormData()
        fd.append('userID', this.props.userID)
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post(`${ajax_url}/checkFriendList.php`, fd,config)
            .then( (response) => {
                    console.log("获取好友列表完成!" )
                    console.log(response)
                    this.props.set_friend_list(response.data)
                }
            )
            .catch(function (error) {
                console.log(error);

            })
    }

    //密码框对应的方法
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    //确认密码框的方法
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次新密码输入不一致!');
        } else {
            callback();
        }
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };



    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        return(
            <div >
                <Drawer
                    title="修改个人信息"
                    width={600}
                    onClose={this.onClose}
                    visible={this.props.visible}
                >

                    <br/>

                    <Form {...formItemLayout}  onSubmit={this.handle_edit_friend}>


                        <Form.Item label={"昵称"} >
                            {getFieldDecorator('nickname', {
                                rules: [{
                                    message: '请输入!',
                                }, {
                                    required: true, message: 'Please input your !',
                                }],
                            })(
                                <Input  />
                            )}
                        </Form.Item>
                        <Form.Item label={"ID"} >
                            {getFieldDecorator('id', {
                                rules: [{
                                    message: '请输入id!',
                                }, {
                                    required: true, message: 'Please input your id!',
                                }],
                            })(
                                <Input  />
                            )}
                        </Form.Item>
                        <Form.Item label={"性别"} >
                                <Radio.Group onChange={this.onChange} value={this.state.value}>
                                    <Radio value={0}>未知</Radio>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>

                                </Radio.Group>

                        </Form.Item>
                        <Form.Item
                            label="原密码"
                        >
                            {getFieldDecorator('oldpassword', {
                                rules: [{
                                    required: true, message: '请输入原密码!',
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="新密码"
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入新密码!',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="确认密码"
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请再次输入您的密码!',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="签名"
                        >
                            {getFieldDecorator('signature', {
                                rules: [{ required: true, message: '请输入您的签名' }],
                            })(
                                <TextArea   ></TextArea>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="邮箱"
                        >
                            {getFieldDecorator('email')(
                                <Input   ></Input>
                            )}
                        </Form.Item>






                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button  type="primary"  htmlType="submit"  >
                                Submit
                            </Button>

                        </div>
                    </Form>

                </Drawer>


            </div>
        )
    }

}
function mapStateToProps(state)
{
    return{
        visible:state.disflag.update_info_visible,
        userID:state.login.uid,
        select_friend_id:state.friend_detail.select_friend_id
    }
}

function mapDispatchToProps(dispatch){
    return{

        set_visible:(flag)=>{dispatch({type:"set_update_info_visible",visible:flag})},
        set_friend_list:(friend_list)=>{dispatch({type:"set_friend_list",friend_list:friend_list})},

    }
}
Update_info=connect(mapStateToProps,mapDispatchToProps)(Update_info)
export default Form.create()(Update_info);
