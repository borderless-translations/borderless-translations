const express = require('express');
const {
  rejectUnauthenticated, requireAdmin
} = require('../modules/authentication-middleware');

const pool = require('../modules/pool');
const router = express.Router();

// Get all projects. Requires admin
router.get('/', requireAdmin, (req, res) => {
    let querytext = `
	SELECT 
    projects.id AS project_id,
    projects.description AS project_description,
    projects.duration,
    projects.created_at,
    projects.due_at,
    projects.status AS project_status,
    projects.translator_status,
    projects.proofreader_status,
    clients.client AS client_name,
	project_language.flagged AS flagged,
    STRING_AGG(DISTINCT from_languages.name, ', ') AS from_language_names,
    STRING_AGG(DISTINCT to_languages.name, ', ') AS to_language_names,
    STRING_AGG(project_language.text_to_translate, ', ') AS texts_to_translate,
    STRING_AGG(project_language.translator_notes, ', ') AS translator_notes
FROM 
    projects
JOIN 
    clients ON projects.client_id = clients.id
LEFT JOIN 
    project_language ON projects.id = project_language.project_id
LEFT JOIN 
    languages AS from_languages ON project_language.from_language_id = from_languages.id
LEFT JOIN 
    languages AS to_languages ON project_language.to_language_id = to_languages.id
GROUP BY 
    projects.id, clients.client, flagged

ORDER BY
	projects.due_at ASC;`;

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
		project_language.contractor_id AS translator_id, translator.contractor_name AS translator_name, projects.translator_status,
		project_language.proofreader_id, proofreader.contractor_name AS proofreader_name, projects.proofreader_status,
		projects.description, projects.duration, 
		projects.due_at,
		project_language.translator_notes AS notes,
		project_language.from_language_id, from_language."name" AS from_language_name, 
		project_language.to_language_id, to_language."name" AS to_language_name,
		services."type" AS service_type, services.id AS service_id,
		project_language.translator_notes, project_language.flagged,

		project_language.text_to_translate, project_language.file_link

		FROM projects 
		JOIN project_language ON project_language.project_id = projects."id"
		LEFT JOIN contractor_profile AS translator ON translator.user_id = project_language.contractor_id
		LEFT JOIN contractor_profile AS proofreader ON proofreader.user_id = project_language.proofreader_id
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
		project_language.contractor_id AS translator_id, translator.contractor_name AS translator_name, projects.translator_status,
		project_language.proofreader_id, proofreader.proofreader_name AS proofreader_name, projects.proofreader_status,
		projects.description, projects.duration, 
		projects.due_at,
		project_language.translator_notes AS notes,
		project_language.from_language_id, from_language."name" AS from_language_name, 
		project_language.to_language_id, to_language."name" AS to_language_name,
		services."type" AS service_type, services.id AS service_id,
		project_language.translator_notes, project_language.flagged,
		project_language.text_to_translate, project_language.file_link
		FROM projects 
		JOIN project_language ON project_language.project_id = projects."id"
		LEFT JOIN contractor_profile AS translator ON translator.user_id = project_language.contractor_id
		LEFT JOIN contractor_profile AS proofreader ON proofreader.user_id = project_language.proofreader_id
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
	let querytext;
	if (req.user.type === 'admin'){
		querytext = `
			SELECT
				projects.id,
				projects.client_id, clients.client AS client_name,
				projects.description, 
				project_language.contractor_id, projects.translator_status, translator.contractor_name AS translator_name,
				project_language.proofreader_id, projects.proofreader_status, proofreader.contractor_name AS proofreader_name,
				projects.due_at,
        		project_language.flagged AS flagged
			FROM "projects"
				JOIN project_language ON project_language.project_id = projects."id"
				JOIN clients ON clients."id" = projects.client_id
				LEFT JOIN contractor_profile AS translator ON translator.user_id = project_language.contractor_id
				LEFT JOIN contractor_profile AS proofreader ON proofreader.user_id = project_language.proofreader_id
			WHERE
				projects.proofreader_status != 'Complete' OR projects.translator_status != 'Complete'
			GROUP BY projects.id, clients.client, project_language.contractor_id, 
				translator.contractor_name, project_language.proofreader_id, proofreader.contractor_name, flagged
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
	}
	else if (req.user.type === 'contractor') {
		querytext = `
			SELECT
				projects.id,
				projects.client_id, clients.client AS client_name,
				projects.description, 
				project_language.contractor_id, projects.translator_status, translator.contractor_name AS translator_name,
				project_language.proofreader_id, projects.proofreader_status, proofreader.contractor_name AS proofreader_name,
				projects.due_at,
				project_language.flagged AS flagged
			FROM "projects"
				JOIN project_language ON project_language.project_id = projects."id"
				JOIN clients ON clients."id" = projects.client_id
			LEFT JOIN contractor_profile AS translator ON translator.user_id = project_language.contractor_id
			LEFT JOIN contractor_profile AS proofreader ON proofreader.user_id = project_language.proofreader_id
			WHERE
				(translator.user_id = $1 OR proofreader.user_id = $1)
				AND (projects.proofreader_status != 'Complete' OR projects.translator_status != 'Complete')
			GROUP BY projects.id, clients.client, project_language.contractor_id, 
				translator.contractor_name, project_language.proofreader_id, proofreader.contractor_name, flagged
			ORDER BY due_at ASC;
		`;
		pool.query(querytext,[req.user.id])
			.then((result) => {
				res.send(result.rows);
			})
			.catch((error) => {
				console.error("Error in GET /api/project/ongoing", error);
				res.sendStatus(500);
			})
		;
	}
});

// GET completed projects
router.get('/completed', rejectUnauthenticated, (req, res) => {
	let querytext;
	if (req.user.type === 'admin'){
		querytext = `
			SELECT
				projects.id,
				projects.client_id, clients.client AS client_name,
				projects.description, 
				project_language.contractor_id, projects.translator_status, translator.contractor_name AS translator_name,
				project_language.proofreader_id, projects.proofreader_status, proofreader.contractor_name AS proofreader_name,
				projects.due_at,
				project_language.flagged AS flagged
			FROM projects 
				JOIN project_language ON project_language.project_id = projects."id"
				JOIN clients ON clients."id" = projects.client_id
			LEFT JOIN contractor_profile AS translator ON translator.user_id = project_language.contractor_id
			LEFT JOIN contractor_profile AS proofreader ON proofreader.user_id = project_language.proofreader_id
			WHERE 
				projects.translator_status = 'Complete' AND projects.proofreader_status = 'Complete'
			GROUP BY projects.id, clients.client, project_language.contractor_id, 
				translator.contractor_name, project_language.proofreader_id, proofreader.contractor_name, flagged
			ORDER BY 
				due_at ASC; 
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
	}
	else if (req.user.type === 'contractor'){
		querytext = `
			SELECT
				projects.id,
				projects.client_id, clients.client AS client_name,
				projects.description, 
				project_language.contractor_id, projects.translator_status, translator.contractor_name AS translator_name,
				project_language.proofreader_id, projects.proofreader_status, proofreader.contractor_name AS proofreader_name,
				projects.due_at,
				project_language.flagged AS flagged
			FROM projects 
				JOIN project_language ON project_language.project_id = projects."id"
				JOIN clients ON clients."id" = projects.client_id
			LEFT JOIN contractor_profile AS translator ON translator.user_id = project_language.contractor_id
			LEFT JOIN contractor_profile AS proofreader ON proofreader.user_id = project_language.proofreader_id
			WHERE 
				(translator.user_id = $1 OR proofreader.user_id = $1)
				AND (projects.translator_status = 'Complete' AND projects.proofreader_status = 'Complete')
			GROUP BY projects.id, clients.client, project_language.contractor_id, 
				translator.contractor_name, project_language.proofreader_id, proofreader.contractor_name, flagged
			ORDER BY 
				due_at ASC; 
		`;
		pool.query(querytext,[req.user.id])
			.then((result) => {
				res.send(result.rows);
			})
			.catch((error) => {
				console.error("Error in GET /api/project/completed", error);
				res.sendStatus(500);
			})
		;
	}
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

// POST for creating a new project
router.post('/', requireAdmin, (req, res) => {
	let newProject = req.body;
	console.log('New Project', newProject)
	if(Object.hasOwn(newProject, "description") == false){
		newProject.description = null;
	}

	if(Object.hasOwn(newProject, "duration") == false){
		newProject.duration = null;
	}

	let querytext = `
		INSERT INTO
			"projects" ("admin_id","client_id","description","duration","due_at")
		VALUES
			($1,$2,$3,$4,$5)
		RETURNING
			"id";
	`;
	pool.query(querytext,[req.user.id, newProject.client_id, newProject.description, newProject.duration, newProject.due_at])
		.then((result) => {
			console.log('Result rows', result.rows)
			let project_id = result.rows[0].id
			let querytext2 = `
				INSERT INTO
					"project_language" ("project_id", "from_language_id", "to_language_id", "service_id", "contractor_id", "proofreader_id")
				VALUES
					($1,$2,$3,$4,$5,$6);
			`;
			pool.query(querytext2,[project_id, newProject.from_language_id, newProject.to_language_id, newProject.service_id, newProject.contractor_id, newProject.proofreader_id])
				.then(() => res.sendStatus(201))
				.catch((error)=> {
					console.error("Error in secondary query POST new project", error);
					res.sendStatus(500);
				})
			;
		})
		.catch((error) => {
			console.error("Error in first query POST new project", error);
			res.sendStatus(500);
		})
	;
});



// PUT route for updating project details
router.put('/:id', rejectUnauthenticated, (req, res) => {
	let querytext = `
		UPDATE "projects"
		SET
			"description" = $1,
			"duration" = $2, 
			"due_at" = $3,
			"translator_status" = $4,
			"proofreader_status" = $5
		WHERE "projects"."id" = $6;
	`;
	pool.query(querytext,[
		req.body.description,
		req.body.duration,
		req.body.due_at,
		req.body.translator_status,
		req.body.proofreader_status,
		req.params.id
	])
		.then(() => {
			let querytext2 = `
				UPDATE "project_language"
				SET
					"contractor_id" = $1,
					"proofreader_id" = $2,
					"from_language_id" = $3,
					"to_language_id" = $4,
					"text_to_translate" = $5,
					"translator_notes" = $6,
					"service_id" = $7,
					"file_link" = $8,
					"flagged" = $9
				WHERE "project_language"."project_id" = $10;
			`;
			pool.query(querytext2, [
				req.body.translator_id,
				req.body.proofreader_id,
				req.body.from_language_id,
				req.body.to_language_id,
				req.body.text_to_translate,
				req.body.translator_notes,
				req.body.service_id,
				// req.body.service_notes,
				req.body.file_link,
				req.body.flagged,
				req.params.id
			])
				.then(() => res.sendStatus(201))
				.catch((error) => {
					console.error("Error in secondary query PUT project", error);
					res.sendStatus(500);
				})
		})
		.catch((error) => {
			console.error("Error in PUT project", error);
			res.sendStatus(500);
		})
	;
});

module.exports = router;