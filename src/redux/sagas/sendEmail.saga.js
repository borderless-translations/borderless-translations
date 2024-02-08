import { takeLatest } from 'redux-saga/effects';

function* sendEmail(action) {
    // TODO: Add API key from client
    const mailchimpClient = require("@mailchimp/mailchimp_transactional")("YOUR_API_KEY");

    const message = {
        message: {
            text: action.payload.text,
            subject: action.payload.subject,
            from_email: action.payload.fromEmail,
            from_name: action.payload.fromName,
            to: {
                email: action.payload.toEmail,
                name: action.payload.toName
            },
            track_opens: true,
        }
    };

    const sendMessage = async () => {
        const response = await mailchimpClient.messages.send(message)
    }

    try {
        sendMessage(message);
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