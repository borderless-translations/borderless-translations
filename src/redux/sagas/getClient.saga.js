import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// TODO: Rename templateDunction and replace with the new name in 'yield takeLatest()'
function* templateFunction() {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // TODO: Set to correct URL and request type
        const response = yield axios.get('/api/example', config);

        // TODO: Hand off the data to the correct reducer by changing the type below or delete if unneeded
        yield put({ type: 'SET_EXAMPLE', payload: response.data });

    }
    catch (error) {
        // TODO: Change error message
        console.error('Example request failed', error);
    }
}

// Worker function  - Saga: will be fired on "EXAMPLE_ACTION" actions
// TODO: Update saga name below. Change it in the export statement as well.
function* ExampleSaga() {
    // TODO: Change action below. This will be the action.type where the saga fires.
    yield takeLatest('EXAMPLE_ACTION', templateFunction);
}

// TODO: rename export to reflect worker function (function*) name.
export default ExampleSaga;
// TODO: Don't forget to add worker function to _root.saga.js !!!