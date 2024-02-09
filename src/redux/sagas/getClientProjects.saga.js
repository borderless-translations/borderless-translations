import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getClientProjects(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // TODO: Set to correct URL and request type
        const response = yield axios.get(`/api/project/client/${action.payload.id}`, config);

        // Set response in clientProjects reducer
        yield put({ type: 'SET_CLIENT_PROJECTS', payload: response.data });

    }
    catch (error) {
        console.error('Error in GET clientProjects', error);
    }
}

// Worker function  - Saga: will be fired on "EXAMPLE_ACTION" actions
function* getClientProjectsSaga() {
    yield takeLatest('GET_CLIENT_PROJECTS', getClientProjects);
}

export default getClientProjectsSaga;