import React,{useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/userContext';
import ErrorNotice from "./ErrorNotice";


const SignUp =()=>{

    const [email,setEmail] =useState();
    const [password,setPassword]= useState();
    const [passwordCheck,setPasswordCheck]=useState();
    const [name,setName] =useState();
    const [role,setRole]=useState();
    const [error,setError] =useState();
    

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e)=>{
        e.preventDefault();

        try{
            const newUser ={email,password,passwordCheck,name};
            await axios.post("http://localhost:5000/api/v1/users/register",newUser);
            const loginResponse =await axios.post("http://localhost:5000/api/v1/users/login",{
                email,password
            });

            console.log(loginResponse);
            setUserData({
                token:loginResponse.data.token,
                user:loginResponse.data.user,
                role:loginResponse.data.role
            })

            localStorage.setItem("auth-token",loginResponse.data.token);
            history.push("/");

        }catch(err){
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
    <div className="ui segment register">
        <h2>Register</h2>
        { error && <ErrorNotice message={error} clearError={()=>setError(undefined)}/>}

        <form onSubmit={submit} className="ui form"> 
        <div className="inline field">

            <input type="email" id="email"  className="" onChange={e=> setEmail(e.target.value)}  placeholder="Enter Email Address"/>
            <input type="password" id="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)}/>
            <input type="password" placeholder="confirm password" onChange={e=>setPasswordCheck(e.target.value)}/>
            <input type="text" id="name" onChange={e=>setName(e.target.value)} placeholder="Enter Name" />
        </div>         
         
          <div className="ui button radio">
          <label>
            <input
              type="radio"
              value="0"
              checked={role==="0"}
              onChange={e=>setRole(e.target.value)}
            />
            Teacher
          </label>
          <label>
            <input
              type="radio"
              value="1"
              checked={role==="1"}
              onChange={e=>setRole(e.target.value)}
            />
            Student
          </label>
    </div>
    <button className="ui green button ">Sign-Up</button>
        
        </form>
        
    </div>)
}

export default SignUp;