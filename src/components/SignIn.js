import React,{useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/userContext';
import ErrorNotice from './ErrorNotice';


const SignIn=()=>{
    const [email,setEmail] = useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState();

    const {setUserData} = useContext(UserContext);
    const history =useHistory();

    const submit=async (e)=>{
        e.preventDefault();

        try{

            const loginUser = {email,password}

            const loginResponse =await axios.post("http://localhost:5000/api/v1/users/login",loginUser);

            setUserData({
                token:loginResponse.data.token,
                user:loginResponse.data.user
            });
            localStorage.setItem("auth-token",loginResponse.data.token);
            history.push("/")

        }catch(err){
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    
    return (<div className="login">
            <h2>Login</h2>
            {error && <ErrorNotice message={error} clearError={()=>setError(undefined)}/>}

            <form onSubmit={submit}>
                <input placeholder="Enter Email" type="email" id="email" onChange={e=>setEmail(e.target.value)}/>
                <input placeholder="Enter Password" type="password" id="password" onChange={e=>setPassword(e.target.value)}/>
                <button  className="ui yellow button">Sign-In</button>


            </form>
    </div>)

};


export default SignIn;