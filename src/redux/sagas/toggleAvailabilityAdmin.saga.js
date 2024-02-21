import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* toggleAvailabilityAdmin(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/contractor/availability-admin/${action.payload}`, config); // Toggles availability for self

        const response = yield axios.get(`/api/contractor/${action.payload}`, config); // getting updated contractor info
        console.log('response data', response.data[0])
        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] }); // storing update info in contractor reducer

    }
    catch (error) {
        console.error('Error in toggling availability.', error);
    }
}

// Worker function  - Saga: will be fired on "TOGGLE_AVAILABILITY_ADMIN" actions
function* toggleAvailabilityAdminSaga() {
    yield takeLatest('TOGGLE_AVAILABILITY_ADMIN', toggleAvailabilityAdmin);
}

export default toggleAvailabilityAdminSaga;