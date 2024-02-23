import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAllExpertise() {
    console.log("in getAllExpertiseSaga")
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/settings/expertise`, config); // GET expertise from DB.

        // Stores result in allExpertise.reducer
        yield put({ type: 'SET_ALL_EXPERTISE', payload: response.data });
    }
    catch {
        console.error('Error in GET allExpertise', error);
    
    }


}

function* getAllExpertiseSaga() {
    yield takeLatest('GET_ALL_EXPERTISE', getAllExpertise);
}

export default getAllExpertiseSaga;