import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAllRates() {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get(`/api/settings/rate`, config);
        yield put({ type: 'SET_ALL_RATES', payload: response.data });
    }
    catch (error) {
        console.error('GET all rates.', error);
    }
}

// Worker function  - Saga: will be fired on "GET_ALL_RATES" actions
function* getAllRatesSaga() {
    yield takeLatest('GET_ALL_RATES', getAllRates);
}

export default getAllRatesSaga;