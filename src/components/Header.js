import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from './AuthOptions';

class Header extends Component {
   
    render() { 
        return ( 
            <header className="header">
                <Link to="/"><h1 className="title">Student Management</h1></Link>
                <AuthOptions />
            </header>
         );
    }
}
 
export default Header;