# borderless-translations
<!-- Table of Contents -->
### Table of Contents




### Description
<!-- Description goes here -->




### Built With
<!-- Built With -->





### Getting Started
<!-- Getting Started -->





### Prerequisites
<!-- Prerequisites -->





### Local Installation Instructions
<!-- Local Installation Instructions -->




### Usage
<!-- Usage -->





### Deployment Instructions

Login Credentials for Heroku have been provided in the hand off document.

If you need make changes you wish to push to the deployed app, you must login, go into the borderless-translations section, go to the deploy tab, and then manually deploy. You can reconfigure this to redeploy automatically if you wish, which is on the same page.

Environment variables are kept on Heroku in the Settings tab, just click the Reveal Config Vars button

To set up the DB, we used Postico, just plug the information from Heroku into a new favorite. The Information for this can be found in the Resources tab, by clicking the Postgres add on. From there it will bring you to a new page where you will go into the settings tab and click view credentials.

If you'd like to create new users (also a hacky way to change password) you must:

1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security.
2. Go into the user router
3. Uncomment the route
4. Push changes and redeploy app
5. Register User
6. Comment out the route back in VSCode
7. Push changes
8. Redeploy





