import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Requires admin
function* getContractor(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // TODO: Set to correct URL and request type
        const response = yield axios.get(`/api/contractor/specific/${action.payload}`, config);
        for (let user of response.data) {
            const languages = yield axios.get(`/api/contractor/${action.payload}/languages`, config);
            const services = yield axios.get(`/api/contractor/${action.payload}/services`, config);
            const expertise = yield axios.get(`/api/contractor/${action.payload}/expertise`, config);

            user['languages'] = languages.data;
            user['services'] = services.data;
            user['expertise'] = expertise.data;
        }
        yield put({ type: 'SET_CONTRACTOR', payload: response.data });

    }
    catch (error) {
        console.error('GET for contractor has failed.', error);
    }
}

// Worker function  - Saga: will be fired on "GET_CONTRACTOR" actions
function* getContractorSaga() {
    yield takeLatest('GET_CONTRACTOR', getContractor);
}

export default getContractorSaga;