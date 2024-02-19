import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createNewClient(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        
        yield axios.post('/api/client', action.payload); // POST new client

    }
    catch (error) {
        console.error('Error in POST new client.', error);
    }
}

// Worker function  - Saga: will be fired on "CREATE_NEW_CLIENT" actions
function* createNewClientSaga() {
    yield takeLatest('CREATE_NEW_CLIENT', createNewClient);
}

export default createNewClientSaga;