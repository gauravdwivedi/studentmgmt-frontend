import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../context/userContext";

function AuthOptions () {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
            role:undefined
        })
        localStorage.setItem("auth-token","");
    };

    return (
        <nav className="auth-options">
            {userData.user ? (
                <div>
                    <button className="btn btn-primary mr-2" >profile</button>
                <button className="btn btn-primary mr-2" onClick={logout}>Logout</button>
 
                </div>
            ) : (
                <>
                <button className="btn btn-primary mr-2" onClick={register}>Sign Up</button>
                <button className="btn btn-primary mr-2" onClick={login}>Login</button>
                </>
            )}
        </nav>
    )
}

export default AuthOptions;