import React, { Component } from 'react';
import {Card, Layout, Menu, Icon, Button, Form, Input, Checkbox, Avatar,message} from 'antd';
import {Redirect }from "react-router-dom"
import "./login.css"
import {connect} from "react-redux"

import Register from "./Register";
import axios from "axios"
import ajax_url from "../../ajax/ajax_url";


const {
    Header, Content, Footer, Sider,
} = Layout;
const Formitem=Form.item;


class Login extends Component{
    constructor(props) {
        super(props);

    }


componentDidMount() {
        /*console.log(this.props.registerFlag)*/
}

//登录提交的方法
    logintest=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        console.log("捕获的用户名为：")
        console.log(this.props.form.getFieldValue("loginUserName"))
        console.log(this.props.form.getFieldValue("loginPassword"))

        //此处修改
        var fd = new FormData()
        fd.append('account', this.props.form.getFieldValue("loginUserName"))
        fd.append('password', this.props.form.getFieldValue("loginPassword"))
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post(`${ajax_url}/login.php`, fd,config)
            .then( (response) =>{
                console.log(response);

                if (response.data.result==="1")
                {
                    console.log("密码正确，开始登录");
                    //登录
                    this.props.loginsubmit(response.data.userid,response.data.nickname,response.data.account)
                }
                else message.error("登录失败:"+response.data.message)
            })
            .catch(function (error) {
                console.log(error);
                message.error("登录失败")
            })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {register}=this.props

        // if (this.props.loginflag)
        // {
        //     return<Redirect to={"/system"}/>
        // }
        return(

            <div className="Login">
                {this.props.loginflag?<Redirect to={"/chat"}/>:""}
                {/*左边注册部分*/}
                <div style={{width:"75%",float:"left",margin:"0",minHeight:"700px"}}>


                    {
                        this.props.registerFlag ?
                            <Register/>
                            :
                            <div></div>
                    }

                </div>


                {/*登录部分*/}
            <div className={"login"}>

                <br/>
                <Form onSubmit={this.logintest}style={{margin:"auto",marginTop:"10%",marginBottom:"100%"}}>

                    <Avatar shape="square" icon={"user"} size={100}  style={{display:"inline-block",margin:"50px"}}/>


         <Form.Item>
                        {getFieldDecorator('loginUserName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="用户名" style={{margin:"auto",width:"61.8%"}} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('loginPassword', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码"  style={{margin:"auto",width:"61.8%"}}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{margin:"auto",marginRight:"10px",marginLeft:"10px"}} >登录</Button>
                        <Button onClick={register}>注册</Button>

                    </Form.Item>


                </Form>



            </div>

            </div >
        )
    }

}

function mapStateToProps(state)
{
    return{
        registerFlag:state.login.regflag,
        loginflag:state.login.loginflag
    }
}

function mapDispatchToProps(dispatch){
    return{

        register:()=>{dispatch({type:"open_register"})},

        loginsubmit:(uid,nickname,account)=>{
        dispatch({type:"login",nickname:nickname,uid:uid,account:account});
        },
    }
}

Login=connect(mapStateToProps,mapDispatchToProps)(Login)
export default Form.create() (Login);
