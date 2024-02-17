import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createNewLanguage(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // Adding new language to DB. Requires admin.
        yield axios.post(`/api/settings/language`, action.payload, config);
        // GET for updated list
        const response = yield axios.get(`/api/settings/language`, config);
        // Storing updated list in allLanguages.reducer
        yield put({ type: 'SET_ALL_LANGUAGES', payload: response.data });

    }
    catch (error) {
        console.error('Error in POST createNewLanguage.', error);
    }
}

// Worker function  - Saga: will be fired on "CREATE_NEW_LANGUAGE" actions
function* createNewLanguageSaga() {
    yield takeLatest('CREATE_NEW_LANGUAGE', createNewLanguage);
}

export default createNewLanguageSaga;