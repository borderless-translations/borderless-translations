const express = require('express');
const {
  rejectUnauthenticated, requireAdmin
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');
const router = express.Router();

// Get all projects. Requires admin
router.get('/', requireAdmin, (req, res) => {
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
});

// Get specific project by id. Requires admin
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT * FROM "projects"
        JOIN "project_language" ON "project_language"."project_id" = "projects"."id"
        WHERE "projects"."id" = $1;
    `;
    pool.query(querytext, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET specific project", error);
            res.sendStatus(500);
        })
    ;
});

// Get all projects for the requesting user.
router.get('/self', rejectUnauthenticated, (req, res) => {
    let querytext = `
        SELECT * FROM "projects"
        JOIN "project_language" ON "project_language"."project_id" = "projects"."id"
        WHERE "project_language"."contractor_id" = $1
            OR "project_language"."proofreader_id" = $1
    `;
    pool.query(querytext, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET projects for self", error);
            res.sendStatus(500);
        })
    ;
});

// GET ongoing projects
router.get('/ongoing', requireAdmin, (req, res) => {
	let querytext = `SELECT * FROM projects 
        WHERE translator_status != 'complete' 
        OR proofreader_status != 'complete'
        ORDER BY due_at ASC; 
	`;
	pool.query(querytext)
	.then((result) => {
		res.send(result.rows);
	})
	.catch((error) => {
		console.error("Error in GET /api/project/ongoing", error);
		res.sendStatus(500);
	})
	;
});

// GET completed projects
router.get('/completed', requireAdmin, (req, res) => {
	let querytext = `SELECT * FROM projects 
        WHERE translator_status = 'complete' 
        AND proofreader_status = 'complete'
        ORDER BY due_at ASC; 
	`;
	pool.query(querytext)
	.then((result) => {
		res.send(result.rows);
	})
	.catch((error) => {
		console.error("Error in GET /api/project/completed", error);
		res.sendStatus(500);
	})
	;
});

// PUT project flagged status
router.put('/flagged', rejectUnauthenticated, (req, res) => {
	let querytext = `UPDATE projects SET "flagged" = !flagged
        WHERE "id" = $1;`;
	pool.query(querytext, [req.body.id])
	.then((result) => {
		res.sendStatus(200)
	})
	.catch((error) => {
		console.error("Error in PUT /api/project/flagged", error);
		res.sendStatus(500);
	})
	;
});

// PUT project notes
router.put('/notes', rejectUnauthenticated, (req, res) => {
    let notes = req.body.notes;
	let querytext = `UPDATE projects SET "notes" = $1
        WHERE "id" = $2;`;
	pool.query(querytext, [notes, req.body.id])
		.then((result) => {
			res.sendStatus(200)
		})
		.catch((error) => {
			console.error("Error in PUT /api/project/notes", error);
			res.sendStatus(500);
		})
	;
});

// PUT project translator status
router.put('/status/translator', rejectUnauthenticated, (req, res) => {
    let translatorStatus = req.body.translatorStatus;
	let querytext = `UPDATE projects SET "translator_status" = $1
        WHERE "id" = $2;`;
	pool.query(querytext, [translatorStatus, req.body.id])
		.then((result) => {
			res.sendStatus(200)
		})
		.catch((error) => {
			console.error("Error in PUT /api/project/status/translator", error);
			res.sendStatus(500);
		})
	;
});

// PUT project proofreader status
router.put('/status/proofreader', rejectUnauthenticated, (req, res) => {
    let proofreaderStatus = req.body.proofreaderStatus;
	let querytext = `UPDATE projects SET "proofreader_status" = $1
        WHERE "id" = $2;`;
	pool.query(querytext,[proofreaderStatus, req.body.id])
		.then((result) => {
			res.sendStatus(200)
		})
		.catch((error) => {
			console.error("Error in PUT /api/project/status/proofreader", error);
			res.sendStatus(500);
		})
	;
});

// TODO: Needs finalized columns for table
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

// TODO: Needs finalized columns for table
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