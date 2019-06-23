import React,{Component} from 'react';
var ws = new WebSocket("ws://123.207.167.163:9010/ajaxchattest");

ws.onopen = function(evt) {
    console.log("Connection open ...");
    /*ws.send("Hello WebSockets!");*/
};

ws.onmessage = function(evt) {
    console.log( "Received Message: " );
    console.log(evt.data)
    /*ws.close()*/
};

ws.onclose = function(evt) {
    console.log("Connection closed.");
};
class Websockettest extends Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {

    }

    render() {return(<div><button onClick={()=>console.log(ws.readyState)}>状态</button>
    <button onClick={()=>ws.send("123😀")}>发送123</button>
    </div>)
    }

}
export default Websockettest
