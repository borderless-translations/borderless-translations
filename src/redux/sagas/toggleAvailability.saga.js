import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* toggleAvailability(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put('/api/contractor/availability', config); // Toggles availability for self
        const response = yield axios.get(`/api/contractor/self`, config); // getting self info

        yield put({ type: 'SET_CONTRACTOR', payload: response.data[0] }); // updating self in contractor reducer

    }
    catch (error) {
        console.error('Error in toggling availability.', error);
    }
}

// Worker function  - Saga: will be fired on "TOGGLE_AVAILABILITY" actions
function* toggleAvailabilitySaga() {
    yield takeLatest('TOGGLE_AVAILABILITY', toggleAvailability);
}

export default toggleAvailabilitySaga;