import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteRate(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // Removing rate from DB. Requires Admin
        yield axios.delete(`/api/settings/rate`, action.payload, config);
        // Call getAllRates.saga to get updated rates
        yield put({type: "GET_ALL_RATES"});

    }
    catch (error) {
        console.error('Error in DELETE deleteRate.', error);
    }
}

// Worker function  - Saga: will be fired on "DELETE_RATE" actions
function* deleteRateSaga() {
    yield takeLatest('DELETE_RATE', deleteRate);
}

export default deleteRateSaga;