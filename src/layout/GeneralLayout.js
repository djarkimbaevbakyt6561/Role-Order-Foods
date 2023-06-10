import React from 'react'
import Header from '../components/header/Header';
import { useSelector } from 'react-redux';
import Modal from '../components/guest-and-user/modal/Modal';
import { Outlet } from 'react-router-dom';
const GeneralLayout = () => {
    const { open } = useSelector((state) => state.modal);
    return (
        <>
            <Header />
            <Outlet></Outlet>
            {open && <Modal />}
        </>
    )
}

export default GeneralLayout