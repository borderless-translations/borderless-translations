import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateContractor(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log('Update Contractor payload', action.payload)
        yield axios.put(`/api/contractor/${action.payload.user_id}`, action.payload, config); // PUT contractor object
        const response = yield axios.get(`/api/contractor/specific/${action.payload.user_id}`, config) // Retrieve updated contractor object

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] });
    }
    catch (error) {
        console.error('Error in PUT update contractor.', error);
    }
}

function* addContractorLanguage(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.post(`/api/contractor/self/languages`, action.payload, config); // POST contractor language
        const response = yield axios.get(`/api/contractor/self/user`, config) // Retrieve updated contractor object

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] });
    }
    catch (error) {
        console.error('Error in PUT update contractor languages.', error);
    }
}
function* deleteContractorLanguage(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log(action.payload);
        yield axios.delete(`/api/contractor/self/languages/${action.payload}`, config); // DELETE contractor language
        const response = yield axios.get(`/api/contractor/self/user`, config) // Retrieve updated contractor object

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] });
    }
    catch (error) {
        console.error('Error in PUT update contractor services.', error);
    } 
}

function* addContractorService(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.post(`/api/contractor/self/services`, action.payload, config); // POST contractor service
        const response = yield axios.get(`/api/contractor/self/user`, config) // Retrieve updated contractor object

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] });
    }
    catch (error) {
        console.error('Error in PUT update contractor services.', error);
    }    
}
function* deleteContractorService(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.delete(`/api/contractor/self/services/${action.payload}`, config); // DELETE contractor service
        const response = yield axios.get(`/api/contractor/self/user`, config) // Retrieve updated contractor object

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] });
    }
    catch (error) {
        console.error('Error in PUT update contractor services.', error);
    }  
}

// Worker function  - Saga: will be fired on "UPDATE_CONTRACTOR" actions
function* updateContractorSaga() {
    yield takeLatest('UPDATE_CONTRACTOR', updateContractor);
    yield takeLatest('DELETE_SERVICE_FROM_CONTRACTOR', deleteContractorService);
    yield takeLatest('ADD_SERVICE_TO_CONTRACTOR', addContractorService);
    yield takeLatest('DELETE_LANGUAGE_FROM_CONTRACTOR', deleteContractorLanguage);
    yield takeLatest('ADD_LANGUAGE_TO_CONTRACTOR', addContractorLanguage);
}

export default updateContractorSaga;