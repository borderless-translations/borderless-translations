import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAllLanguages() {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        
        const response = yield axios.get(`/api/settings/language`, config); // GET languages from DB. Requires admin

        // Stores result in allLanguages.reducer
        yield put({ type: 'SET_ALL_LANGUAGES', payload: response.data });
    }
    catch (error) {
        console.error('Error in GET allLanguages', error);
    }
}

// Worker function  - Saga: will be fired on "GET_ALL_LANGUAGES" actions
function* getAllLanguagesSaga() {
    yield takeLatest('GET_ALL_LANGUAGES', getAllLanguages);
}

export default getAllLanguagesSaga;