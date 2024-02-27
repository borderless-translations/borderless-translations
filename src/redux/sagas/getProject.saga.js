import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getProject(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // TODO: Set to correct URL and request type
        const response = yield axios.get(`/api/project/contractor/${action.payload}`, config);

        yield put({ type: 'SET_PROJECT', payload: response.data[0] });

    }
    catch (error) {
        console.error('GET for project has failed.', error);
    }
}

// Worker function  - Saga: will be fired on "GET_PROJECT" actions
function* getProjectSaga() {
    yield takeLatest('GET_PROJECT', getProject);
}

export default getProjectSaga;