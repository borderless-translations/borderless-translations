import { takeLatest } from 'redux-saga/effects';
import mailchimpClient from "@mailchimp/mailchimp_transactional"

function* sendEmail(action) {
    const mailchimpApiKey = import.meta.env.VITE_MAILCHIMP_API_KEY;
    const mailchimpClientCompiled = mailchimpClient(mailchimpApiKey);

    const message = {
        message: {
            text: action.payload.text,
            subject: action.payload.subject,
            from_email: 'no-reply@borderlesstranslations.jp',
            from_name: 'Borderless Translations',
            to: [{
                email: action.payload.toEmail,
                name: action.payload.toName,
                type: "to"
                
            }],
            track_opens: true,
        }
    };

    const sendMessage = async () => {
        const response = await mailchimpClientCompiled.messages.send(message);
        console.log("Message sent. Response: ", response);
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