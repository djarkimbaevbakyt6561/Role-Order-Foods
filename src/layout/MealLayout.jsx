import React from 'react';
import { useSelector } from 'react-redux';
import MealSummary from '../components/guest-and-user/meal-summary/MealSummary';
import Meals from '../components/guest-and-user/meals/Meals';
import { USERS_ROLE } from '../constants';

const MealLayout = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <MealSummary />
      {auth.user.role === USERS_ROLE.USER && <Meals />}
    </>
  );
};

export default MealLayout;
