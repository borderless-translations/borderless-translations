const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const contractorRouter = require('./routes/contractor.router');
const projectRouter = require('./routes/project.router');
const clientRouter = require('./routes/client.router');
const settingsRouter = require('./routes/settings.router');
const emailRouter = require('./routes/email.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/contractor', contractorRouter);
app.use('/api/project', projectRouter);
app.use('/api/client', clientRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/email', emailRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});