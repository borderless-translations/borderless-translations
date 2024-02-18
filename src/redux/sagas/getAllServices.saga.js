import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAllServices() {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/settings/service`, config); // GET services from DB.

        // Stores result in allServices.reducer
        yield put({ type: 'SET_ALL_SERVICES', payload: response.data });
    }
    catch (error) {
        console.error('Error in GET allLanguages', error);
    }
}

// Worker function  - Saga: will be fired on "GET_ALL_SERVICES" actions
function* getAllServicesSaga() {
    yield takeLatest('GET_ALL_SERVICES', getAllServices);
}

export default getAllServicesSaga;