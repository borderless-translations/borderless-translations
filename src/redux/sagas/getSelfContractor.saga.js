import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getContractorSelf() {
    try {
        console.log('GET SELF CONTRACTOR')
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const contractor = yield axios.get(`/api/contractor/self/user`, config);
        const self = contractor.data[0];
        const languages = yield axios.get(`/api/contractor/self/languages`, config);
        const services = yield axios.get(`/api/contractor/self/services`, config);
        const expertise = yield axios.get(`/api/contractor/self/expertise`, config);

        self['languages'] = languages.data;
        self['services'] = services.data;
        self['expertise'] = expertise.data;

        yield put({ type: 'SET_CONTRACTOR', payload: self });
    }
    catch (error) {
        console.error('GET for contractor self has failed.', error);
    }
}

// Worker function  - Saga: will be fired on "GET_CONTRACTOR" actions
function* getContractorSelfSaga() {
    yield takeLatest('GET_CONTRACTOR_SELF', getContractorSelf);
}

export default getContractorSelfSaga;
