import React from 'react'
import { TableUsers } from '../components/TableUsers'
import { ModalForm } from '../../ui/components/Modal/ModalForm'

export const Employees = () => {
  const handleDeleteEmployee = ( )=>{

  }
const handleUpdateEmployee = ( )=>{

}
  return (
    <div>
        <h2>Empleados</h2>
        <ModalForm />
        <hr />
        <TableUsers handleDeleteEmployee={handleDeleteEmployee}
handleUpdateEmployee={handleUpdateEmployee} />
    </div>
  )
}
