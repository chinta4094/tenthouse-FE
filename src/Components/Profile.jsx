import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerContext } from '../Dashboard';
import { constantAddressData, constantUserData } from '../../utils/constant';

const Profile = ({companyName, handleProfileClick, showPopup, theme, handleCurrentPage}) => {
    const navigate = useNavigate();
    const { setCustomerId, setCustomerData, setCustomerAddress } = useContext(CustomerContext);
    return (
        <div>
            <label className='profile' onClick={handleProfileClick}>{companyName ? companyName.split(' ')[0][0].toUpperCase() : ''}</label>

            {showPopup && (
            <div className={theme === 'Black' ? 'popup-box-white' : 'popup-box-black'}>
                <p className={theme === 'Black' ? 'popup-item-white' : 'popup-item-black'} onClick={() => {
                    setCustomerData(constantUserData); // Reset form data when navigating to new customer form
                    setCustomerAddress(constantAddressData)
                    setCustomerId(null); // Reset customer ID when navigating to new customer form
                    handleCurrentPage('Customer Form')
                    }}>New Customer</p>
                <p className={theme === 'Black' ? 'popup-item-white' : 'popup-item-black'} onClick={() => handleCurrentPage('All Customers List')}>Customers List</p>
                <p className={theme === 'Black' ? 'popup-item-white' : 'popup-item-black'}>Settings</p>
                <p className={theme === 'Black' ? 'popup-item-white' : 'popup-item-black'} onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('loggedInUser');
                    navigate('/signin');
                }}>Logout</p>
                {/* Add more content here */}
            </div>
            )}
        </div>
    )
}

export default Profile;