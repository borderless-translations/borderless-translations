import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateSettingsService(action) {

    console.log("in updateSettingServiceSaga, action.payload is:", action.payload);

    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/settings/service/${action.payload.id}`, action.payload, config); // PUT client object

        yield put({ type: 'GET_ALL_SERVICES'});
    }
    catch (error) {
        console.error('Error in PUT update settings service', error);
    }
}

// Worker function  - Saga: will be fired on "UPDATE_CLIENT" actions
function* updateSettingsServiceSaga() {
    yield takeLatest('UPDATE_SERVICE', updateSettingsService);
}

export default updateSettingsServiceSaga;