import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createNewProject(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.post('/api/project', action.payload, config); // Create new project in DB
        console.log("New project created");

    }
    catch (error) {
        console.error('Error in POST create new project', error);
    }
}

// Worker function  - Saga: will be fired on "CREATE_NEW_PROJECT" actions
function* createNewProjectSaga() {
    yield takeLatest('CREATE_NEW_PROJECT', createNewProject);
}

export default createNewProjectSaga;