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
        })
    ;
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
});

module.exports = router;