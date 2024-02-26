import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateProject(action) {
    console.log('PUT SAGA triggered', action.payload.id)
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/project/${action.payload.id}`, action.payload); // PUT route updating project
        const response = yield axios.get(`/api/project/specific/${action.payload.id}`) // GET updated project

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