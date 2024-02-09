import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import getAllClientsSaga from './getAllClients.saga';
import getAllContractorsSaga from './getAllContractors.saga';
import getAllProjectsSaga from './getAllProjects.saga';
import getClientSaga from './getClient.saga';
import getContractorSaga from './getContractor.saga';
import getProjectSaga from './getProject.saga';
import sendEmailSaga from './sendEmail.saga';
import getClientProjectsSaga from './getClientProjects.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    getAllClientsSaga(), // Fetch then store all clients in reducer allClients
    getAllContractorsSaga(), // Fetch then store all contractors in reducer allContractors
    getAllProjectsSaga(), // Fetch then store all projects in reducer allProjects
    getClientSaga(), // Fetch then store a single client in reducer client
    getContractorSaga(), // Fetch then store a single contractor in reducer contractor
    getProjectSaga(), // Fetch then store a single project in reducer project
    sendEmailSaga(), // Sends message object via Mailchimp API
    getClientProjectsSaga(), // Fetch then store all projects for a specific client in clientProjects reducer
  ]);
}