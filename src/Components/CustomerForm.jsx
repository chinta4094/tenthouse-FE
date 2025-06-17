// create a form for tent house, make user fill the form and submit the form


import '../css/CustomerForm.css'
import React, { useState, useContext, useEffect } from 'react'
import '../css/ThemeButton.css'
import { UserContext } from '../App'
import { CustomerContext } from '../Dashboard'

function CustomerForm({ handleCurrentPage }) {
    const { loggedInUser } = useContext(UserContext)
    const { customerId, customerData, setCustomerData, customerAddress, setCustomerAddress } = useContext(CustomerContext)
    const [error, setError] = useState('')

    const handleInput = (event) => {
        const { name, value } = event.target
        setCustomerData({ ...customerData, [name]: value })
    }

    const handleCustomerAddressInput = (event) => {
        const { name, value } = event.target
        setCustomerAddress({ ...customerAddress, [name]: value})
    }
    
    const validate = () => {
    const newErrors = {};
    if (!customerData.email.includes('@')) {
      newErrors.email = 'Please provide a valid email';
    }
    if (customerData.name.length <= 2) {
      newErrors.name = 'Name must be at least 3 characters';
    }
     if(customerData?.phoneNumber?.length !== 10 || isNaN(customerData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    return newErrors;
    };

    const nextPage = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            handleCreateCustomerApi()
            handleCurrentPage('Items');
        } else {
            setError(validationErrors);
        }
    };

    const handleCreateCustomerApi = async () => {
        const url = customerId ? `http://localhost:3001/api/user/${loggedInUser}/customer/${customerId}` : `http://localhost:3001/api/user/${loggedInUser}/customer`;
        const method = customerId ? 'PUT' : 'POST'; 
        const { address, ...customerDetailswithoutAddress } = customerData
        console.log(customerDetailswithoutAddress)
        const customerDetails = {
            customerDetailswithoutAddress,
            customerAddress
        }
        await fetch(url, {
            method: method,
            headers: { "Content-Type": "Application/json", 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(customerDetails)
        }).then((response) => {
            return response.json();
        }).then(() => {
            alert('Form Submitted');
        });
    }

    useEffect(() => {
        console.log(customerData, customerAddress)
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/user/${loggedInUser}/customer/${customerId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    localStorage.removeItem('loggedInUser')
                    localStorage.removeItem('token');
                    throw new Error(response.message);
                }
                const { status, data } = await response.json();
                if (status === 'success') {
                    setCustomerData(data?.customerData);
                    setCustomerAddress(data?.customerAddress)
                } else {
                    console.error('Failed to fetch user details:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        if (loggedInUser && customerId ) {
            fetchUserDetails();
        }
    }, [loggedInUser, customerId])

    return (
        <form onSubmit={nextPage}>
            <div style={{ float: 'left', maxHeight: '400px', overflowY: 'auto'}}>
                <div className='th-fields'>
                    <div className='th-fields-set'>
                        <p className='th-label'>* Name : </p>
                        <input className='th-input' autoComplete="off" onChange={handleInput} value={customerData?.name} name='name'></input>
                        <span >{error.name && <p style={{fontSize: '11px', color: 'red', maxWidth: '200px', marginLeft: '10px', marginTop: '2px'}}>{error.name}</p>}</span>
                    </div>
                    <div className='th-fields-set'>
                        <p className='th-label'>* Email : </p>
                        <input className='th-input' autoComplete="off" onChange={handleInput} value={customerData?.email} name='email'></input>
                        <span>{error.email && <p style={{fontSize: '11px', color: 'red', maxWidth: '200px', marginLeft: '10px', marginTop: '2px'}}>{error.email}</p>}</span>
                    </div>
                    <div className='th-fields-set'>
                        <p className='th-label'>* Phone : </p>
                        <input className='th-input' autoComplete="off" onChange={handleInput} value={customerData?.phoneNumber} name='phoneNumber'></input>
                        <span>{error.phoneNumber && <p style={{fontSize: '11px', color: 'red', maxWidth: '200px', marginLeft: '10px', marginTop: '2px'}}>{error.phoneNumber}</p>}</span>
                    </div>
                    <div className='th-fields-set'>
                        <p className='th-label'>Street : </p>
                        <input className='th-input' autoComplete="off" onChange={handleCustomerAddressInput} value={customerAddress?.street} name='street'></input>
                    </div>
                    <div className='th-fields-set'>
                        <p className='th-label'>City : </p>
                        <input className='th-input' autoComplete="off" onChange={handleCustomerAddressInput} value={customerAddress?.city} name='city'></input>
                    </div>
                    <div className='th-fields-set'>
                        <p className='th-label'>State : </p>
                        <input className='th-input' autoComplete="off" onChange={handleCustomerAddressInput} value={customerAddress?.state} name='state'></input>
                    </div>
                    <div className='th-fields-set'>
                        <p className='th-label'>Country : </p>
                        <input className='th-input' autoComplete="off" onChange={handleCustomerAddressInput} value={customerAddress?.country} name='country'></input>
                    </div>
                    <div className='th-fields-set'>
                        <p className='th-label'>Pincode : </p>
                        <input className='th-input' autoComplete="off" onChange={handleCustomerAddressInput} value={customerAddress?.pincode} name='pincode'></input>
                    </div>
                    <div className='th-fields-set'>
                        <p className='th-label'>Date : </p>
                        <input type='date' className='th-input' autoComplete="off" onChange={handleInput} value={customerData?.date} name='date'></input>
                    </div>
                    <div className='th-fields-set'>
                        <p className='th-label'>Time : </p>
                        <input type='time' className='th-input' autoComplete="off" onChange={handleInput} value={customerData?.time} name='time'></input>
                    </div>
                </div>
            </div>
            <div className='form-footer'>
                <button className='form-submit' type='submit'>Save & Continue</button>
            </div>
        </form>
    )
}

export default CustomerForm;