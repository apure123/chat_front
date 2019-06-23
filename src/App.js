import React from 'react';
import {routers} from "./component/routers";
import {BrowserRouter as Router,Route,Link}from "react-router-dom"
import "./App.css"
function App() {
  return (<div className={"App"}>
      <Router>
      {
          routers.map((route,key)=>{
              if(route.exact){
                  return <Route key={key} exact path={route.path} component={route.component} />
              }
              else {
                  return <Route key={key}  path={route.path} component={route.component} />
              }
          })
      }
      </Router>
      </div>
  );
}

export default App;
