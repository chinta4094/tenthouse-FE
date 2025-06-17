import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Signup.css'
import '../css/CustomerForm.css'

function Signup() {
    let navigator = useNavigate()
    let [data, setData] = useState({
        email: '',
        phoneNumber: '',
        companyName: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('')

    const { email, phoneNumber, companyName, password, confirmPassword } = data
    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        const newErrors = {};
        if (!data.email.includes('@')) {
        newErrors.email = 'Please provide a valid email';
        }
        if (data.password !== data.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password & Password do not match';
        }
        if (data.phoneNumber.length !== 10 || isNaN(data.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        } 
        if (data.companyName.length < 3) {
            newErrors.companyName = 'Company Name must be at least 3 characters';
        }
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }
        const userPayload = {
            email: data.email,
            phoneNumber: data.phoneNumber,
            companyName: data.companyName,
            password: data.password
        }
        await fetch('http://localhost:3001/api/user/register', {
            method: 'POST',
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(userPayload)
        }).then((response) => {
            return response.json()
        }).then(() => {
            navigator('/signin')
        }).catch((err) => {
            console.error('Error during registration:', err);
            alert('Registration failed. Please try again.');
        }
        );
    }

    useEffect(() => {
        const getToken = localStorage.getItem('token')
        if (getToken) {
            navigator('/dashboard')
        } 
    }, [])

    return (
        <form className='si-form' onSubmit={submitHandler}>
            <div className='si-heading'>
                <h2>SIGN UP</h2>
            </div>
            <div className='si-fields'>
                <div className='si-fields-set'>
                    <p className='si-label'>Email : </p>
                    <input className='si-input' autoComplete="off" onChange={handleInput} value={email} name='email'></input>
                </div>
                <div className='si-fields-set'>
                    <p className='si-label'>Phone Number : </p>
                    <input className='si-input' autoComplete="off" onChange={handleInput} value={phoneNumber} name='phoneNumber'></input>
                    <span>{error.phoneNumber && <p style={{fontSize: '11px', color: 'red', maxWidth: '300px', marginLeft: '10px', marginTop: '2px'}}>{error.phoneNumber}</p>}</span>
                </div>
                <div className='si-fields-set'>
                    <p className='si-label'>Password : </p>
                    <input className='si-input' autoComplete="off" onChange={handleInput} value={password} name='password' type='password'></input>
                </div>
                <div className='si-fields-set'>
                    <p className='si-label'>Confirm Password : </p>
                    <input className='si-input' autoComplete="off" onChange={handleInput} value={confirmPassword} name='confirmPassword' type='password'></input>
                    <span>{error.confirmPassword && <p style={{fontSize: '11px', color: 'red', maxWidth: '300px', marginLeft: '10px', marginTop: '2px'}}>{error.confirmPassword}</p>}</span>
                </div>
                <div>
                    <p className='si-label'>Company Name : </p>
                    <input className='si-input' autoComplete="off" onChange={handleInput} value={companyName} name='companyName'></input>
                </div>
            </div>

            <div className='si-exceptions'>
                <div className='si-new-user'>
                    <span className='si-new-user-text' onClick={() => {
                        navigator('/signin')
                    }}>Already have an account? Sign In</span>
                </div>
            </div>
            <div className='si-footer'>
                <button className='si-submit' type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Signup 