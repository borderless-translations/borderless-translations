const express = require('express');
const {
  rejectUnauthenticated, requireAdmin
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');
const router = express.Router();

// GET all contractors. Requires admin status
router.get('/', requireAdmin, (req, res) => {
    let querytext = `
        SELECT * FROM "contractor_profile"
        JOIN "contractor_services" ON "contractor_services"."contractor_id" = "contractor_profile"."user_id"
        JOIN "contractor_language" ON "contractor_language"."user_id" = "contractor_profile"."user_id";
    `;
    pool.query(querytext)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET all contractors", error);
            res.sendStatus(500);
        });
});

// GET specific contractor info. Requires admin status
router.get('/specific/:id', requireAdmin, (req, res) => {
    let querytext = `
        SELECT * FROM "contractor_profile"
        JOIN "contractor_services" ON "contractor_services"."contractor_id" = "contractor_profile"."user_id"
        JOIN "contractor_language" ON "contractor_language"."user_id" = "contractor_profile"."user_id"
        WHERE "contractor_profile"."user_id" = $1;
    `;
    pool.query(querytext,[req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor by id", error);
            res.sendStatus(500);
        })
    ;
});

// TODO: Needs updated column names
// GET contractor id/names without additional info
router.get('/list', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT "contractor_profile"."id", "contractor_profile"."name" FROM "contractor_profile";
    `;
    pool.query(querytext,[req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor by id", error);
            res.sendStatus(500);
        })
    ;
});

// GET contractor info for requesting user only.
// Does not require admin status
router.get('/self/user', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT
        contractor_profile.id, contractor_profile.user_id, 
        contractor_profile.base_audio_video_rate, contractor_profile.base_written_rate,
        contractor_profile.contractor_name, contractor_profile.available,  
        contractor_profile.notes, contractor_profile.phone, contractor_profile.linked_in,
        contractor_profile."location", contractor_profile.timezone,
        "user".username AS email
        FROM contractor_profile
        JOIN "user" ON "user"."id" = contractor_profile.user_id
        WHERE contractor_profile.user_id = $1;
    `;
    pool.query(querytext,[req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor by id", error);
            res.sendStatus(500);
        })
    ;
});

// GET contractor language info for requesting user only.
// Does not require admin status
router.get('/self/languages', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT
        contractor_language.id, contractor_language.user_id,
        from_language."name" AS from_language, to_language."name" AS to_language
        FROM contractor_language
        JOIN languages AS from_language ON from_language.id = contractor_language.from_language_id
        JOIN languages AS to_language ON to_language.id = contractor_language.to_language_id
        WHERE contractor_language.user_id = $1; 
    `;
    pool.query(querytext,[req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor/languages by id", error);
            res.sendStatus(500);
        })
    ;
});

// GET contractor service info for requesting user only.
// Does not require admin status
router.get('/self/services', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT
        contractor_services.id,
        contractor_services.contractor_id,
        services."type" AS service_type
        FROM contractor_services
        JOIN services ON services.id = contractor_services.service_id
        WHERE contractor_services.contractor_id = $1;
    `;
    pool.query(querytext,[req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET contractor/services by id", error);
            res.sendStatus(500);
        })
    ;
});

// TODO: Need finalized columns to create POST
/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
	let querytext = `
	    // QUERY GOES HERE
	`;
	pool.query(querytext,[])
        .then((result) => {
            // Code to send goes here
            res.sendStatus(201)
        })
        .catch((error) => {
            console.error("Error in POST", error);
            res.sendStatus(500);
        })
	;
});

// TODO: Need finalized columns to create PUT
/**
 * PUT route template
 */
router.put('/', rejectUnauthenticated, (req, res) => {
	let querytext = `
	    // QUERY GOES HERE
	`;
	pool.query(querytext,[])
        .then((result) => {
            // Code to send goes here
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in PUT", error);
            res.sendStatus(500);
        })
    ;
})

// Toggle availability for self
router.put('/availability', rejectUnauthenticated, (req, res) => {
	let querytext = `
	    UPDATE "contractor_profile"
        SET "available" = NOT "available"
        WHERE "contractor_profile"."user_id" = $1;
	`;
	pool.query(querytext,[req.user.id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in PUT", error);
            res.sendStatus(500);
        })
    ;
})

// Toggle availability for admin
router.put('/availability-admin', requireAdmin, (req, res) => {
	let querytext = `
	    UPDATE "contractor_profile"
        SET "available" = NOT "available"
        WHERE "contractor_profile"."user_id" = $1;
	`;
	pool.query(querytext,[req.body.id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in PUT", error);
            res.sendStatus(500);
        })
    ;
})

// PUT contractor settings
// Need to edit the multiple select fields (language_pairs, services, skills) to loop and update separately in the .then or async
router.put('/settings', rejectUnauthenticated, (req, res) => {
	let querytext = `UPDATE contractor_profile SET available = ${req.body.params.available}, 
        contractor_name = ${req.body.params.name}, 
        linkedIn = ${req.body.params.linkedIn}, 
        // email = ${req.body.params.email}, 
        timezone = ${req.body.params.timezone}, 
        language_profile = ${req.body.params.languagePairs},
        // skills = ${req.body.params.skills},
        // services = ${req.body.params.services},
        written_rate = ${req.body.params.writtenRate},
        minute_rate = ${req.body.params.minuteRate}
        WHERE id = ${req.body.params.id}
	`;
	pool.query(querytext)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in PUT /contractor/settings", error);
            res.sendStatus(500);
        })
	;
});

module.exports = router;