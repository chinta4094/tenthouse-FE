import React, { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../App';
import { CustomerContext } from '../Dashboard';
import { useNavigate } from 'react-router-dom';

const CustomersList = ({ handleCurrentPage }) => {
    const navigate = useNavigate();
    const { loggedInUser } = useContext(UserContext);
    const { setCustomerId, setEditScreen } = useContext(CustomerContext);

    const [customers, setCustomers] = React.useState([]);
    const [customerAddress, setCustomerAddress] = React.useState([])
    const [customerCount, setCustomerCount] = React.useState(0)
    const [pagination, setPagination] = React.useState(1);

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/api/user/${loggedInUser}/customer?page=${pagination}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if (!response.ok) {
                    localStorage.removeItem('loggedInUser')
                    localStorage.removeItem('token');
                    throw new Error(response.message);
                }
                const { data } = await response.json();
                setCustomers(data?.customerData);
                setCustomerAddress(data?.customerAddress);
                setCustomerCount(data?.count)
            } catch (error) {
                alert(`${error.message} - Redirecting to Signin`);
                navigate('/signin');
            } finally {
                console.log(customers.length)
                setLoading(false);
            }
        }
        if (loggedInUser) {
            fetchCustomers();
        }
    }, [loggedInUser, pagination]);

    const handlePagination = (direction) => {
        if (direction === 'next' && customerCount > pagination * 3) {
            setPagination(prev => prev + 1);
        } else if (direction === 'previous' && pagination > 1) {
            setPagination(prev => prev - 1);
        }
    }

    const handleCurrentCustomer = (customerId) => {
        setCustomerId(customerId);
        setEditScreen(true);
        handleCurrentPage('Items Review');
    }

    return(
        <div>
            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading...</p>
            ) : customerCount === 0 ? (
                <h2>No Customers To Show, Please Add Customer ... </h2>
            ) : (
                <>
                    <div style={{ overflow: 'hidden', marginTop: '20px', borderRadius: '15px', width: '1200px', height: '450px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', overflow: 'hidden', width: '1100px', maxHeight: '50px', marginLeft: '20px' }}>
                            <h2 style={{ marginLeft: '20px', float: 'left' }}>Customers List</h2>
                            <div style={{ marginLeft: '20px', float: 'right' }}>
                                <span style={{ fontWeight: 'bold' }}>Total Customers: </span>
                                <span>{customerCount}</span>
                            </div>
                        </div>
                        <div >
                            {customers?.map((customer, index) => (
                                <div key={index} style={{ border: '1px solid', padding: '10px', margin: '5px 0px 0px 20px', borderRadius: '10px', overflow: 'hidden', width: '1100px', height: '80px'}}>
                                    <h3>{customer?.name?.toUpperCase()}</h3>
                                    <div style={{ overflow: 'hidden', width: '100%', height: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ float: 'left' }}>
                                            <div className='item-review-user' style={{ float: 'left', maxWidth: '250px'}}><span className='item-review-user-details'>Email</span>: {customer?.email ? customer.email : 'N/A'}</div>
                                            <div className='item-review-user' style={{ float: 'left', maxWidth: '250px'}}><span className='item-review-user-details'>Street</span>: {customerAddress?.[index].street ? customerAddress[index].street : 'N/A'}</div>
                                            <div className='item-review-user' style={{ float: 'left', maxWidth: '250px'}}><span className='item-review-user-details'>Phone Number</span>: {customer?.phoneNumber ? customer.phoneNumber : 'N/A'}</div>
                                        </div>
                                        <div className='form-submit'>
                                            <p onClick={() => handleCurrentCustomer(customer.id)}>View/Edit</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {pagination > 1 && <div style={{ marginLeft: '40px', float: 'left', display: 'flex', justifyContent: 'space-between', width: '100px'}} >
                                <p style={{ width: '100px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(31, 65, 45)', color: 'white', borderRadius: '15px', cursor: 'pointer'}} onClick={() => handlePagination('previous')}>Previous</p>
                            </div>}
                            {customerCount > pagination * 3 && <div style={{ marginRight: '80px', float: 'right', display: 'flex', justifyContent: 'space-between', width: '100px'}}>
                                <p style={{ width: '100px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(31, 65, 45)', color: 'white', borderRadius: '15px', cursor: 'pointer'}} onClick={() => handlePagination('next')}>Next</p>
                            </div>}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CustomersList;