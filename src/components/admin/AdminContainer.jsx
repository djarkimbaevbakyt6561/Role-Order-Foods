import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { adminModalActions } from '../store/admin/adminModal/adminModalSlice';
import { useDispatch } from 'react-redux';
import Foods from './foods/Foods';

const AdminContainer = () => {
  const dispatch = useDispatch();
  function openModal() {
    dispatch(adminModalActions.toggleModalHandler());
  }
  return (
    <Container>
      <Button
        variant="contained"
        sx={{
          borderRadius: '30px',
          width: '160px',
          height: '59px',
          background: 'rgb(138, 43, 6)',
          marginTop: '20px',
          color: 'white',
          fontSize: '20px',
          textTransform: 'none',
          '&:active': {
            background: 'white',
            color: 'rgb(90, 31, 8)',
            border: 'none',
          },
          '&:hover': {
            background: 'rgb(90, 31, 8)',
            color: 'white',
            border: 'none',
          },
        }}
        onClick={openModal}
      >
        Add Item
      </Button>
      <Foods />
    </Container>
  );
};

export default AdminContainer;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-color: white;
  width: 33%;
  border-radius: 10px;
  margin-bottom: 20px;
`;
