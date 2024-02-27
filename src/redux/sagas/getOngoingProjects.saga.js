import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getOngoingProjects() {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/project/ongoing`, config); // GET ongoing projects
        yield put({ type: 'SET_ONGOING_PROJECTS', payload: response.data }); // Stores in ongoingProjects.reducer

    }
    catch (error) {
        console.error('Error in GET ongoingProjects', error);
    }
}

// Worker function  - Saga: will be fired on "GET_ONGOING_PROJECTS" actions
function* getOngoingProjectsSaga() {
    yield takeLatest('GET_ONGOING_PROJECTS', getOngoingProjects);
}

export default getOngoingProjectsSaga;
// TODO: Don't forget to add worker function to _root.saga.js !!!