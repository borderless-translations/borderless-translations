import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getContractorSelf() {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get(`/api/contractor/self`, config);

        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] });
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