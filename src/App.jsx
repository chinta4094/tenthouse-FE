'use client'
import { Routes, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import { createContext, useEffect, useState } from 'react'

import Signin from './Components/Signin'
import Signup from './Components/Signup'
import UserSelection from './Components/UserSelection'

export const UserContext = createContext()

function App() {
    // const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [loggedInUser, setLoggedInUser] = useState(null)

    const handleLoggedInUser = (user) => {
        setLoggedInUser(user)
        // setIsAuthenticated(true)
    }

    useEffect(() => {
        const userId = localStorage.getItem('loggedInUser')
        console.log('loggedInUser', userId)
        if (userId) {
            setLoggedInUser(userId)
        }
    }, [])

    return (
        <UserContext.Provider value={{ loggedInUser }}>
            <Routes>
                <Route path="/signin" element={<Signin handleLoggedInUser={handleLoggedInUser} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </UserContext.Provider>
    )
}

export default App
