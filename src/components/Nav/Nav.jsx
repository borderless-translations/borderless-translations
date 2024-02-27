import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Nav() {
  const {t,i18n} = useTranslation();
  const user = useSelector((store) => store.user);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <div className="nav">
      <div className="left-nav">
        <Link to="/dashboard">
          <img className="logo" src='../../../images/Borderless_Translations_Logo_White.png' />
        </Link>
        <select onChange={(e)=>changeLanguage(e.target.value)} value={i18n.language}>
          <option value={'en'}>English</option>
          <option value={'de'}>German</option>
        </select>
      </div>
      <div className="right-nav">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in as contractor, show these links */}
        {(user.id && user.type === 'contractor') && (
          <>
            <Link className="navLink" to="/dashboard">
              Dashboard
            </Link>

            <Link className="navLink" to={{pathname:`/contractor/profile/${user.id}`}}>
              Profile
            </Link>
            
            <LogOutButton className='logout-btn navLink' />
          </>
        )}

        {/* If a user is logged in, show these links */}
        {(user.id && user.type === 'admin') && (
          <>
            <Link className="navLink" to="/dashboard">
              Dashboard
            </Link>

            <Link className="navLink" to="/admin/client">
              Clients
            </Link>

            <Link className="navLink" to="/admin/contractors">
              Contractors
            </Link>

            <Link className="navLink" to="/admin/project">
              Projects
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/settings">
              Settings Page
            </Link>

            <Link className="navLink" to={{pathname:`/contractor/profile/${user.id}`}}>
              Profile
            </Link>

            <LogOutButton className='logout-btn navLink' />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;