import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getContractorSelf(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get(`/api/contractor/self`, config);
        const languages = yield axios.get(`/api/contractor/self/languages`, config);
        const services = yield axios.get(`/api/contractor/self/services`, config);
        const self = response.data[0]

        self['languages'] = languages;
        self['services'] = services;

        yield put({ type: 'SET_CONTRACTOR', payload: self });
    }
    catch (error) {
        console.error('GET for contractor self has failed.', error);
    }
}

function* getContractorLanguages(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const contractorLanguages = yield axios.get(`/api/contractor/self/languages`, config);
        yield put({ type: 'SET_CONTRACTOR_LANGUAGES', payload: contractorLanguages.data });
    }
    catch (error) {
        console.error('GET for contractor languages has failed.', error);
    }
}

function* getContractorServices(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const contractorServices = yield axios.get(`/api/contractor/self/services`, config);
        yield put({ type: 'SET_CONTRACTOR_SERVICES', payload: contractorServices.data });
    }
    catch (error) {
        console.error('GET for contractor services has failed.', error);
    }
}

// Worker function  - Saga: will be fired on "GET_CONTRACTOR" actions
function* getContractorSelfSaga() {
    yield takeLatest('GET_CONTRACTOR_SELF', getContractorSelf);
    yield takeLatest('GET_CONTRACTOR_LANGUAGES', getContractorLanguages);
    yield takeLatest('GET_CONTRACTOR_SERVICES', getContractorServices);
}

export default getContractorSelfSaga;
