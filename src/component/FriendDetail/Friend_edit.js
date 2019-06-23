import React, { Component } from 'react';
import {Button, Checkbox, Icon, Input,Form,Drawer,message} from "antd";
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


class Friend_edit extends Component{

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
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
                this.edit_friend_submit(this.props.userID,this.props.select_friend_id,values.remark,values.groupName)
            }
        })

        //关闭抽屉
        this.onClose()

        //重新获取好友列表
        /*this.get_friend_data()*/
        }

    //向后端提交修改信息的接口
    edit_friend_submit=(userID,friendID,remark,groupName)=>{
        var fd = new FormData();
        fd.append("userID",userID);
        fd.append("friendID",friendID);
        fd.append("remark",remark);
        fd.append("groupName",groupName);
        let config = {
            headers: {
                'Content-Type':'multipart/form-data',
            }
        }
        axios.post(`${ajax_url}/changeFriendInfo.php`,fd,config)
            .then(res => {
                console.log(res)
                //这里写反馈

                //修改完成之后再次获取好友列表
                this.get_friend_data()
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

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div >
                <Drawer
                    title="修改好友信息"
                    width={600}
                    onClose={this.onClose}
                    visible={this.props.visible}
                >

                    <br/>

                    <Form {...formItemLayout}  onSubmit={this.handle_edit_friend}>


                        <Form.Item
                            label="备注"
                        >
                            {getFieldDecorator('remark', {
                                rules: [{
                                    required: true, message: '请输入备注!',
                                }],
                            })(
                                <Input  />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="分组名"
                        >
                            {getFieldDecorator('groupName', {
                                rules: [{
                                    required: true, message: '请输入分组名!',
                                }],
                            })(
                                <Input  />
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
        visible:state.disflag.friend_edit_visible,
        userID:state.login.uid,
        select_friend_id:state.friend_detail.select_friend_id
    }
}

function mapDispatchToProps(dispatch){
    return{

        set_visible:(flag)=>{dispatch({type:"set_friend_edit_visible",visible:flag})},
        set_friend_list:(friend_list)=>{dispatch({type:"set_friend_list",friend_list:friend_list})}

    }
}
Friend_edit=connect(mapStateToProps,mapDispatchToProps)(Friend_edit)
export default Form.create()(Friend_edit);
