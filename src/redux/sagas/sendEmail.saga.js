import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendEmail(action) {


    try {
        yield axios.post('/api/email', action.payload); // POST new client
    }
    catch (error) {
        console.error('Send email failed.', error);
    }
}

// Worker function  - Saga: will be fired on "SEND_EMAIL" actions
function* sendEmailSaga() {
    yield takeLatest('SEND_EMAIL', sendEmail);
}

export default sendEmailSaga;