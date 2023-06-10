import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UserLayout from '../layout/UserLayout';
import MealLayout from '../layout/MealLayout';
import GeneralLayout from '../layout/GeneralLayout';
import AdminLayout from '../layout/AdminLayout';
const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<GeneralLayout />}>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="user/" element={<UserLayout />}>
          <Route index element={<MealLayout />}></Route>
        </Route>
        <Route path='admin/' element={<AdminLayout />}></Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;
