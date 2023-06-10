import React from 'react'
import { useSelector } from 'react-redux'
import AdminContainer from '../components/admin/AdminContainer'
import AdminModal from '../components/admin/AdminModal'
import FoodsModal from '../components/admin/foods/FoodsModal'

const AdminLayout = () => {
  const { open } = useSelector((state) => state.adminModal) 
  const foods = useSelector((state) => state.foods) 
  


  return (
    <>
      <AdminContainer />
      {open && <AdminModal />}
      {foods.open && <FoodsModal/>}
    </>
  )
}

export default AdminLayout
