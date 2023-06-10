import { Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { signInActions } from '../components/store/sign/signIn';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '../components/store/auth/authThunk';
import { snackBarActions } from '../components/store/snackBar';
import { USERS_ROLE } from '../constants';
const SignIn = () => {
  const signIn = useSelector((state) => state.signIn);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEmailHandler = (e) => {
    dispatch(signInActions.emailValidHandler(e.target.value));
    dispatch(signInActions.getEmailValue(e.target.value));
    dispatch(signInActions.formValidHandler());
  };
  const getPasswordHandler = (e) => {
    dispatch(signInActions.passwordValidHandler(e.target.value));
    dispatch(signInActions.getPasswordValue(e.target.value));
    dispatch(signInActions.formValidHandler());
  };
  useEffect(() => {
    const handleAuthChange = async () => {
      if (auth.user.role === USERS_ROLE.ADMIN) {
        navigate('/admin');
      } else if (auth.user.role === USERS_ROLE.USER) {
        navigate('/user');
      } 
    };
    if (auth.isAuthorization) {
      handleAuthChange();
    }
  }, [auth.user]);
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (signIn.formValid === true) {
        const data = {
          email: signIn.email,
          password: signIn.password,
        };
        await dispatch(signInRequest(data)).unwrap();
        dispatch(snackBarActions.successHandler('Successfully Logged In'));
      }
    } catch (error) {
      dispatch(snackBarActions.errorHandler(error.message));
    }
  };
  console.log(auth);
  return (
    <Container>
      <Box
        onSubmit={submitHandler}
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{
            width: '93%',
            marginTop: '20px',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: `${signIn.emailValid === false ? 'red' : 'green'}`,
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused ': {
                color: `${signIn.emailValid === false ? 'red' : 'green'}`,
              },
            },
          }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={signIn.email}
          onChange={getEmailHandler}
          type="email"
        />
        <TextField
          sx={{
            width: '93%',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: `${
                  signIn.passwordValid === false ? 'red' : 'green'
                }`,
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused ': {
                color: `${signIn.passwordValid === false ? 'red' : 'green'}`,
              },
            },
          }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={signIn.password}
          onChange={getPasswordHandler}
          type="password"
        />

        <Button
          sx={{
            borderRadius: '30px',
            width: '120px',
            height: '46px',
            border: '1px solid #b1abab',
            background: 'white',
            color: 'grey',
            fontSize: '16px',
            textTransform: 'none',
            '&:active': {
              color: 'white',
              border: 'none',
            },
            '&:hover': {
              color: 'white',
              border: 'none',
            },
          }}
          variant="contained"
          onClick={submitHandler}
        >
          Sign In
        </Button>
        <StyledLink to="/signup">Create an account?</StyledLink>
      </Box>
    </Container>
  );
};
export default SignIn;
const Container = styled.div`
  background-color: white;
  width: 30%;
  height: 30vh;
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 10px;
`;
const StyledLink = styled(Link)`
  color: #b1abab;
  margin-bottom: 30px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #1976d2;
  }

  &:active {
    outline: none;
    text-decoration: underline;
    color: #1976d2;
  }
`;
