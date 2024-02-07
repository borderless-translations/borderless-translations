import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAllProjects() {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // TODO: Set to correct URL and request type
        const response = yield axios.get('/api/project', config);

        // Puts the response in the reducer allProjects
        yield put({ type: 'SET_ALL_PROJECTS', payload: response.data });

    }
    catch (error) {
        console.error('GET for all projects failed', error);
    }
}

// Worker function  - Saga: will be fired on "GET_ALL_PROJECTS" actions
function* getAllProjectsSaga() {
    yield takeLatest('GET_ALL_PROJECTS', getAllProjects);
}

export default getAllProjectsSaga;