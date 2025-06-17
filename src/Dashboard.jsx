
import './Dashboard.css'
import React, { createContext, useContext } from 'react'
import { useState, useEffect } from 'react'
import { constantUserData, constantItemData, constantAddressData } from '../utils/constant'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './App'

import CustomerForm from './Components/CustomerForm'
import Items from './Components/Items'
import ItemsReview from './Components/ItemsReview'
import CustomersList from './Components/CustomersList'
import Profile from './Components/Profile'

import Timer from './Components/Timer'
import ThemeButton from './Components/ThemeButton'
import './Dashboard.css'

export const ThemeContext = createContext()
export const CustomerContext = createContext()

const Dashboard = () => {
    let navigate = useNavigate()
    const { loggedInUser } = useContext(UserContext)

    const [customerData, setCustomerData] = useState(constantUserData)
    const [itemDetails, setItemDetails] = useState(constantItemData);
    const [customerAddress, setCustomerAddress] = useState(constantAddressData)

    const [reviewData, setReviewData] = useState(null)
    const [companyName, setCompanyName] = useState('')
    const [customerId, setCustomerId] = useState(null)
    const [editScreen, setEditScreen] = useState(false)


    const [currentPage, setCurrentPage] = useState('All Customers List')
    const [theme, setTheme] = useState('Black')
    const [showPopup, setShowPopup] = useState(false)

    const handleProfileClick = () => {
        setShowPopup(!showPopup);
    };

    const handleCurrentPage = (page) => {
        setCurrentPage(page)
    }

    const handleThemeChange = () => {
        if (theme === 'Black') {
            setTheme('White')
        } else {
            setTheme('Black')
        }
    }
    // WFO - innovation - Board com
    useEffect(() => {
        const getToken = localStorage.getItem('token')
        if (!getToken) {
            navigate('/signin')
            return
        } 
        setReviewData({
            customerDetails: customerData,
            itemDetails: itemDetails
        })
    }, [])

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/${loggedInUser}`);
                const { status, data } = await response.json();
                if (status === 'success') {
                    setCompanyName(data.companyName);
                } else {
                    console.error('Failed to fetch user details:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
        if (loggedInUser) {
            fetchUserDetails();
        }
    }, [loggedInUser]);

    return (
        <ThemeContext.Provider value={{ theme, handleThemeChange }}>
            <CustomerContext.Provider value={{ reviewData, customerId, setCustomerId, customerData, setCustomerData, itemDetails, setItemDetails, customerAddress, setCustomerAddress, editScreen, setEditScreen}}>
            <div className={theme === "Black" ? 'dashboard-white' : 'dashboard-black'}>
                    <div className={theme === "Black" ? 'header-white' : 'header-black'}>
                        <label className='photo-dash'>Tent House</label>
                        <Profile companyName={companyName} handleProfileClick={handleProfileClick} showPopup={showPopup} theme={theme} handleCurrentPage={handleCurrentPage} />
                        <label className='company-name'>{companyName} Company</label>
                    </div>
                    <div style={{ overflow: 'hidden', width: '100%', height: '552px'}}>
                        <div style={{ margin: '10px 0px 10px 20px', overflow: 'hidden', float: 'left', width: '1300px', height: '510px', fontWeight: 'bold', border: '2px solid', padding: '10px', borderRadius: '15px'}}>
                            <div style={{ float: 'right', marginRight: '20px'}}><Timer /></div>
                            <ThemeButton />
                            <div style={{ margin: '10px 0px 10px 10px', padding: '10px', borderRadius: '5px'}}>
                                {currentPage === 'All Customers List' && <CustomersList handleCurrentPage={(page) => handleCurrentPage(page)} />}
                                {currentPage === 'Customer Form' && <CustomerForm handleCurrentPage={(page) => handleCurrentPage(page)} />}
                                {currentPage === 'Items' && <Items itemDetails={itemDetails} setItemDetails={setItemDetails} handleCurrentPage={(page) => handleCurrentPage(page)} />}
                                {currentPage === 'Items Review' && <ItemsReview handleCurrentPage={(page) => handleCurrentPage(page)} />}
                            </div>
                        </div>
                    </div>
                </div>
            </CustomerContext.Provider>
        </ThemeContext.Provider>
    )
}

export default Dashboard;