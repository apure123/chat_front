const Login_reducer=(state={
    loginflag:false,uid:8,regflag:false,nickname:"",account:""
},action)=>{
    switch (action.type) {
        case "login":{

            return{
                ...state,
                loginflag: true,
                uid:action.uid,
                nickname: action.nickname,
                account:action.account
            }
        }
        case "quit":{
            return{
                ...state,
                loginflag: false,
            }
        }
        case "open_register":{
            return{
                ...state,
                regflag:true
            }
        }
        case "close_register":{
            return{
                ...state,
                regflag:false
            }
        }
        default:return state
    }
}
export default Login_reducer
