import React,{Component} from 'react';
import "./Send_window.css"

class Send_window extends Component{
    render() {
        return(
            <div>
                <div className="send" data-reactid=".0.0.0.1.1">
                    <textarea placeholder="按 Enter 发送, Ctrl + Enter 可换行"
                              name="content"
                              data-reactid=".0.0.0.1.1.0"></textarea>
                    <p className="hadler clearfix" data-reactid=".0.0.0.1.1.1">
                        <button className="fl hide" data-reactid=".0.0.0.1.1.1.0">送客</button>
                        <button className="fr" data-reactid=".0.0.0.1.1.1.1">发送</button>
                        <span className="tips" data-reactid=".0.0.0.1.1.1.2">不能发送空白信息或特殊字符</span></p>
                </div>
            </div>
        )
    }
}
export default Send_window
