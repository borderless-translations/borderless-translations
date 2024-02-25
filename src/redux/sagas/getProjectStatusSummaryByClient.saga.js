import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getProjectStatusSummaryByClient(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
     
        const response = yield axios.get(`/api/client/projects/`, config);

        yield put({ type: 'SET_PROJECT_SUMMARY_BY_CLIENT', payload: response.data });
    }
    catch (error) {
        console.error('GET for project has failed.', error);
    }
}

// Worker function  - Saga: will be fired on "GET_PROJECT" actions
function* getProjectStatusSummaryByClientSaga() {
    yield takeLatest('GET_PROJECT_SUMMARY_BY_CLIENT', getProjectStatusSummaryByClient);
}

export default getProjectStatusSummaryByClientSaga;