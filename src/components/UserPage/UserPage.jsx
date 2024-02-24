import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_ONGOING_PROJECTS" });
    dispatch({ type: "GET_COMPLETED_PROJECTS" });
    dispatch({ type: "GET_CONTRACTOR_SELF" });
    dispatch({ type: "GET_ALL_LANGUAGES" });
    dispatch({ type: "GET_ALL_SERVICES" });
    dispatch({ type: "GET_ALL_EXPERTISE" });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
