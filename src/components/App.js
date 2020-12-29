import React, {useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Home from './DashBoard';
import Register from './SignUp';
import Login from './SignIn';
import UserContext from '../context/userContext';


const App=()=>{
    const [userData, setUserData]= useState({
        token:undefined,
        user:undefined,
       
    })

    useEffect(() => {
        const checkLoggedIn = async () => {

          let token = localStorage.getItem("auth-token");

          if(token === null){
            localStorage.setItem("auth-token", "");
            token = "";
          }

          const tokenResponse = await axios.post('http://localhost:5000/api/v1/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
          console.log('token Response',tokenResponse);
          if (tokenResponse.data) {
            const userRes = await axios.get("http://localhost:5000/api/v1/users/home", {
              headers: { "x-auth-token": token },
            });

            console.log('userRef',userRes);
            setUserData({
              token,
              user: userRes.data,
              
            });
          }
        }
    
        checkLoggedIn();
      }, []);
    return (
        <BrowserRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
            </UserContext.Provider>
        </BrowserRouter>
      );
}

export default App;