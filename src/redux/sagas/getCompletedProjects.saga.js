import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getCompletedProjects() {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/project/completed', config);

        yield put({ type: 'SET_COMPLETED_PROJECTS', payload: response.data });

    }
    catch (error) {
        console.error('Error in GET completedProjects', error);
    }
}

// Worker function  - Saga: will be fired on "GET_COMPLETED_PROJECTS" actions
function* getCompletedProjectsSaga() {
    yield takeLatest('GET_COMPLETED_PROJECTS', getCompletedProjects);
}

export default getCompletedProjectsSaga;