import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteExpertise(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // Removing expertise from DB. Requires Admin
        yield axios.delete(`/api/settings/expertise/`, {data: action.payload, config}); // DELETE expertise from DB.

        // Call getAllExpertise.saga to get updated expertise
        yield put({ type: 'GET_ALL_EXPERTISE'});
    }
    catch (error) {
        console.error('Error in DELETE deleteExpertise', error);
    }
}

function* deleteExpertiseSaga() {
    yield takeLatest('DELETE_EXPERTISE', deleteExpertise);
}

export default deleteExpertiseSaga;