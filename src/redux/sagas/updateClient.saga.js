import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateClient(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/client/${action.payload.id}`, action.payload, config); // PUT client object
        const response = yield axios.get(`/api/client/${action.payload.id}`, config) // Retrieve updated client object

        // Adding updated client data to reducer client
        yield put({ type: 'SET_CLIENT', payload: response.data[0] });
    }
    catch (error) {
        console.error('Error in POST new client.', error);
    }
}

// Worker function  - Saga: will be fired on "UPDATE_CLIENT" actions
function* updateClientSaga() {
    yield takeLatest('UPDATE_CLIENT', updateClient);
}

export default updateClientSaga;