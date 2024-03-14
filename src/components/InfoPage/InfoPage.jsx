import React from 'react';
import {Paper, Box} from "@mui/material/";
import './InfoPage.css';




function InfoPage() {
  return (
    <div className="container infoPage">
      <p>This website was built by the Prime Digital Academy Taaffeite Cohort Borderless Translations team:</p>
        <ul className="cohortList">
          <li>Juan Balbuena</li>
          <li>Chris Cantoni</li>
          <li>Brock Nelson</li>
          <li>Andy Prehn</li>
          <li>Robin Raabe</li>
          <li>J Read</li>
        </ul>

      <h4>Technologies used to build this website include:</h4>
      <div className="infoCard">
      <Box sx={{maxWidth: 700, display: 'flex', flexGrow: 1, flexWrap: 'wrap', flexDirection: 'row', 
      textAlign: 'center', justifyContent: 'space-around', alignContent: 'space-between'}}>
        <Paper className="infoPaper" sx={{flexDirection: "column"}}><h5>Javascript</h5><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="60" height="60"/></Paper>
        <Paper className="infoPaper"><h5>Vite</h5> <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" alt="Vite" width="60" height="60"/></Paper>
        <Paper className="infoPaper"><h5>React</h5> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="react" width="60" height="60"/></Paper>
        <Paper className="infoPaper"><h5>Redux</h5> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="60" height="60"/></Paper>
        <Paper className="infoPaper"><h5>Passport</h5><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Passportjs.svg/240px-Passportjs.svg.png" alt="PassportJS" width="60" height="60"/></Paper>
        <Paper className="infoPaper"><h5>Material UI</h5> <img src="https://v4.mui.com/static/logo.png" alt="Material UI" width="60" height="60" /></Paper>
        <Paper className="infoPaper"><h5>Node.js</h5> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="50" height="50"/></Paper>
        <Paper className="infoPaper"><h5>Express.js</h5> <img src="https://inapp.com/wp-content/uploads/elementor/thumbs/express-js-01-1-q05uw85vt1jqloiy5k82sfy7tgvysgt1uqld8slsbc.png" alt="express" width="90" /></Paper>
        <Paper className="infoPaper"><h5>Axios</h5> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Axios_logo_%282020%29.svg/150px-Axios_logo_%282020%29.svg.png" alt="axios" width="60"/></Paper>
        <Paper className="infoPaper"><h5>PostgreSQL</h5> <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="postgresql" width="60" height="60"/></Paper>
        <Paper className="infoPaper"><h5>HTML</h5> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="60" height="60"/></Paper>
        <Paper className="infoPaper"><h5>MailChimp</h5> <img src="https://www.svgrepo.com/show/452053/mailchimp.svg" alt="mailchimp" width="60" height="60"/></Paper>
        <Paper className="infoPaper"><h5>Luxon</h5> <img src="https://moment.github.io/luxon/docs/_media/Luxon_icon_64x64.png" alt="luxon" width="60" height="60"/></Paper>
        <Paper className="infoPaper"><h5>Postman</h5> <img src="https://cdn.worldvectorlogo.com/logos/postman.svg" alt="postman" width="60" height="60"/></Paper>
        <Paper className="infoPaper"><h5>CSS</h5> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="60" /></Paper>
        </Box>
        </div>
    </div>
  );
}

export default InfoPage;
