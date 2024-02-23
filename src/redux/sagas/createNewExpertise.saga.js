import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createNewExpertise(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.post(`/api/settings/expertise`, action.payload, config); // POST expertise to DB.
        yield put({ type: 'GET_ALL_EXPERTISE'});
    }
    catch (error) {
        console.error('Error in POST createNewExpertise', error);
    }
}

function* createNewExpertiseSaga() {
    yield takeLatest('CREATE_NEW_EXPERTISE', createNewExpertise);
}

export default createNewExpertiseSaga;