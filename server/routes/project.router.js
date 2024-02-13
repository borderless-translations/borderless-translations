const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');
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

// Get all projects. Requires admin
router.get('/', rejectUnauthenticated, (req, res) => {
	if (checkAdmin(req.user.id)){
		let querytext = `
			SELECT * FROM "projects"
            JOIN "project_language" ON "project_language"."project_id" = "projects"."id";
		`;
		pool.query(querytext)
			.then((result) => {
				res.send(result.rows);
			})
			.catch((error) => {
				console.error("Error in GET all projects", error);
				res.sendStatus(500);
			})
		;
	}
	else{
		res.sendStatus(403);
	}
});

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