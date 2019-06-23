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
        let my_image_url=this.props.my_imageUrl
                if (my_image_url==="image.jpg") {
                    my_image_url="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                }
                //
                let friend_image_url="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        friend_image_url=this.props.friend_imageUml

       /* //遍历this.props.friend_list找出friend_image_url
        for (let i = 0; i <this.props.friend_list.length ; i++) {
            if (this.props.friend_list.length[i].friendID===this.props.friend_id){
                if (this.props.friend_list.length[i].imageUrl&&this.props.friend_list.length[i].imageUrl!=="image.jpg") {
                   //设置朋友的头像url
                    friend_image_url=this.props.friend_list.length[i].imageUrl
                }
            }
        }*/


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
                                        <div style={{width:"95%"}}>
                                        <img style={{width:"50%",backgroundColor:"#ffffff",float:"right",margin:"10px",padding:"10px",borderRadius:"5px"}} src={item.content} />
                                        </div>
                                    :
                                        <p style={{
                                            width:"95%",backgroundColor:"#fff",float:"right",margin:"10px",padding:"10px",borderRadius:"5px"
                                            ,wordWrap:"break-word",wordBreak:"break-all"
                                        }}
                                        >{item.content}</p>
                                }
                                <div style={{float:"right"}}>
                                    <Avatar  src={my_image_url} />
                                </div>
                            </List.Item>
                            :
                            <List.Item style={{width:"60%",float:"left",margin:"10px"}}>
                                <div style={{float:"left"}}>
                                    <Avatar  src={friend_image_url} />
                                </div>
                                {
                                    item.type==="image"?
                                        <div style={{width:"50%",marginLeft:"10px"}}>
                                        <img style={{width:"95%",backgroundColor:"#ffffff",float:"right",margin:"10px",padding:"10px",borderRadius:"5px"}} src={item.content} />
                                        </div>
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
        messageList:[...state.message.all_message],
        my_imageUrl:state.login.my_imageUrl,
        friend_imageUml:state.chat_params.friend_imageUml
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
