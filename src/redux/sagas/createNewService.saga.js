import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createNewService(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // Adding new service to DB. Requires admin.
        yield axios.post(`/api/settings/service`, action.payload, config);
        // Call getAllServices.saga to get updated services
        yield put({type: "GET_ALL_SERVICES"});

    }
    catch (error) {
        console.error('Error in POST createNewService.', error);
    }
}

// Worker function  - Saga: will be fired on "CREATE_NEW_SERVICE" actions
function* createNewServiceSaga() {
    yield takeLatest('CREATE_NEW_LANGUAGE', createNewService);
}

export default createNewServiceSaga;