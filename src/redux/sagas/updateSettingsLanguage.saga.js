import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateSettingsLanguage(action) {

    console.log("in updateSettingsLanguageSaga, action.payload is:", action.payload);

    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        yield axios.put(`/api/settings/language/${action.payload.id}`, action.payload, config); // PUT client object

        yield put({ type: 'GET_ALL_LANGUAGES'});
    }
    catch (error) {
        console.error('Error in PUT update settings language', error);
    }
}

// Worker function  - Saga: will be fired on "UPDATE_CLIENT" actions
function* updateSettingsLanguageSaga() {
    yield takeLatest('UPDATE_LANGUAGE', updateSettingsLanguage);
}

export default updateSettingsLanguageSaga;