import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TextField, MenuItem, InputAdornment } from '@mui/material';

function Nav() {
  const {t,i18n} = useTranslation();
  const user = useSelector((store) => store.user);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  const langStyle = {
    marginLeft: '20px',
    borderRadius: '20px',
    backgroundColor: 'white',
    width: '200px',
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        borderRadius: '20px'
      }
    }
  }

  return (
    <div className="nav">
      <div className="left-nav">
        {!user.id &&
          <Link to="/login">
            <img className="logo" src='../../../images/Borderless_Translations_Logo_White.png' />
          </Link>
        }
        {user.type === 'admin' &&
          <Link to="/admin/project">
            <img className="logo" src='../../../images/Borderless_Translations_Logo_White.png' />
          </Link>
        }
        {user.type === 'contractor' &&
          <Link to="/dashboard">
            <img className="logo" src='../../../images/Borderless_Translations_Logo_White.png' />
          </Link>
        }
        <TextField select sx={langStyle} size='small' 
          InputProps={{
              startAdornment: <InputAdornment sx={{marginRight: '20px', marginLeft: '0px',
                minHeight: '110%'
               }}
              position="start">&#127760;</InputAdornment>,
          }}
          SelectProps={{
            MenuProps: {
                style: {
                    maxHeight: '200px',
                    maxWidth: '100px'
                },
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            }
          }}
          onChange={(e)=>changeLanguage(e.target.value)} value={i18n.language}>
          <MenuItem 
              value={'en'}>
              <span>English</span>
          </MenuItem>
          <MenuItem 
              value={'de'}>
              <span>German</span>
          </MenuItem>
        </TextField>
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

            <Link className="navLink" to="/contractor/profile">
              Profile
            </Link>

            <Link className="navLink" to="/about">
              About Us
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

            <Link className="navLink" to="/contractor/profile">
              Profile
            </Link>

            <Link className="navLink" to="/settings">
              Settings Page
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/about">
              About Us
            </Link>

            <LogOutButton className='logout-btn navLink' />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;