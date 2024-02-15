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
import createNewProjectSaga from './createNewProject.saga';
import updateProjectSaga from './updateProject.saga';
import addProjectNoteSaga from './addProjectNote.saga';
import getCompletedProjectsSaga from './getCompletedProjects.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(), // Create new user
    userSaga(), // GET User info
    getAllClientsSaga(), // Fetch then store all clients in allClients.reducer.
    getAllContractorsSaga(), // Fetch then store all contractors in allContractors.reducer
    getAllProjectsSaga(), // Fetch then store all projects in allProjects.reducer.
    getClientSaga(), // Fetch then store a single client in client.reducer.
    getContractorSaga(), // Fetch then store a single contractor in contractor.reducer.
    getProjectSaga(), // Fetch then store a single project in project.reducer.
    sendEmailSaga(), // Sends message object via Mailchimp API
    getClientProjectsSaga(), // Fetch then store all projects for a specific client in clientProjects.reducer.
    getContractorSelfSaga(), // Fetch contractor details for logged in user. Stores in contractor.reducer.
    createNewClientSaga(), // POST new client to DB. Does not download updated list. Use seperate call.
    updateClientSaga(), // Update client info in DB. Needs full client object in payload. Stores updated object in client.reducer.
    toggleAvailabilitySaga(), // Toggles current availabity for authenticated user. Stores updated object in contractor.reducer.
    toggleAvailabilityAdminSaga(), // Toggles current availabity for specific contractor. Stores updated object in contractor.reducer.
    createNewProjectSaga(), // Creates new project in DB. Does not GET. Use additional saga.
    updateProjectSaga(), // Updates project details in DB. Stores updated project in project.reducer
    addProjectNoteSaga(), // PUT route adding note to project in DB. Stores updated project in project.reducer
    getCompletedProjectsSaga(), // GET route for completed projects. Requires admin. Stored in completedProjects.reducer
  ]);
}