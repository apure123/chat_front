import React,{Component} from 'react';
import "./Head.css"
import { Avatar,Button ,message} from 'antd';
import {connect} from "react-redux"
import axios from "axios"
import ajax_url from "../../../ajax/ajax_url";
import MyInfo from "../../MyInfo/MyInfo";

class Head extends Component{

    quit=()=>{
        var fd = new FormData()
        fd.append('userid', this.props.userid)
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post(`${ajax_url}/logout.php`, fd,config)
            .then( (response) =>{
                console.log(response);

                if (response.data.result==="1")
                {
                   message.success(response.data.message)
                }
                else message.error(response.data.message)
            })
            .catch(function (error) {
                console.log(error);
                message.error("退出失败")
            })

        //跳转登录页
        this.props.quit();


    }
    render() {
        return(
            <div>
            <div style={{display:"flex",margin:"10px",padding:"10px"}}>
                <MyInfo/>
                <h2 style={{margin:"auto",marginLeft:"20px"}}>{this.props.nickname}</h2>

                <Button onClick={()=>this.quit()}>退出</Button>
            </div>

            </div>
        )
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

        quit:()=>{dispatch({type:"quit"})}
    }
}

Head=connect(mapStateToProps,mapDispatchToProps)(Head)
export default Head;
