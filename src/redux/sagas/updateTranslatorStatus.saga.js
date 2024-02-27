import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateTranslatorStatus(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/project/status/translator`, action.payload, config); // Update status of translator
        const response = yield axios.get(`/api/project/contractor/${action.payload[1]}`, config); // GET updated project

        yield put({ type: 'SET_PROJECT', payload: response.data[0] }); // Store updated project in project.reducer
    }
    catch (error) {
        console.error('Error in PUT translator status.', error);
    }
}

// Worker function  - Saga: will be fired on "UPDATE_TRANSLATOR_STATUS" actions
function* updateTranslatorStatusSaga() {
    yield takeLatest('UPDATE_TRANSLATOR_STATUS', updateTranslatorStatus);
}

export default updateTranslatorStatusSaga;