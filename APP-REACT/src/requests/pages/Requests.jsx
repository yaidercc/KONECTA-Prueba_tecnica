import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navbar } from '../../ui/components/NavBar/NavBar'

export const Requests = () => {
  const { user, logout } = useContext(UserContext)
  return (
    <div>
      <Navbar nameUser={user.name} logout={logout}/>
    </div>
  )
}
