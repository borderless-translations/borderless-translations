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
router.get('/:id', requireAdmin, (req, res) => {
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
router.get('/self', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT * FROM "contractor_profile"
        JOIN "contractor_services" ON "contractor_services"."contractor_id" = "contractor_profile"."user_id"
        JOIN "contractor_language" ON "contractor_language"."user_id" = "contractor_profile"."user_id"
        WHERE "contractor_profile"."user_id" = $1;
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

//PUT Route for updating a single contractor's info
router.put('/:id', rejectUnauthenticated, (req, res) => {
	let querytext = `
	    UPDATE "contractor_profile" 
        SET "contractor_name" = $1, "timezone" = $2, "location" = $3,
        "linkedIn" = $4, "base_written_rate" = $5, "base_audio_video_rate" = $6
        WHERE "contractor_profile"."user_id" = $7
	`;
	pool.query(querytext,[
        req.body.contractor_name,
        req.body.timezone,
        req.body.location,
        req.body.linkedin,
        req.body.writtenRate,
        req.body.avRate,
        req.params.id
    ])
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
router.put('/availability-admin/:id', requireAdmin, (req, res) => {
	let querytext = `
	    UPDATE "contractor_profile"
        SET "available" = NOT "available"
        WHERE "contractor_profile"."user_id" = $1;
	`;
	pool.query(querytext,[req.params.id])
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