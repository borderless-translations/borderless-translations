import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateProofreaderStatus(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/project/status/proofreader`, action.payload, config); // Update status of proofreader
        const response = yield axios.get(`/api/project/${action.payload.id}`, config); // GET updated project

        yield put({ type: 'SET_PROJECT', payload: response.data }); // Store updated project in project.reducer
    }
    catch (error) {
        console.error('Error in PUT proofreader status.', error);
    }
}

// Worker function  - Saga: will be fired on "UPDATE_PROOFREADER_STATUS" actions
function* updateProofreaderStatusSaga() {
    yield takeLatest('UPDATE_PROOFREADER_STATUS', updateProofreaderStatus);
}

export default updateProofreaderStatusSaga;