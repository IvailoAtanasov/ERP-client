import React, { useEffect } from 'react'
import { AdminPage } from './AdminPage'
import Header from '../../components/Header'
import { useNavigate } from 'react-router'
import MiniDrawer from './Main'
import Orders from '../Orders/Orders.jsx'

export const HomePage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigate('/login')
        }
    }, [navigate])
    return (
        <div>

            {localStorage.getItem('userRole') === 'admin'
                ? <MiniDrawer />
                : <> <Header /> <Orders /> </> }

        </div>
    )
}
