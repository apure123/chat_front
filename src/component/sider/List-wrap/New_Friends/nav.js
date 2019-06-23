import React from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import {connect} from "react-redux"
import axios from 'axios';
import ajax_url from "../../../../ajax/ajax_url";

const count = 3;
//var userID = 2;

class Nav extends React.Component {



        state = {
            initLoading: true,
            loading: false,
            domain:'http://127.0.0.1',
            data: [],
            list: [],
        };


        //获取请求列表？？？
    test2(){
        var fd = new FormData();
        fd.append("friendID",this.props.userid);

        let config = {
            headers: {
                'Content-Type':'multipart/form-data',
        }
        }
        axios.post(`${ajax_url}/checkRequestList.php`,fd,config)
            .then(res => {
                console.log(res)
                this.setState({
                    initLoading: false,
                    data:res.data
                });
            }).catch( res => {
            console.log(res);
        })



    }

    //对一条好友请求进行处理（接受或拒绝）
        test(userID,friendID,requestID,result){
        console.log("userID:"+userID,"friendID:"+friendID);
            var fd = new FormData();
            fd.append("userID",userID);
            fd.append("friendID",friendID);
            fd.append("requestID",requestID);
            fd.append("result",result);
            let config = {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }
            axios.post(`${ajax_url}/handleRequest.php`,fd,config)
                .then(res => {
                    //处理完成之后再次获取列表
                    this.test2();
                    console.log(res)
            }).catch( res => {
                console.log(res);
            })



        }


        componentDidMount() {
            this.test2();
        }





    render() {
        const {initLoading} = this.state;

        return (
            <nav>
<div>
    <div>
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={item => (
                <List.Item actions={[<button  onClick={()=>this.test(item.userID,this.props.userid,item.requestID, 1)}>同意</button>,
                    <button onClick={()=>this.test(item.userID,this.props.userid,   item.requestID,2)}>拒绝</button>]}>
                    <Skeleton avatar title={false} loading={item.loading} active>


                        <List.Item.Meta
                            avatar={
                                <Avatar src={item.imageUrl} />
                            }
                            title={<a href="#"> 用户：{item.nickname}</a>}
                            description="请求添加你为好友"
                        />
                    </Skeleton>
                </List.Item>
            )}
        />

    </div>
</div>
            </nav>


        );
    }
}
function mapStateToProps(state)
{
    return{

        loginflag:state.login.loginflag,
        nickname:state.login.nickname,
        userid:state.login.uid
    }
}

function mapDispatchToProps(dispatch){
    return{

    }
}

Nav=connect(mapStateToProps,mapDispatchToProps)(Nav)
export default Nav;
