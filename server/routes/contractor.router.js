const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// PUT contractor settings
// Need to edit the multiple select fields (language_pairs, services, skills) to loop and update separately in the .then or async
router.put('/settings', rejectUnauthenticated, (req, res) => {
	let querytext = `UPDATE contractor_profile SET available = ${req.body.params.available}, 
        name = ${req.body.params.name}, 
        linkedIn = ${req.body.params.linkedIn}, 
        email = ${req.body.params.email}, 
        timezone = ${req.body.params.timezone}, 
        language_pairs: ${req.body.params.languagePairs}
        skills = ${req.body.params.skills},
        services = ${req.body.params.services},
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

// GET ongoing projects
router.get('/project/ongoing', rejectUnauthenticated, (req, res) => {
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
		console.error("Error in GET /contractor/project/ongoing", error);
		res.sendStatus(500);
	})
	;
});

// GET completed projects
router.get('/project/completed', rejectUnauthenticated, (req, res) => {
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
		console.error("Error in GET /contractor/project/completed", error);
		res.sendStatus(500);
	})
	;
});

// GET project details
router.get('/project/:id', rejectUnauthenticated, (req, res) => {
	let querytext = `SELECT * FROM projects WHERE id = ${req.params.id}`;
	pool.query(querytext)
	.then((result) => {
		res.send(result.rows);
	})
	.catch((error) => {
		console.error("Error in GET /contractor/project", error);
		res.sendStatus(500);
	})
	;
});

// PUT project flagged status
router.put('/project/flagged', rejectUnauthenticated, (req, res) => {
	let querytext = `UPDATE projects SET "flagged" = !flagged
        WHERE "id" = ${req.body.params.id};`;
	pool.query(querytext)
	.then((result) => {
		res.sendStatus(200)
	})
	.catch((error) => {
		console.error("Error in PUT /contractor/project/flagged", error);
		res.sendStatus(500);
	})
	;
});

// PUT project notes
router.put('/project/notes', rejectUnauthenticated, (req, res) => {
    let notes = req.body.params.notes;
	let querytext = `UPDATE projects SET "notes" = ${notes}
        WHERE "id" = ${req.body.params.id};`;
	pool.query(querytext)
	.then((result) => {
		res.sendStatus(200)
	})
	.catch((error) => {
		console.error("Error in PUT /contractor/project/notes", error);
		res.sendStatus(500);
	})
	;
});

// PUT project translator status
router.put('/project/status/translator', rejectUnauthenticated, (req, res) => {
    let translatorStatus = req.body.params.translatorStatus;

	let querytext = `UPDATE projects SET "translator_status" = ${translatorStatus} 
        WHERE "id" = ${req.body.params.id};`;
	pool.query(querytext)
	.then((result) => {
		res.sendStatus(200)
	})
	.catch((error) => {
		console.error("Error in PUT /contractor/project/status/translator", error);
		res.sendStatus(500);
	})
	;
});

// PUT project proofreader status
router.put('/project/status/proofreader', rejectUnauthenticated, (req, res) => {
    let proofreaderStatus = req.body.params.proofreaderStatus;

	let querytext = `UPDATE projects SET "proofreader_status" = ${proofreaderStatus}
        WHERE "id" = ${req.body.params.id};`;
	pool.query(querytext)
	.then((result) => {
		res.sendStatus(200)
	})
	.catch((error) => {
		console.error("Error in PUT /contractor/project/status/proofreader", error);
		res.sendStatus(500);
	})
	;
});

module.exports = router;