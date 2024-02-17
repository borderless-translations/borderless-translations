import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteLanguage(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // Removing language from DB. Requires Admin
        yield axios.delete(`/api/settings/language`, action.payload, config);
        // GET for updated list
        const response = yield axios.get(`/api/settings/language`, config);
        // Storing updated list in allLanguages.reducer
        yield put({ type: 'SET_ALL_LANGUAGES', payload: response.data });

    }
    catch (error) {
        console.error('Error in POST createNewLanguage.', error);
    }
}

// Worker function  - Saga: will be fired on "DELETE_LANGUAGE" actions
function* deleteLanguageSaga() {
    yield takeLatest('DELETE_LANGUAGE', deleteLanguage);
}

export default deleteLanguageSaga;