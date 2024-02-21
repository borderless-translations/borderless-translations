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
        const response = yield axios.get(`/api/contractor/${action.payload.user_id}`, config) // Retrieve updated contractor object
        console.log('After PUT', response.data[0])
        // Adding updated contractor data to reducer contractor
        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] });
    }
    catch (error) {
        console.error('Error in PUT update contractor.', error);
    }
}

// Worker function  - Saga: will be fired on "UPDATE_CONTRACTOR" actions
function* updateContractorSaga() {
    yield takeLatest('UPDATE_CONTRACTOR', updateContractor);
}

export default updateContractorSaga;