const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Function to check if a user is an admin
function checkAdmin(userId){
    router.get('/', (req,res) => {
        let querytext = `
            SELECT "user"."type" from "user"
            WHERE "user"."id" = $1
        `;
        pool.query(querytext,[userId])
        .then((result) => {
            let userType = result.rows[0];
            userType == 'admin' ? true : false;
        })
        .catch((error) => {
            console.error("Error in checking user auth status", error);
        })
    })
}

// GET all contractors. Requires admin status
router.get('/', rejectUnauthenticated, (req, res) => {
    if (checkAdmin(req.user.id)){
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
    }
    else {
        res.sendStatus(403);
    }
});

// GET specific contractor info. Requires admin status
router.get('/:id', rejectUnauthenticated, (req, res) => {
    if (checkAdmin(req.user.id)){
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
    }
    else {
        res.sendStatus(403);
    }
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