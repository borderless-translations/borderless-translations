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
import getContractorProjectsSaga from './getContractorProjects.saga';
import getCompletedProjectsSaga from './getCompletedProjects.saga';
import getOngoingProjectsSaga from './getOngoingProjects.saga';
import toggleProjectFlagSaga from './toggleProjectFlag.saga';
import updateTranslatorStatusSaga from './updateTranslatorStatus.saga';
import updateProofreaderStatusSaga from './updateProofreaderStatus.saga';
import updateContractorSaga from './updateContractor.saga';
import setUserAuthSaga from './setUserAuth.saga';
import getAllLanguagesSaga from './getAllLanguages.saga';
import createNewLanguageSaga from './createNewLanguage.saga';
import deleteLanguageSaga from './deleteLanguage.saga';
import getAllServicesSaga from './getAllServices.saga';
import createNewServiceSaga from './createNewService.saga';
import deleteServiceSaga from './deleteService.saga';
import getAllRatesSaga from './getAllRates.saga';
import createNewRateSaga from './createNewRate.saga';
import deleteRateSaga from './deleteRate.saga';
import updateSettingsLanguageSaga from './updateSettingsLanguage.saga';
import updateSettingsServiceSaga from './updateSettingsService.saga';
import createNewExpertiseSaga from './createNewExpertise.saga';
import deleteExpertiseSaga from './deleteExpertise.saga';
import getAllExpertiseSaga from './getAllExpertise.saga';
import updateSettingsExpertiseSaga from './updateSettingsExpertise.saga';

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
    getContractorProjectsSaga(), // GET route for all projects of a specific contractor. Requires admin. Stored in contractorProjects.reducer.
    getCompletedProjectsSaga(), // GET route for completed projects. Requires admin. Stored in completedProjects.reducer
    getOngoingProjectsSaga(), // GET route for ongoing projects. Requires admin. Stored in ongoingProjects.reducer
    toggleProjectFlagSaga(), // PUT route toggling flag feature on project. Stores updated project in project.reducer.
    updateTranslatorStatusSaga(), // PUT route updating status of translator progress. Stores updated project in project.reducer.
    updateProofreaderStatusSaga(), // PUT route updating status of proofreader progress. Stores updated project in project.reducer.
    updateClientSaga(), // Update client info in DB. Needs full client object in payload. Stores updated object in reducer client
    updateContractorSaga(), // PUT updates contractor info with new information. GET updated and stores in reducer contractor
    setUserAuthSaga(), // PUT for auth level of user. Requires admin status
    getAllLanguagesSaga(), // GET for allLanguages. Stores result in allLanguages.reducer.
    createNewLanguageSaga(), // POST for new language. GETs updated list and stores in allLanguages.reducer.
    deleteLanguageSaga(), // DELETE language from DB. GETs updated list and stores in allLanguages.reducer.
    getAllServicesSaga(), // GET all services from DB. Stores info in allServices.reducer.
    createNewServiceSaga(), // POST new service to DB. Calls getAllServices.saga to get updated list.
    deleteServiceSaga(), // DELETE new service from DB. Calls getAllServices.saga to get updated list.
    getAllRatesSaga(), // GET all rates from DB. Stores info in allRates.reducer.
    createNewRateSaga(), // POST new rate to DB. Calls getAllRates.saga to get updated list.
    deleteRateSaga(), // DELETE rate from DB. Calls getAllRates.saga to get updated list.
    updateSettingsLanguageSaga(), // PUT route updating language details in DB. Calls getAllLanguages.saga to get updated list.
    updateSettingsServiceSaga(), // PUT route updating service details in DB. Calls getAllServices.saga to get updated list.
    createNewExpertiseSaga(), // POST new expertise to DB. Calls getAllExpertise.saga to get updated list.
    deleteExpertiseSaga(), // DELETE expertise from DB. Calls getAllExpertise.saga to get updated list.
    getAllExpertiseSaga(), // GET all expertise from DB. Stores info in allExpertise.reducer.
    updateSettingsExpertiseSaga(), // PUT route updating expertise details in DB. Calls getAllExpertise.saga to get updated list.
  ]);
}