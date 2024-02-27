import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* toggleProjectFlag(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/project/flagged`, action.payload, config); // Toggle flag in DB
        const response = yield axios.get(`/api/project/contractor/${action.payload}`, config); // GET updated project

        yield put({ type: 'SET_PROJECT', payload: response.data[0] }); // Store updated project in project.reducer
    }
    catch (error) {
        console.error('Error in PUT toggle project flag', error);
    }
}

// Worker function  - Saga: will be fired on "TOGGLE_PROJECT_FLAG" actions
function* toggleProjectFlagSaga() {
    yield takeLatest('TOGGLE_PROJECT_FLAG', toggleProjectFlag);
}

export default toggleProjectFlagSaga;