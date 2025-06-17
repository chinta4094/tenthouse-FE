import React from 'react';
import '../css/CustomerForm.css';
import { useNavigate } from 'react-router-dom';

const UserModule = ({companyName, handleCustomersList}) => {
  const navigator = useNavigate();

  return (
    <div className='si-form'>
        <div className='si-heading'>
            <h2>Hi {companyName}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
            <div className='form-footer'>
                <p className='form-submit' onClick={() => { 
                    handleCustomersList 
                    navigator('/dashboard')}}>Fetch All Customers List</p>
                <p className='form-submit' onClick={() => navigator('/dashboard')}>New Customer</p>
            </div>
        </div>
    </div>
  );
}

export default UserModule;  