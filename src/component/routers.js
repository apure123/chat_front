import Login from "./Login/Login";
import Chat_page from "./Chat_page/chat_page";

export const routers=[

    {
        path:"/",
        component:Login,
        exact:true
    },
    {
        path:"/chat",
        component:Chat_page
    }


]
