import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button } from '@mui/material';

function RegisterPage() {
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
      <RegisterForm />

      <center>
        <Button className="btn" type="button" name="submit" variant='contained' disableRipple
          sx={buttonStyle}
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
          </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
