import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  const buttonStyle = {
    backgroundColor: '#48a6cd',
    color: 'white',
    "&:hover": {
        backgroundColor: '#332c7b'
    }
  }

  return (
    <div>
      <LoginForm />

      <center>
        <Button sx={buttonStyle}
          type="button"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
