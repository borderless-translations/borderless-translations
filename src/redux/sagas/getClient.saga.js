import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getClient(action) {
   
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // TODO: Set to correct URL and request type
        const response = yield axios.get(`/api/client/${action.payload.id}`, config);

        // Calling getClientProjects saga
        yield put ({type: "GET_CLIENT_PROJECTS", payload: {id: action.payload.id}});

        // adding client data to reducer client
        yield put({ type: 'SET_CLIENT', payload: response.data[0] });
    }
    catch (error) {
        console.error('GET for client has failed.', error);
    }
}

// Worker function  - Saga: will be fired on "GET_CLIENT" actions
function* getClientSaga() {
    yield takeLatest('GET_CLIENT', getClient);
}

export default getClientSaga;