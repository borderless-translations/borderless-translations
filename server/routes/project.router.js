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

// GET specific project by id (for contractor)
router.get('/contractor/:id', rejectUnauthenticated, (req, res) => {
    let querytext = `
		SELECT 
		projects.id,
		projects.admin_id, "admin".username AS admin_name, 
		projects.client_id, clients.client AS client_name,
		project_language.contractor_id AS translator_id, translator.username AS translator_name, projects.translator_status,
		project_language.proofreader_id, proofreader.username AS proofreader_name, projects.proofreader_status,
		projects.description, projects.duration, 
		projects.due_at,
		project_language.translator_notes AS notes,
		project_language.from_language_id, from_language."name" AS from_language_name, 
		project_language.to_language_id, to_language."name" AS to_language_name,
		services."type" AS service_type, services.id AS service_id,
		project_language.translator_notes, project_language.flagged
		FROM projects 
		JOIN project_language ON project_language.project_id = projects."id"
		JOIN "user" AS translator ON translator."id" = project_language.contractor_id
		JOIN "user" AS proofreader ON proofreader."id" = project_language.proofreader_id
		JOIN "user" AS "admin" ON "admin"."id" = projects.admin_id
		JOIN clients ON clients."id" = projects.client_id
		JOIN services ON services."id" = project_language.service_id
		JOIN languages AS from_language ON from_language."id" = project_language.from_language_id
		JOIN languages AS to_language ON to_language."id" = project_language.to_language_id
		WHERE "projects"."id" = $1;
	`;
    pool.query(querytext, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET specific project (contractor view)", error);
            res.sendStatus(500);
        })
    ;
});


// GET All projects for a specific client
router.get('/client/:id', requireAdmin, (req, res) => {
	let querytext = 
		`SELECT * FROM "projects"
		WHERE "client_id" = $1
		ORDER BY "status" DESC;`;
	pool.query(querytext, [req.params.id])
	.then((result) => {
		res.send(result.rows);
	})
	.catch((error) => {
		console.error(`Error in GET /api/client/${req.params.id}`, error);
		res.sendStatus(500);
	})
	;
});

// Get specific project by id. Requires admin
// PLEASE DON'T REMOVCE THE /SPECIFIC BEFORE ID, 
// it will make it interpret every string in the othera routes as an ID!
// Also there's a duplicate of this route below??
router.get('/specific/:id', requireAdmin, (req, res) => {
    let querytext = `
		SELECT 
		projects.id,
		projects.admin_id, "admin".username AS admin_name, 
		projects.client_id, clients.client AS client_name,
		project_language.contractor_id AS translator_id, translator.username AS translator_name, projects.translator_status,
		project_language.proofreader_id, proofreader.username AS proofreader_name, projects.proofreader_status,
		projects.description, projects.duration, 
		projects.due_at,
		project_language.translator_notes AS notes,
		project_language.from_language_id, from_language."name" AS from_language_name, 
		project_language.to_language_id, to_language."name" AS to_language_name,
		services."type" AS service_type, services.id AS service_id,
		project_language.translator_notes, project_language.flagged
		FROM projects 
		JOIN project_language ON project_language.project_id = projects."id"
		JOIN "user" AS translator ON translator."id" = project_language.contractor_id
		JOIN "user" AS proofreader ON proofreader."id" = project_language.proofreader_id
		JOIN "user" AS "admin" ON "admin"."id" = projects.admin_id
		JOIN clients ON clients."id" = projects.client_id
		JOIN services ON services."id" = project_language.service_id
		JOIN languages AS from_language ON from_language."id" = project_language.from_language_id
		JOIN languages AS to_language ON to_language."id" = project_language.to_language_id
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
router.get('/ongoing', rejectUnauthenticated, (req, res) => {
	let querytext = `SELECT
	projects.id,
	projects.client_id, clients.client AS client_name,
	projects.description, 
	project_language.contractor_id, projects.translator_status, translator.contractor_name AS translator_name,
	project_language.proofreader_id, projects.proofreader_status, proofreader.contractor_name AS proofreader_name,
	projects.due_at

	FROM projects
	JOIN project_language ON project_language.project_id = projects."id"
	JOIN clients ON clients."id" = projects.client_id
	JOIN contractor_profile AS translator ON translator.user_id = project_language.contractor_id
	JOIN contractor_profile AS proofreader ON proofreader.user_id = project_language.proofreader_id
    WHERE (translator.user_id = ${req.user.id} OR proofreader.user_id = ${req.user.id})
    AND (translator_status != 'Complete' OR proofreader_status != 'Complete')
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
router.get('/completed', rejectUnauthenticated, (req, res) => {
	let querytext = `SELECT
		projects.id,
		projects.client_id, clients.client AS client_name,
		projects.description, 
		project_language.contractor_id, projects.translator_status, translator.contractor_name AS translator_name,
		project_language.proofreader_id, projects.proofreader_status, proofreader.contractor_name AS proofreader_name,
		projects.due_at

		FROM projects
		JOIN project_language ON project_language.project_id = projects."id"
		JOIN clients ON clients."id" = projects.client_id
		JOIN contractor_profile AS translator ON translator.user_id = project_language.contractor_id
		JOIN contractor_profile AS proofreader ON proofreader.user_id = project_language.proofreader_id
		WHERE (translator.user_id = ${req.user.id} OR proofreader.user_id = ${req.user.id})
		AND translator_status = 'Complete' AND proofreader_status = 'Complete'
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
	let querytext = `UPDATE project_language SET flagged = NOT flagged
        WHERE "id" = $1;`;
	pool.query(querytext, [req.body[0]])
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
	let querytext = `UPDATE project_language SET "translator_notes" = $1
        WHERE "id" = $2;`;
	pool.query(querytext, [req.body[0], req.body[1]])
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
	let querytext = `UPDATE projects SET "translator_status" = $1
        WHERE "id" = $2;`;
	pool.query(querytext, [req.body[0], req.body[1]])
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
	let querytext = `UPDATE projects SET "proofreader_status" = $1
        WHERE "id" = $2;`;
	pool.query(querytext,[req.body[0], req.body[1]])
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