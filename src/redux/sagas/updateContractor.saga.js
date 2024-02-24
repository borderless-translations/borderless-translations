import axios from 'axios';
import { useDispatch } from 'react-redux';
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

function* updateContractorSelf(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log('Update Contractor payload', action.payload)
        yield axios.put(`/api/contractor/self/settings`, action.payload, config); // PUT contractor object
        const response = yield axios.get(`/api/contractor/self/user`, config); // Retrieve updated contractor object
        const self = response.data[0];
        const languages = yield axios.get(`/api/contractor/self/languages`, config);
        const services = yield axios.get(`/api/contractor/self/services`, config);
        const expertise = yield axios.get(`/api/contractor/self/expertise`, config);

        self['languages'] = languages.data;
        self['services'] = services.data;
        self['expertise'] = expertise.data;

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: self });
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
        const response = yield axios.get(`/api/contractor/self/user`, config); // Retrieve updated contractor object
        const self = response.data[0];
        const languages = yield axios.get(`/api/contractor/self/languages`, config);
        const services = yield axios.get(`/api/contractor/self/services`, config);
        const expertise = yield axios.get(`/api/contractor/self/expertise`, config);

        self['languages'] = languages.data;
        self['services'] = services.data;
        self['expertise'] = expertise.data;

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: self });
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
        const response = yield axios.get(`/api/contractor/self/user`, config); // Retrieve updated contractor object
        const self = response.data[0];
        const languages = yield axios.get(`/api/contractor/self/languages`, config);
        const services = yield axios.get(`/api/contractor/self/services`, config);
        const expertise = yield axios.get(`/api/contractor/self/expertise`, config);

        self['languages'] = languages.data;
        self['services'] = services.data;
        self['expertise'] = expertise.data;

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: self });
    }
    catch (error) {
        console.error('Error in DELETE contractor language.', error);
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
        const response = yield axios.get(`/api/contractor/self/user`, config); // Retrieve updated contractor object
        const self = response.data[0];
        const languages = yield axios.get(`/api/contractor/self/languages`, config);
        const services = yield axios.get(`/api/contractor/self/services`, config);
        const expertise = yield axios.get(`/api/contractor/self/expertise`, config);

        self['languages'] = languages.data;
        self['services'] = services.data;
        self['expertise'] = expertise.data;

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: self });
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
        const response = yield axios.get(`/api/contractor/self/user`, config); // Retrieve updated contractor object
        const self = response.data[0];
        const languages = yield axios.get(`/api/contractor/self/languages`, config);
        const services = yield axios.get(`/api/contractor/self/services`, config);
        const expertise = yield axios.get(`/api/contractor/self/expertise`, config);

        self['languages'] = languages.data;
        self['services'] = services.data;
        self['expertise'] = expertise.data;

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: self });
    }
    catch (error) {
        console.error('Error in DELETE contractor services.', error);
    }  
}

function* addContractorExpertise(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        console.log(action);
        yield axios.post(`/api/contractor/self/expertise`, action.payload, config); // POST contractor service
        const response = yield axios.get(`/api/contractor/self/user`, config); // Retrieve updated contractor object
        const self = response.data[0];
        const languages = yield axios.get(`/api/contractor/self/languages`, config);
        const services = yield axios.get(`/api/contractor/self/services`, config);
        const expertise = yield axios.get(`/api/contractor/self/expertise`, config);

        self['languages'] = languages.data;
        self['services'] = services.data;
        self['expertise'] = expertise.data;

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: self });
    }
    catch (error) {
        console.error('Error in PUT update contractor expertise.', error);
    }    
}
function* deleteContractorExpertise(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.delete(`/api/contractor/self/expertise/${action.payload}`, config); // DELETE contractor service
        const response = yield axios.get(`/api/contractor/self/user`, config); // Retrieve updated contractor object
        const self = response.data[0];
        const languages = yield axios.get(`/api/contractor/self/languages`, config);
        const services = yield axios.get(`/api/contractor/self/services`, config);
        const expertise = yield axios.get(`/api/contractor/self/expertise`, config);

        self['languages'] = languages.data;
        self['services'] = services.data;
        self['expertise'] = expertise.data;

        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: self });
    }
    catch (error) {
        console.error('Error in DELETE contractor expertise.', error);
    }  
}

// Worker function  - Saga: will be fired on "UPDATE_CONTRACTOR" actions
function* updateContractorSaga() {
    yield takeLatest('UPDATE_CONTRACTOR', updateContractor);
    yield takeLatest('DELETE_SERVICE_FROM_CONTRACTOR', deleteContractorService);
    yield takeLatest('ADD_SERVICE_TO_CONTRACTOR', addContractorService);
    yield takeLatest('DELETE_LANGUAGE_FROM_CONTRACTOR', deleteContractorLanguage);
    yield takeLatest('ADD_LANGUAGE_TO_CONTRACTOR', addContractorLanguage);
    yield takeLatest('ADD_EXPERTISE_TO_CONTRACTOR', addContractorExpertise);
    yield takeLatest('DELETE_EXPERTISE_FROM_CONTRACTOR', deleteContractorExpertise);
    yield takeLatest('UPDATE_CONTRACTOR_SELF', updateContractorSelf);
}

export default updateContractorSaga;