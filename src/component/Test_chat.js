import Chat from 'chat-react';
import React,{Component} from 'react';
import "./Test.css"
export default class MyChat extends Component {
    state = {
        inputValue: '',
        messages: [],
        timestamp: new Date().getTime()
    }
    setInputfoucs = () => {
        this.chat.refs.input.inputFocus();  //set input foucus
    }
    setScrollTop = () => {
        this.chat.refs.message.setScrollTop(1200);  //set scrollTop position
    }
    sendMessage = (v) => {
        const {value} = v;
        if (!value) return;
        const {messages = []} = this.state;
        messages.push(v);
        this.setState({messages, timestamp: new Date().getTime(), inputValue: ''});
    }
    render() {
        const {inputValue, messages, timestamp} = this.state;
        const userInfo = {
            avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            userId: "59e454ea53107d66ceb0a598",
            name: 'ricky'
        };
        const customEmoticon = [
            {
            timestamp: 1545925494422,
            userInfo: {
                avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                name: "游客1544365758856",
                userId: "1544365758856"
            },
            value: "hello~"
        },  {
            timestamp: 1545925534218,
            userInfo: {
                avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                name: "游客1544365758856",
                userId: "1544365758856"
            },
            value: "测试消息2",
            error: true //设置消息状态为失败，显示错误状态图标
        },
            {
                timestamp: 1545925494422,
                userInfo: {
                    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                    name: "游客1544365758856",
                    userId: "59e454ea53107d66ceb0a598"
                },
                value: "hello~"
            },
            {
                timestamp: 1545925494422,
                userInfo: {
                    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                    name: "游客1544365758856",
                    userId: "59e454ea53107d66ceb0a598"
                },
                value: "hello~"
            },
            {
                timestamp: 1545925494422,
                userInfo: {
                    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                    name: "游客1544365758856",
                    userId: "59e454ea53107d66ceb0a598"
                },
                value: "hello~"
            },
            {
                timestamp: 1545925494422,
                userInfo: {
                    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                    name: "游客1544365758856",
                    userId: "59e454ea53107d66ceb0a598"
                },
                value:"123"
            },
            {
                timestamp: 1545925494422,
                userInfo: {
                    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                    name: "游客1544365758856",
                    userId: "59e454ea53107d66ceb0a598"
                },
                value: "hello~"
            },
            {
                timestamp: 1545925494422,
                userInfo: {
                    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                    name: "游客1544365758856",
                    userId: "59e454ea53107d66ceb0a598"
                },
                value: "hello~"
            }
        ]
        return (
            <div className="testcontainer">
            <Chat
                ref={el => this.chat = el}
                className="my-chat-box"
                dataSource={customEmoticon}
                userInfo={userInfo}
                value={inputValue}
                sendMessage={this.sendMessage}
                timestamp={timestamp}
                placeholder="请输入"
                messageListStyle={{width: '100%', height:"40vh"}}
            >

            </Chat>
            </div>
        );
    }
}
