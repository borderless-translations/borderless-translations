import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAllClients() {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // TODO: Set to correct URL and request type
        const response = yield axios.get('/api/example', config);

        // Puts the response in the reducer allClients
        yield put({ type: 'SET_ALL_CLIENTS', payload: response.data });

    }
    catch (error) {
        console.error('GET for all clients failed', error);
    }
}

// Worker function  - Saga: will be fired on "GET_ALL_CLIENTS" actions
function* getAllClientsSaga() {
    yield takeLatest('GET_ALL_CLIENTS', getAllClients);
}

export default getAllClientsSaga;