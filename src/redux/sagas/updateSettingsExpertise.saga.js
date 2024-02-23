import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateSettingsExpertise(action) {

    console.log("in updateSettingExpertiseSaga, action.payload is:", action.payload);

    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/settings/expertise/${action.payload.id}`, action.payload, config); // PUT client object

        yield put({ type: 'GET_ALL_EXPERTISE'});
    }
    catch (error) {
        console.error('Error in PUT update settings expertise', error);
    }
}

// Worker function  - Saga: will be fired on "UPDATE_CLIENT" actions
function* updateSettingsExpertiseSaga() {
    yield takeLatest('UPDATE_EXPERTISE', updateSettingsExpertise);
}

export default updateSettingsExpertiseSaga;