const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const mailchimpClient = require('@mailchimp/mailchimp_transactional');

const router = express.Router();

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
        const mailchimpClientCompiled = mailchimpClient(mailchimpApiKey);
    
        const message = {
            message: {
                text: req.body.text,
                subject: req.body.subject,
                from_email: 'no-reply@borderlesstranslations.jp',
                from_name: 'Borderless Translations',
                to: [{
                    email: req.body.toEmail,
                    name: req.body.toName,
                    type: "to"
                    
                }],
                track_opens: true,
            }
        };

        const response = await mailchimpClientCompiled.messages.send(message);
        res.sendStatus(200);
    } catch (e) {
        console.log('error sending mailchimp email', e);
        res.sendStatus(500);
    }

});

module.exports = router;