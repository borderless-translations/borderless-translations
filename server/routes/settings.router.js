const express = require('express');
const {
  rejectUnauthenticated, requireAdmin
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// GET all languages
router.get('/language', rejectUnauthenticated, (req, res) => {
	let querytext = `
		SELECT * FROM "languages";
	`;
	pool.query(querytext,[])
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.error("Error in GET", error);
			res.sendStatus(500);
		})
	;
});

// POST new language
router.post('/language', requireAdmin, (req, res) => {
	let querytext = `
		INSERT INTO "languages" ("name", "tier")
        VALUES ($1, $2);
	`;
	pool.query(querytext,[req.body.name, req.body.tier])
		.then((result) => {
			// Code to send goes here
			res.sendStatus(201)
		})
		.catch((error) => {
			console.error("Error in POST new language", error);
			res.sendStatus(500);
		})
	;
});

// DELETE language from table
router.delete('/language/:id', requireAdmin, (req, res) => {
	let querytext = `
		DELETE FROM "languages"
        WHERE "id" = $1;
	`;
	pool.query(querytext,[req.params.id])
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

// GET all services
router.get('/service', rejectUnauthenticated, (req, res) => {
	let querytext = `
		SELECT * FROM "services";
	`;
	pool.query(querytext,[])
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.error("Error in GET", error);
			res.sendStatus(500);
		})
	;
});

// POST new language
router.post('/service', requireAdmin, (req, res) => {
	let querytext = `
		INSERT INTO "services" ("type")
        VALUES ($1);
	`;
	pool.query(querytext,[req.body.type])
		.then((result) => {
			// Code to send goes here
			res.sendStatus(201)
		})
		.catch((error) => {
			console.error("Error in POST new language", error);
			res.sendStatus(500);
		})
	;
});

// DELETE language from table
router.delete('/service/:id', requireAdmin, (req, res) => {
	let querytext = `
		DELETE FROM "services"
        WHERE "id" = $1;
	`;
	pool.query(querytext,[req.params.id])
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

// GET all rates
router.get('/rate', requireAdmin, (req, res) => {
	let querytext = `
		SELECT * FROM "rates";
	`;
	pool.query(querytext,[])
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.error("Error in GET", error);
			res.sendStatus(500);
		})
	;
});

// POST new language
router.post('/rate', requireAdmin, (req, res) => {
	let querytext = `
		INSERT INTO "rates" ("rate", "service_id", "tier")
        VALUES ($1, $2, $3);
	`;
	pool.query(querytext,[req.body.rate, req.body.service_id, req.body.tier])
		.then((result) => {
			// Code to send goes here
			res.sendStatus(201)
		})
		.catch((error) => {
			console.error("Error in POST new language", error);
			res.sendStatus(500);
		})
	;
});

// DELETE language from table
router.delete('/rate/:id', requireAdmin, (req, res) => {
	let querytext = `
		DELETE FROM "rates"
        WHERE "id" = $1;
	`;
	pool.query(querytext,[req.params.id])
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

// GET all contractor_languages
router.get('/contractor/language', requireAdmin, (req, res) => {
	let querytext = `
		SELECT * FROM "contractor_language";
	`;
	pool.query(querytext,[])
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.error("Error in GET", error);
			res.sendStatus(500);
		})
	;
});

// GET all specific contractor_languages
router.get('/:id/language', requireAdmin, (req, res) => {
	let querytext = `
		SELECT * FROM "contractor_language"
        WHERE "user_id" = $1;
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

// GET contractor_languages for self
router.get('/:id/language', rejectUnauthenticated, (req, res) => {
	let querytext = `
		SELECT * FROM "contractor_language"
        WHERE "user_id" = $1;
	`;
	pool.query(querytext,[req.user.id])
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.error("Error in GET", error);
			res.sendStatus(500);
		})
	;
});

// POST new language
router.post('/contractor/language', requireAdmin, (req, res) => {
	let querytext = `
		INSERT INTO "contractor_language" ("user_id", "from_language_id", "to_language_id")
        VALUES ($1, $2, $3);
	`;
	pool.query(querytext,[req.user.id, req.body.from_language_id, req.body.to_language_id])
		.then((result) => {
			// Code to send goes here
			res.sendStatus(201)
		})
		.catch((error) => {
			console.error("Error in POST new language", error);
			res.sendStatus(500);
		})
	;
});

// DELETE language from table
router.delete('/contractor/language/:id', rejectUnauthenticated, (req, res) => {
    let querytext = `
		DELETE FROM "contractor_language"
        WHERE 
            "id" = $1
            AND "user_id" = $2;
	`;
	pool.query(querytext,[req.params.id, req.user.id])
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