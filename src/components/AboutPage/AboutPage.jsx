import React from 'react';
import Card from '@mui/material/Card';
import '../InfoPage/InfoPage.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div className="aboutPage">
        <Card sx={{maxWidth: 600, margin: 'auto', backgroundColor: '#48a6cd', color: 'white', padding: 5}}>
        <h3>Borderless Translations About Page</h3>
        <p>Welcome to the Borderless Translations contractor management site. This site
          allows contractors to keep track of their projects and log their progress in order to coordinate assignments
          with Borderless Translations as well as their fellow translators and proofreaders.
        </p>
        <p>If you haven't yet, <a href="/#/register">register</a> now to fill out your profile and join the BT team!</p>
        </Card>
      </div>
    </div>
  );
}

export default AboutPage;
