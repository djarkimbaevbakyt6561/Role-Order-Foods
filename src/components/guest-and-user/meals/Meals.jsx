import styled from 'styled-components';
import MealsItem from './MealsItem';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMeals } from '../../store/user/meals/meals';

import { snackBarActions } from '../../store/snackBar';
import { Loading } from '../../UI/loading/Loading';
const Meals = React.memo(() => {
  const { meals, isLoading } = useSelector((state) => state.meals);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeals())
      .unwrap()
      .then(() => {
        dispatch(snackBarActions.successHandler('Successfully received foods'));
      })
      .catch((error) => {
        dispatch(snackBarActions.errorHandler(error));
      });
  }, []);

  return (
    <MealsList>
      {isLoading ? null : <Loading />}
      {meals?.map((el) => {
        return (
          <MealsItem
            price={el.price}
            title={el.title}
            description={el.description}
            key={el._id}
            id={el._id}
          />
        );
      })}
    </MealsList>
  );
});
export default Meals;
const MealsList = styled.ul`
  width: 50.4%;
  background: #ffffff;
  border-radius: 16px;
  padding-right: 40px;
`;
const Error = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
  font-size: 36px;
  color: #ff0000;
`;
