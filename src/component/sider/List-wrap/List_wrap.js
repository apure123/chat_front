import React,{Component} from 'react';
import "./List-wrap.css"
import { Layout, Menu, Avatar,Icon,Button } from 'antd';
import Friends from "./Friends/Friends";
import Detail from "../../chat-main/Friend_Details/Detail";
import Nav from "./New_Friends/nav";
import {connect} from "react-redux"
import axios from "axios"

import ajax_url from "../../../server_config/ajax_url";
import Message_list from "./Message_list/Message_list";
import FriendDetail from "../../FriendDetail/FriendDetail";
import Add_friend from "../../Add_friend/Add_friend";

const { Header, Content, Footer } = Layout;



class List_wrap extends Component{

    constructor(props) {
        super(props);
        this.state={
            selectkey:"2"
        }
        this.get_friend_data()

    }
    componentDidMount() {

        this.get_friend_data()

    }

    get_friend_data=()=>{

        var fd = new FormData()
        fd.append('userID', this.props.userid)
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
        return(
                <div>
                <Layout style={{height:"100%"}}>
                    <Header style={{padding:"0px",display:"flex",margin:"auto",width:"100%",height:"8vh"}}>
                        <Menu defaultSelectedKeys={[this.state.selectkey]}
                              mode="horizontal"
                              theme="light"
                              style={{width:"100%"}}
                              onClick={({ item, key, keyPath, domEvent })=>{
                                  console.log(key)
                                  this.setState({selectkey:key})
                              }}
                        >
                            <Menu.Item key="1" >
                                <Icon type="message" />
                                消息
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="user" />
                                好友
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="user-add" />
                                好友请求
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content className={"list_wrap"} style={{backgroundColor:"#f0f0f0"}}>
                        {this.state.selectkey==="1"?<div>
                            <Message_list  get_friend_data={this.get_friend_data}/>
                        </div>:<div></div>}
                        {this.state.selectkey==="2"?<div>
                         <Friends data={this.props.friend_list} get_friend_data={this.get_friend_data}/>
                        </div>:<div></div>}
                        {this.state.selectkey==="3"?<div>
                            <Nav/>
                        </div>:<div></div>}

                    </Content>
                    <Footer style={{height:"7vh",backgroundColor:"#305a56",padding:"12px 50px"}}>
                        <Button ghost size={"small"} style={{marginRight:"10px",float:"left"}} onClick={()=>this.props.set_update_info_visible(true)}>编辑个人信息</Button>
                        <Add_friend/>
                    </Footer>

                </Layout>
                    <FriendDetail/>
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

        set_friend_list:(friend_list)=>{dispatch({type:"set_friend_list",friend_list:friend_list})},
        set_update_info_visible:(visible)=>{dispatch({type:"set_update_info_visible",visible:visible})}
    }
}

List_wrap=connect(mapStateToProps,mapDispatchToProps)(List_wrap)
export default List_wrap
