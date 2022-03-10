import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const auth=useContext(AuthContext);
    const history=useNavigate();

    const logoutHandler=(e)=>{
        e.preventDefault();
        auth.logout();
        history.push('/');
    }

    return (
      <nav>
        <div className={"nav-wrapper blue darken-1"} style={{padding: '0 2rem'}}>
          <span className={"brand-logo"}>Short a link</span>
          <ul id="nav-mobile" className={"right hide-on-med-and-down"}>
            <li><NavLink to="/create">Create Link</NavLink></li>
            <li><NavLink to="/links">List of links</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
          </ul>
        </div>
      </nav>
    );
};

export default Navbar;