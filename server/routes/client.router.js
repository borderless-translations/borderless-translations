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

router.get('/projects', requireAdmin, (req, res) => {
    let querytext = `
    SELECT 
	"clients"."id",
	"clients"."client",
	COUNT(1) FILTER(WHERE "status" = 'NOT STARTED') AS not_started,
	COUNT(1) FILTER(WHERE "status" = 'IN PROCESS') AS in_process,
	COUNT(1) FILTER(WHERE "status" = 'COMPLETE') AS complete
    FROM "clients"
    LEFT JOIN "projects" ON "clients"."id" = "client_id"
    GROUP BY "clients"."id", "clients"."client"
    ORDER BY "clients"."client" ASC;
    `;
    pool.query(querytext,[])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.error("Error in GET /clients/projects", error);
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
router.post('/', requireAdmin, (req, res) => {
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
router.put('/:id', requireAdmin, (req, res) => {
    console.log(req.params.id)
	let queryText = `
	    UPDATE "clients" 
            SET 
                "client" = $1, 
                "contact" = $2, 
                "country" = $3, 
                "timezone" = $4, 
                "location" = $5, 
                "email" = $6, 
                "phone" = $7, 
                "client_notes" = $8
            WHERE "id" = $9;
	`;
    let queryValues = [
        req.body.client,
        req.body.contact,
        req.body.country,
        req.body.timezone,
        req.body.location,
        req.body.email,
        req.body.phone,
        req.body.client_notes,
        req.params.id
    ];
	pool.query(queryText, queryValues)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in PUT", error);
            res.sendStatus(500);
        })
	;
});

// DELETE client - not recommended. Requires admin.
router.delete('/:id', requireAdmin, (req, res) => {
	let querytext = `
	    DELETE FROM "clients"
        WHERE "clients"."id" = $1
	`;
	pool.query(querytext,[req.params.id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.error("Error in DELETE", error);
            res.sendStatus(500);
        })
	;
});

module.exports = router;