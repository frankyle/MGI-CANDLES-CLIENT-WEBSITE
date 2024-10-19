import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../../redux/authSlice";  // Assuming you have a logout action
import "./header.css";
import { nav } from "../../data/Data";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // Assuming these values come from your auth slice
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);  // User object containing the username

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');  // Redirect to login after logout
  };

  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            MGI Candles
          </div>

          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='button flex'>
            {isAuthenticated ? (
              <div className="user-info flex">
                {/* Display user's name and logout button when logged in */}
                <h4>Hello, {user?.username}</h4>
                <button className='btn5 logout-btn' onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            ) : (
              <>
                {/* Display Login/Register buttons when user is not authenticated */}
                <h4>
                  <Link to="/signals">Today Signals</Link>
                </h4>
                <div className="userbuttons">
                  <Link to="/register">
                    <button className='btn2'>
                      Register
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className='btn5'>
                      Log In
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>
              {navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
