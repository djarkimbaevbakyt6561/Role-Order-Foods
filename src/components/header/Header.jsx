import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { USERS_ROLE } from '../../constants';
import { authActions } from '../store/auth/authSlice';
import { getBasket } from '../store/user/basket/basket';
import { Loading } from '../UI/loading/Loading';
import OrderBasket from './OrderBasket';
const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.user.role !== USERS_ROLE.ADMIN) {
      dispatch(getBasket());
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('AuthLogin', JSON.stringify(auth));
  }, [auth]);
  function navigateToSignIn() {
    navigate('/signIn');
  }
  function logOutHandler() {
    dispatch(authActions.logOutHandler());
    navigate('/signIn');
  }
  return (
    <header style={{ width: '100%' }}>
      <Container>
        <ReactMeals>ReactMeals</ReactMeals>
        {auth.user.role !== USERS_ROLE.ADMIN ? (
          <OrderBasket>Your Cart</OrderBasket>
        ) : null}

        {auth.isLoading ? null : <Loading />}
        {auth.isAuthorization ? (
          <Button
            variant="contained"
            sx={{
              borderRadius: '30px',
              width: '160px',
              height: '59px',
              background: 'white',
              color: 'rgb(138, 43, 6)',
              fontSize: '20px',
              textTransform: 'none',
              '&:active': {
                background: 'rgb(90, 31, 8)',
                color: 'white',
                border: 'none',
              },
              '&:hover': {
                background: 'rgb(90, 31, 8)',
                color: 'white',
                border: 'none',
              },
            }}
            onClick={logOutHandler}
          >
            LogOut{' '}
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              borderRadius: '30px',
              width: '160px',
              height: '59px',
              background: 'white',
              color: 'rgb(138, 43, 6)',
              fontSize: '20px',
              textTransform: 'none',
              '&:active': {
                background: 'rgb(90, 31, 8)',
                color: 'white',
                border: 'none',
              },
              '&:hover': {
                background: 'rgb(90, 31, 8)',
                color: 'white',
                border: 'none',
              },
            }}
            onClick={navigateToSignIn}
          >
            Sign In{' '}
          </Button>
        )}
      </Container>
    </header>
  );
};
export default Header;
const Container = styled.div`
  height: 101px;
  background: #8a2b06;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 120px;
  font-family: 'Poppins';
`;
const ReactMeals = styled.h1`
  color: #ffffff;
  font-style: normal;
  font-weight: 600;
  line-height: 57px;
  margin: 0;
`;
