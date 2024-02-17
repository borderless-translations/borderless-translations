import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createNewRate(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // Adding new rate to DB. Requires admin.
        yield axios.post(`/api/settings/rate`, action.payload, config);
        // Call getAllRates.saga to get updated list
        yield put({type: "GET_ALL_RATES"});

    }
    catch (error) {
        console.error('Error in POST createNewRate.', error);
    }
}

// Worker function  - Saga: will be fired on "CREATE_NEW_RATE" actions
function* createNewRateSaga() {
    yield takeLatest('CREATE_NEW_RATE', createNewRate);
}

export default createNewRateSaga;