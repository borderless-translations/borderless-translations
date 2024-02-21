const express = require('express');
const {
  rejectUnauthenticated, requireAdmin
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET all clients. Admin required
router.get('/', requireAdmin, (req, res) => {
	let querytext = `
	    SELECT * FROM "clients";
	`;
	pool.query(querytext)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET", error);
            res.sendStatus(500);
        });
});

// GET specific client. Admin required
router.get('/:id', requireAdmin, (req, res) => {
	let querytext = `
	    SELECT * FROM "clients"
        WHERE "clients"."id" = $1;
	`;
	pool.query(querytext,[req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET", error);
            res.sendStatus(500);
        })
	;
});

// GET client name by id with no additional info
router.get('/list', rejectUnauthenticated, (req, res) => {
	let querytext = `
	    SELECT "clients"."id", "clients"."name" FROM "clients";
	`;
	pool.query(querytext,[req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET", error);
            res.sendStatus(500);
        })
	;
});

// TODO: Need finalized columns for POST
/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
	const queryText = `
	   INSERT INTO "clients" ("client", "contact", "country", "timezone", "location", "email", "phone", "client_notes") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    const queryValues = [
        req.body.client,
        req.body.contact,
        req.body.country,
        req.body.timezone,
        req.body.location,
        req.body.email,
        req.body.phone,
        req.body.client_notes
    ];
	pool.query(queryText, queryValues)
        .then(() => {res.sendStatus(201)})
        .catch((error) => {
            console.error("Error in POST", error);
            res.sendStatus(500);
        });
});

// TODO: Need finalized columns for PUT
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

/**
 * DELETE route template
 */
router.delete('/', rejectUnauthenticated, (req, res) => {
	let querytext = `
	    // QUERY GOES HERE
	`;
	pool.query(querytext,[])
        .then((result) => {
            // Code to send goes here
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in DELETE", error);
            res.sendStatus(500);
        })
	;
});

module.exports = router;