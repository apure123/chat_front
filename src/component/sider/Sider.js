import React,{Component} from 'react';
import "./Sider.css"
import { Button}from "antd"
import axios from "axios"
import Head from "./Head/Head";
import List_wrap from "./List-wrap/List_wrap";

class  testcomponentFactory {
    static createComponent(props){
            return(<p>{props}</p>)
    }
}

class Sider extends Component{

    constructor(props) {
        super(props);
        this.state={context:""}
    }


    handlechange=(e)=>{
        this.setState({context:e.target.value})
    }

    test=()=>{
        var fd = new FormData()
        fd.append('userID', 1)
        fd.append('friendID', 2)
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post("http://localhost/test/checkHistoryMessage.php", fd,config)
            .then( res => {
            console.log(res)
        }).catch( res => {
            console.log(res)
        })

    }

    render() {
        return(
            <div className={"sider"}>
                <div style={{height:"15vh"}}><Head/></div>
                <div style={{height:"85vh"}}> <List_wrap/></div>

            </div>
        )
    }
}
export default Sider
