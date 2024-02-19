import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setUserAuth(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put('/api/user/auth', action.payload, config);
        console.log(`User id: ${action.payload.id} set to auth level: ${action.payload.type}.`);
    }
    catch (error) {
        console.error('Error in PUT auth level', error);
    }
}

// Worker function  - Saga: will be fired on "SET_USER_AUTH" actions
function* setUserAuthSaga() {
    yield takeLatest('SET_USER_AUTH', setUserAuth);
}

export default setUserAuthSaga;