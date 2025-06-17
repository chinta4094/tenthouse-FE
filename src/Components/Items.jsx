

import { UserContext } from '../App';
import { CustomerContext, ThemeContext } from '../Dashboard';
import '../css/Items.css';
import React, { useContext, useEffect } from 'react';

const Item = ({ handleCurrentPage }) => {    

    const { itemDetails, setItemDetails, customerId } = useContext(CustomerContext);
    const { loggedInUser } = useContext(UserContext)

    const handleChange = (e, category) => {
        const { name, value } = e.target;
        setItemDetails(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [name]: value
            }
        }));
    };

    const handleSubmit = async () => {
        
        handleCurrentPage('Items Review');
        console.log('Item Details:', itemDetails);
        // const createUser = await axios.post('http://localhost:3001/api/user',
        //     payload, {
        //         headers: {
        //             "Content-Type": "Application/json"
        //         }
        //     }
        // );
        // if (createUser.status === 200 || createUser.status === 201) {
        //     handleCurrentPage('Items Review');
        //     setUser(constantUserData)
        // } else {
        //     alert('Error submitting form');
        // }
        console.log('Form submitted successfully', itemDetails);
    };

    return (
        <div>
            <div style={{ float: 'left', width: '100%', maxHeight: '400px', overflowY: 'auto'}}>
                <div className='th-fields'>
                    <div className='tent-details'>
                        <label className='th-label-heading'>Tent :</label>
                        <div className='th-fields-set'>
                            <p className='th-label'>Type : </p>
                            <select className='th-input' value={itemDetails.tentDetails.tentName} onChange={(e) => handleChange(e, 'tentDetails')} name='tentName'>
                                <option value=''>Select</option>
                                <option value='Water Proof'>Water Proof</option>
                                <option value='Cloth Proof'>Cloth Proof</option>
                            </select>
                        </div>
                        <div className='th-fields-set'>
                            <p className='th-label'>Size : </p>
                            <select className='th-input' value={itemDetails.tentDetails.tentSize} onChange={(e) => handleChange(e, 'tentDetails')} name='tentSize'>
                                <option value=''>Select</option>
                                <option value='TWP-S'>9 * 18</option>
                                <option value='TWP-L'>12 * 36</option>
                            </select>
                        </div>
                    </div>
                    <div className='chair-details'>
                        <label className='th-label-heading'>Chair :</label>
                        <div className='th-fields-set'>
                            <p className='th-label'>Type : </p>
                            <select className='th-input' value={itemDetails.chairDetails.chairName} onChange={(e) => handleChange(e, 'chairDetails')} name='chairName'>
                                <option value=''>Select</option>
                                <option value='CH'>Hand Chair</option>
                                <option value='C-HL'>Handless Chair</option>
                            </select>
                        </div>
                        <div className='th-fields-set'>
                            <p className='th-label'>No of chairs : </p>
                            <input className='th-input' value={itemDetails.chairDetails.chairCount} autoComplete='off' onChange={(e) => handleChange(e, 'chairDetails')} name='chairCount' />
                        </div>
                    </div>
                    <div className='table-details'>
                        <label className='th-label-heading'>Table :</label>
                        <div className='th-fields-set'>
                            <p className='th-label'>Type : </p>
                            <select className='th-input' value={itemDetails.tableDetails.tableName} onChange={(e) => handleChange(e, 'tableDetails')} name='tableName'>
                                <option value=''>Select</option>
                                <option value='ST'>Steel Tables</option>
                                <option value='IT'>Iron Tables</option>
                            </select>
                        </div>
                        <div className='th-fields-set'>
                            <p className='th-label'>No of Tables : </p>
                            <input className='th-input' value={itemDetails.tableDetails.tableCount} autoComplete='off' onChange={(e) => handleChange(e, 'tableDetails')} name='tableCount' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-footer'>
                <p className='form-submit' onClick={() => handleCurrentPage('Customer Form')}>Previous</p>
                <p className='form-submit' onClick={handleSubmit}>Save & Continue</p>
            </div>
        </div>
    );
};

export default Item;
