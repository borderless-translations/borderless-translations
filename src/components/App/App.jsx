import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AdminClientMain from '../AdminClientMain/AdminClientMain';
import AdminClientDetails from '../AdminClientDetails/AdminClientDetails';
import AdminProjectPage from '../AdminProjectPage/AdminProjectPage';
import AdminProjectDetails from '../AdminProjectDetails/AdminProjectDetails';
import AdminContractorPage from '../AdminContractorPage/AdminContractorPage';
import AdminContractorDetailsPage from '../AdminContractorDetailsPage/AdminContractorDetailsPage';
import ContractorDashboard from '../ContractorDashboard/ContractorDashboard';
import ContractorProfileSettings from '../ContractorProfileSettings/ContractorProfileSettings';
import ContractorProjectDetails from '../ContractorProjectDetails/ContractorProjectDetails';
import ContractorViewFile from '../ContractorViewFile/ContractorViewFile';
import Settings from '../Settings/Settings';


import './App.css';




function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            {user.type === 'admin' ?
              <UserPage /> 
            :
              <ContractorDashboard />
            }

          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute

            exact
            path="/admin/project"
            >
              <AdminProjectPage />
            </ProtectedRoute>

          <ProtectedRoute

            exact
            path="/project/details/:id"
          >
            <AdminProjectDetails />
          </ProtectedRoute>  

          <ProtectedRoute
            // logged in shows Admin Client Main Page else shows LoginPage
            exact
            path="/admin/client"
          >
            <AdminClientMain />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Admin Client Details Page else shows LoginPage
            exact
            path="/client/details/:id"
          >
            <AdminClientDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Admin Contractors Page else shows LoginPage
            exact 
            path="/admin/contractors"
          >
            <AdminContractorPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Admin Contractors Details Page else shows LoginPage
            exact 
            path="/admin/contractors/details/:id"
          >
            <AdminContractorDetailsPage />
          </ProtectedRoute>

          {/* Contractor routes start here */}
          
          <ProtectedRoute
            // logged in shows Contractor Dashboard else shows LoginPage
            exact 
            path="/dashboard"
          >
            <ContractorDashboard />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Contractor Profile Settings Page else shows LoginPage
            exact 
            path="/contractor/profile"
          >
            <ContractorProfileSettings />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Contractor Project Details Page else shows LoginPage
            exact
            path="/user/project/details/:id"
          >
            <ContractorProjectDetails />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Contractor Project Details Page else shows LoginPage
            exact
            path="/user/project/file/:id"
          >
            <ContractorViewFile />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Admin Settings Page else shows LoginPage
            exact 
            path="/settings"
          >
            <Settings />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /dashboard page
              <Redirect to="/dashboard" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /dashboard page
              <Redirect to="/dashboard" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
