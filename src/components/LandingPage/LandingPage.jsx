import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useTranslation } from 'react-i18next';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const {t,i18n} = useTranslation();
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <h2>{t('title')}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            {t('description.part1')}
          </p>

          <p>
            {t('description.part2')}
          </p>

          <p>
            {i18n.language}
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <LoginForm />

          <center>
            <h4>Need to Register?</h4>
            <button className="btn btn_sizeSm" onClick={onRegister}>
              Register
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
