import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateProject(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put('/api/project', action.payload, config); // PUT route updating project
        const response = axios.get(`/api/project/${action.payload.id}`) // GET updated project

        // Store updated project in reducer project
        yield put({ type: 'SET_PROJECT', payload: response.data });
    }
    catch (error) {
        console.error('Error in PUT updateProject', error);
    }
}

// Worker function  - Saga: will be fired on "UPDATE_PROJECT" actions
function* updateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT', updateProject);
}

export default updateProjectSaga;