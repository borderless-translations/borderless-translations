import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getContractor(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // TODO: Set to correct URL and request type
        const response = yield axios.get(`/api/contractor/${action.payload.id}`, config);

        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] });

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