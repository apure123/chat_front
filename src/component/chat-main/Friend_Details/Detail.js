import React,{Component} from 'react';
import axios from 'axios';

//const axios=require('axios');
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            str:'1',   //用来更改备注和分组的变量 
            domain:'94.191.100.98', //php中所写的数据库地址
            data:[],     //接收json
            genderSign:'未知',
            UserId:1,     //因为当前数据库里只存储了这两个Id，所以只能用这两个，我不太清楚这里是不是应该通过路由机制动态赋值
            FriendId:3,
            apiDoamin:'http://localhost:801/api/' //这是本机地址，后期需要更改
        };
        
    }
    requestData=()=>{
        var api=this.state.apiDoamin+'checkFriend.php'
        axios.get(api,this.state.UserId,this.state.FriendId)
          .then((response)=>{
            console.log(response);
            this.setState({
                data:response.data[0]
            });
            if (this.state.data.gender=='1') {
                this.setState({
                    gender:'男'
                });
            }
            else if(this.state.data.gender=='2')
            {
                this.setState({
                    gender:'女'
                });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    inputChange=(e)=>{
        this.setState({
            str:e.target.value
        })
    }
    getInputA=(e)=>{
        var api=this.state.apiDoamin+'changeFriendInfo.php';
        let data = new FormData();
        data.append('userID',this.state.UserId);
        data.append('friendID',this.state.FriendId);
        data.append('remark',this.state.str);
        data.append('groupName',this.state.data.groupName);
        axios.post(api,data)
          .then(function (response) {
            alert('修改成功');
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    getInputG=(e)=>{
        var api=this.state.apiDoamin+'changeFriendInfo.php'
        let data = new FormData();
        data.append('userID',this.state.UserId);
        data.append('friendID',this.state.FriendId);
        data.append('remark',this.state.data.remark);
        data.append('groupName',this.state.str);
        axios.post(api,data)
          .then(function (response) {
            alert('修改成功');
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    deleteFriend=()=>{ 
        alert('删除成功');
        var api=this.state.apiDoamin+'deleteFriend.php'
        let data = new FormData();
        data.append('userID',this.state.UserId);
        data.append('friendID',this.state.FriendId);
        axios.post(api,data)
          .then(function (response) {
            alert('修改成功');
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    componentDidMount(){
        this.requestData();
    }
    render() {
        return (
          <div className='Friends'>
              <div className='Detail'>
                  <img src={`${this.state.domain}${this.state.data.imgUrl}`} />
                  <h1>{this.state.data.nickname}</h1>
                  <h2>个性签名:{this.state.data.signature}</h2>
                  <h2>性别： {this.state.genderSign}</h2>
                  <h3>邮箱： {this.state.data.email}</h3>
                  <h3>备注：<input type='text' border='0' placeholder={this.state.data.remark} onChange={this.inputChange} />   <button onClick={this.getInputA}>修改备注</button></h3>
                  <h3>分组：<input type='text' border='0' placeholder={this.state.data.groupName} onChange={this.inputChange} />   <button onClick={this.getInputG}>修改分组</button></h3>
                  <button onClick={this.deleteFriend}>删除好友</button>
              </div>
          </ div>  
        );
    }
}

export default Detail;