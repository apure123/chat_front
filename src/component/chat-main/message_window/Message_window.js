import React,{Component} from 'react';
import {Input,Button,List,Form,Avatar}from "antd"
import {connect} from "react-redux";

class Message_window extends Component{

    constructor(props) {
        super(props);

    }

    /*componentDidMount() {
        this.contentNode.scrollTop=this.contentNode.scrollHeight
    }*/

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.contentNode.scrollTop=this.contentNode.scrollHeight
        //参数更新时输出
        /*console.log("消息窗口组件更新时输出")*/

    }


    render() {
               /* console.log("聊天记录数的长度：")
        console.log(this.props.all_message[this.props.message_perfriend_Key].messageList.length)
        console.log("聊天记录")
        console.log([...this.props.all_message[this.props.message_perfriend_Key].messageList])*/
        var message_perfriend_Key=this.props.get_messageKey_by_friend_id(this.props.friend_id)
        return(

                <div className={"testmessage"} id={"test"} ref={ node => this.contentNode = node }>

                    <List
                        size="small"

                        /*bordered*/
                        dataSource={[...this.props.all_message[message_perfriend_Key].messageList]}
                        renderItem={item => <div style={{width:"96%",margin:"2%"}}>{item.owner=="me"?
                            <List.Item
                                style={{width:"60%",float:"right",margin:"10px",alignContent:"right"}}
                            >
                                {
                                    item.type==="image"?
                                        <img src={item.content} style={{width:"95%",backgroundColor:"#fff",float:"right",margin:"10px",padding:"10px",borderRadius:"5px"}}/>
                                    :
                                        <p style={{
                                            width:"95%",backgroundColor:"#fff",float:"right",margin:"10px",padding:"10px",borderRadius:"5px"
                                            ,wordWrap:"break-word",wordBreak:"break-all"
                                        }}
                                        >{item.content}</p>
                                }
                                {/*<p style={{
                                    width:"95%",backgroundColor:"#fff",float:"right",margin:"10px",padding:"10px",borderRadius:"5px"
                                    ,wordWrap:"break-word",wordBreak:"break-all"
                                }}
                                >{item.content}</p>*/}

                                <div style={{float:"right"}}>
                                    <Avatar  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </div>
                            </List.Item>
                            :
                            <List.Item style={{width:"60%",float:"left",margin:"10px"}}>
                                <div style={{float:"left"}}>
                                    <Avatar  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </div>
                                {
                                    item.type==="image"?
                                        <img src={item.content} style={{width:"95%",backgroundColor:"#fff",float:"right",margin:"10px",padding:"10px",borderRadius:"5px"}}/>
                                        :
                                        <p style={{
                                            width:"100%",backgroundColor:"#1da57a",float:"left",margin:"10px",padding:"10px",borderRadius:"5px"
                                            ,wordWrap:"break-word",wordBreak:"break-all"
                                        }}
                                        >{item.content}</p>
                                }

                                {/*<p style={{
                                    width:"100%",backgroundColor:"#1da57a",float:"left",margin:"10px",padding:"10px",borderRadius:"5px"
                                    ,wordWrap:"break-word",wordBreak:"normal"
                                }}
                                >{item.content}</p>*/}

                            </List.Item>
                        }
                        </div>}
                    />
                </div>
        )
    }
}

 const mapStateToProps=(state)=>
{
    return{
        /*message:state.message*/
        all_message:[...state.message.all_message],
        messageList:[...state.message.all_message]
    }
}

function mapDispatchToProps(dispatch){
    return{
        /*add_message:(message_content,owner)=>{dispatch(
            {type:"add_message",message_content:message_content,owner:owner}
        )}*/
    }
}
Message_window=connect(mapStateToProps,mapDispatchToProps)(Message_window)
export default Form.create()(Message_window);
