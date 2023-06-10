import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import deleteIcon from '../../../assets/icons/delete-icon.png';
import editIcon from '../../../assets/icons/edit.png';
import { foodsActions } from '../../store/admin/foods/foodsSlice';
import { deleteFood, getFoodWithId } from '../../store/admin/foods/foodsThunk';
import { snackBarActions } from '../../store/snackBar';

const FoodsItem = ({ title, description, price, key, id }) => {
  const dispatch = useDispatch();
  async function deleteHandler() {
    try {
      await dispatch(deleteFood(id)).unwrap();
      dispatch(snackBarActions.successHandler('Successfully deleted'));
    } catch (error) {
      dispatch(snackBarActions.errorHandler(error));
    }
  }
  async function openModal() {
    try {
      dispatch(foodsActions.toggleModalHandler());
      await dispatch(getFoodWithId(id)).unwrap()
      dispatch(snackBarActions.successHandler('Successfully get food'));
    } catch (error) {
      dispatch(snackBarActions.errorHandler(error));
    }
  }
  return (
    <ListItem key={key}>
      <Container>
        <p>
          Title: <span>{title}</span>
        </p>
        <p>
          Description: <span>{description}</span>
        </p>
        <p>
          Price: <span>${price}</span>
        </p>
      </Container>
      <ImageContainer>
        <img src={deleteIcon} alt={deleteIcon} onClick={deleteHandler} />
        <img src={editIcon} alt={editIcon} onClick={openModal} />
      </ImageContainer>
    </ListItem>
  );
};
export default FoodsItem;
const ListItem = styled.li`
  list-style: none;
  width: 100%;
  margin-top: 20px;
  color: white;
  font-size: 20px;
  border-radius: 10px;
  background: rgb(138, 43, 6);
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-left: 20px;
  height: 12vh;
  p {
    margin: 0;
    span {
      color: antiquewhite;
      font-weight: 600;
    }
  }
`;
const ImageContainer = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  margin-right: 20px;
  justify-content: space-around;
  img {
    width: 40px;
    cursor: pointer;
  }
`;
