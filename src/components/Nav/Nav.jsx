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
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <select onChange={(e)=>changeLanguage(e.target.value)} value={i18n.language}>
        <option value={'en'}>English</option>
        <option value={'de'}>German</option>
      </select>
      <div>
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

            <Link className="navLink" to="/profile">
              Profile
            </Link>
          </>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/admin/client">
              Clients
            </Link>

            <Link className="navLink" to="/admin/contractors">
              Contractors
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
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
