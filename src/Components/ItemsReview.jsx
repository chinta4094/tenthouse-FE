import React, { useContext, useEffect } from 'react'
import { CustomerContext } from '../Dashboard'
import { UserContext } from '../App'
import Timer from './Timer'
import ThemeButton from './ThemeButton'
import  '../css/CustomerForm.css'
import { constantItemData } from '../../utils/constant'

export default function ItemsReview({ handleCurrentPage }) {
    const { reviewData, customerId, editScreen, customerData, setCustomerData, customerAddress, setCustomerAddress, itemDetails, setItemDetails } = useContext(CustomerContext)
    const { loggedInUser } = useContext(UserContext)

    const handleSubmit = () => {
        console.log(itemDetails, itemDetails.length, typeof itemDetails);
    }

    useEffect(() => {
        console.log(itemDetails)
        const fetchCustomerDetailsById = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/${loggedInUser}/customer/${customerId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const { status, data } = await response.json();
                if (status === 'success') {
                    console.log(data)
                    setCustomerData(data?.customerData);
                    setCustomerAddress(data?.customerAddress)
                    setItemDetails(itemDetails);
                } else {
                    console.error('Failed to fetch user details:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
        if (loggedInUser && customerId) {
            fetchCustomerDetailsById();
        } else {
            setCustomerData(customerData);
            setItemDetails(itemDetails);
        }
    }, [customerId, loggedInUser]);

    return (
        <div >
            <div style={{ float: 'left', maxHeight: '400px', overflowY: 'auto', border: '1px solid', borderRadius: '15px'}}>
                <div style={{ padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'center', width: '1200px' }}>
                    <div style={{ padding: '10px', overflow: 'hidden', width: '450px', height: '330px', marginTop: '20px'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '250px'}}>
                            <span className='th-label-heading'>User Details : </span>
                            {editScreen && <div className='form-submit' style={{ padding: '5px 10px'}} onClick={() => handleCurrentPage('Customer Form')}>Edit</div>}
                        </div>
                        <div style={{ margin: '30px 0px 10px 30px'}}>
                            <div className='item-review-user'><span className='item-review-user-details'>Name</span> : {customerData?.name ? customerData.name : 'N/A'}</div>
                            <div className='item-review-user'><span className='item-review-user-details'>Email</span> : {customerData?.email ? customerData.email : '-'}</div>
                            <div className='item-review-user'><span className='item-review-user-details'>Phone Number</span> : {customerData?.phoneNumber ? customerData.phoneNumber : '-'}</div>
                            <div className='item-review-user'><span className='item-review-user-details'>Street</span> : {customerAddress?.street ? customerAddress.street : 'N/A'}</div>
                            <div className='item-review-user'><span className='item-review-user-details'>City</span> : {customerAddress?.city ? customerAddress.city : 'N/A'}</div>
                            <div className='item-review-user'><span className='item-review-user-details'>State</span> : {customerAddress?.state ? customerAddress.state : 'N/A'}</div>
                            <div className='item-review-user'><span className='item-review-user-details'>Country</span> : {customerAddress?.country ? customerAddress.country : 'N/A'}</div>
                            <div className='item-review-user'><span className='item-review-user-details'>Pincode</span> : {customerAddress?.pincode ? customerAddress.pincode : 'N/A'}</div>
                            <div className='item-review-user'><span className='item-review-user-details'>Date</span> : {customerData?.date ? customerData.date : 'N/A'}</div>
                        </div>
                    </div>
                    <div style={{ padding: '10px', borderLeft: '1px solid', margin: '20px auto'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '250px'}}>
                            <span className='th-label-heading'>Items Details : </span>
                            {editScreen && <div className='form-submit' style={{ padding: '5px 10px'}} onClick={() => handleCurrentPage('Items')}>Edit</div>}
                        </div>

                        <div style={{ margin: '30px 0px 10px 30px'}}>
                            <div className='item-review'><span className='item-review-user-details'>Tent </span> : {itemDetails.tentDetails.tentName} - {itemDetails.tentDetails.tentSize}  <span style={{float: 'right', width: '40px', marginLeft: '10px', textAlign: 'right'}}> {250}</span> <span style={{float: 'right', border: '10px', marginLeft: '20px'}}> =  </span></div>
                            <div className='item-review'><span className='item-review-user-details'>Chair </span> : {itemDetails.chairDetails.chairName} - {itemDetails.chairDetails.chairCount} <span style={{float: 'right', width: '40px', marginLeft: '10px', textAlign: 'right'}}>{itemDetails.chairDetails.chairCount * 5}</span> <span style={{float: 'right', border: '10px', marginLeft: '20px'}}> =  </span> </div>
                            <div className='item-review'><span className='item-review-user-details'>Table </span> : {itemDetails.tableDetails.tableName} - {itemDetails.tableDetails.tableCount} <span style={{float: 'right', width: '40px', marginLeft: '10px', textAlign: 'right'}}>{itemDetails.tableDetails.tableCount * 50}</span> <span style={{float: 'right', border: '10px', marginLeft: '20px'}}> =  </span></div>
                        </div>  
                    </div>
                </div>
            </div>
            <div className='form-footer'>
                {!editScreen && <p className='form-submit' onClick={() => handleCurrentPage('Items')}>Previous</p>}
                <p className='form-submit' onClick={handleSubmit}>Check Out</p>
            </div>
        </div>
    );
}