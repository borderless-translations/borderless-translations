import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addProjectNote(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/project/notes`, action.payload, config); // Add note to project
        const response = yield axios.get(`/api/project/contractor/${action.payload[1]}`, config); // GET updated project

        // Storing updated project in project.reducer
        yield put({ type: 'SET_PROJECT', payload: response.data[0] });
    }
    catch (error) {
        console.error('Error in PUT adding project note.', error);
    }
}

// Worker function  - Saga: will be fired on "ADD_PROJECT_NOTE" actions
function* addProjectNoteSaga() {
    yield takeLatest('ADD_PROJECT_NOTE', addProjectNote);
}

export default addProjectNoteSaga;