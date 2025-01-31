import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutPage from '../Layout/LayoutPage'
import Homepage from '../Homepage/Homepage'
import PrivateRoute from './PrivateRoute'

const MainRoutes = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute/>}>

                <Route path="/" element={<LayoutPage />} />
            </Route>

            <Route path='/Login' element={<Homepage />} />


        </Routes>
    )
}

export default MainRoutes
