import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getContractorProjects(action) {
    try {
        // the config includes credentials which allow the server session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const response = yield axios.get(`/api/contractor/project/${action.payload}`, config); // GET services from DB.
        // Stores result in contractorProjects.reducer
        yield put({ type: 'SET_CONTRACTOR_PROJECTS', payload: response.data });
    }
    catch (error) {
        console.error('Error in GET contractorProjects', error);
    }
}

// Worker function  - Saga: will be fired on "GET_CONTRACTOR_PROJECTS" actions
function* getContractorProjectsSaga() {
    yield takeLatest('GET_CONTRACTOR_PROJECTS', getContractorProjects);
}

export default getContractorProjectsSaga;