import { Button, TextField } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpActions } from '../components/store/sign/signUp';
import { USERS_ROLE } from '../constants';
import { fetchRequest } from '../components/lib/fetchAPI';
import { signUpRequest } from '../components/store/auth/authThunk';
import { snackBarActions } from '../components/store/snackBar';
const SignUp = () => {
  const signUp = useSelector((store) => store.signUp);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getNameHandler = (e) => {
    dispatch(signUpActions.getNameValue(e.target.value));
  };
  const getEmailHandler = (e) => {
    dispatch(signUpActions.emailValidHandler(e.target.value));
    dispatch(signUpActions.getEmailValue(e.target.value));
    dispatch(signUpActions.formValidHandler());
  };
  const getPasswordHandler = (e) => {
    dispatch(signUpActions.passwordValidHandler(e.target.value));
    dispatch(signUpActions.getPasswordValue(e.target.value));
    dispatch(signUpActions.formValidHandler());
  };
  const getConfirmPasswordHandler = (e) => {
    dispatch(signUpActions.getConfirmPasswordValue(e.target.value));
    dispatch(signUpActions.confirmPasswordValidHandler(e.target.value));
    dispatch(signUpActions.formValidHandler());
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (signUp.formValid === true) {
        const data = {
          name: signUp.name,
          email: signUp.email,
          password: signUp.password,
          role: USERS_ROLE.USER,
        };
        await dispatch(signUpRequest(data)).unwrap()
        dispatch(snackBarActions.successHandler('Successfully Logged In'));
        navigate("/signin")
      }
    } catch (error) {
      dispatch(snackBarActions.errorHandler(error.message));
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginTop: '30px',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{
            width: '93%',
          }}
          id="outlined-basic"
          value={signUp.name}
          onChange={getNameHandler}
          label="Name"
          variant="outlined"
          type="text"
        />
        <TextField
          sx={{
            width: '93%',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: `${signUp.emailValid === false ? 'red' : 'green'}`,
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused ': {
                color: `${signUp.emailValid === false ? 'red' : 'green'}`,
              },
            },
          }}
          id="outlined-basic"
          label="Email"
          value={signUp.email}
          onChange={getEmailHandler}
          variant="outlined"
          type="email"
        />
        <TextField
          sx={{
            width: '93%',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: `${
                  signUp.passwordValid === false ? 'red' : 'green'
                }`,
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused ': {
                color: `${signUp.passwordValid === false ? 'red' : 'green'}`,
              },
            },
          }}
          id="outlined-basic"
          label="Password"
          value={signUp.password}
          onChange={getPasswordHandler}
          variant="outlined"
          type="password"
        />

        <TextField
          sx={{
            width: '93%',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: `${
                  signUp.confirmPasswordValid === false ? 'red' : 'green'
                }`,
              },
            },
            '& .MuiInputLabel-root': {
              '&.Mui-focused ': {
                color: `${
                  signUp.confirmPasswordValid === false ? 'red' : 'green'
                }`,
              },
            },
          }}
          id="outlined-basic"
          label="Confirm password"
          variant="outlined"
          type="password"
          value={signUp.confirmPassword}
          onChange={getConfirmPasswordHandler}
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
          Sign Up
        </Button>
        <StyledLink to="/signin">Have an account</StyledLink>
      </Box>
    </Form>
  );
};
export default SignUp;
const Form = styled.form`
  background-color: rgb(255, 255, 255);
  width: 30%;
  height: 45.2vh;
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
