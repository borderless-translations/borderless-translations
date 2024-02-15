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
import getContractorSelfSaga from './getSelfContractor.saga';
import createNewClientSaga from './createNewClient.saga';
import updateClientSaga from './updateClient.saga';
import toggleAvailabilitySaga from './toggleAvailability.saga';
import toggleAvailabilityAdminSaga from './toggleAvailabilityAdmin.saga';
import updateContractorSaga from './updateContractor.saga';

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
    getContractorSelfSaga(), // Fetch contractor details for logged in user. Stores in reducer contractor.
    createNewClientSaga(), // POST new client to DB. Does not download updated list. Use seperate call.
    updateClientSaga(), // Update client info in DB. Needs full client object in payload. Stores updated object in reducer client
    toggleAvailabilitySaga(), // Toggles current availabity for authenticated user. Stores updated object in reducer contractor.
    toggleAvailabilityAdminSaga(), // Toggles current availabity for specific contractor. Stores updated object in reducer contractor.
    updateContractorSaga(), // PUT updates contractor info with new information. GET updated and stores in reducer contractor
  ]);
}