import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteService(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // Removing service from DB. Requires Admin
        yield axios.delete(`/api/settings/service`, {data: action.payload, config});
        // Call getAllServices.saga to get updated services
        yield put({type: "GET_ALL_SERVICES"});

    }
    catch (error) {
        console.error('Error in DELETE deleteService.', error);
    }
}

// Worker function  - Saga: will be fired on "DELETE_SERVICE" actions
function* deleteServiceSaga() {
    yield takeLatest('DELETE_SERVICE', deleteService);
}

export default deleteServiceSaga;