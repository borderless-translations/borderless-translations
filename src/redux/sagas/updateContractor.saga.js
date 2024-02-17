import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateContractor(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/contractor/${action.payload.user_id}`, action.payload, config); // PUT contractor object
        const response = yield axios.get(`/api/contractor/${action.payload.id}`, config) // Retrieve updated contractor object

        // Adding updated client data to reducer client
        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] });
    }
    catch (error) {
        console.error('Error in PUT update contractor.', error);
    }
}

// Worker function  - Saga: will be fired on "UPDATE_CLIENT" actions
function* updateContractorSaga() {
    yield takeLatest('UPDATE_CONTRACTOR', updateContractor);
}

export default updateContractorSaga;