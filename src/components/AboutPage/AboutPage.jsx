import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h3>Borderless Translations About Page</h3>
        <p>Welcome to the Borderless Translations contractor management site. This site
          will allow you to keep track of your projects and log their progress in order to coordinate
          with Borderless Translations as well as your fellow translators and proofreaders.
        </p>
        <p>If you haven't yet, <a href="/#/home">login</a> now to fill out your profile and join the BT team!</p>
      </div>
    </div>
  );
}

export default AboutPage;
