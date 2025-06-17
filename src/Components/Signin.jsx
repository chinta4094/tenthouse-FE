import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import '../css/Signup.css'


const Signin = ({ handleLoggedInUser }) => {
    const navigator = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        companyName: ''
    })

    const [company, setCompany] = useState([])
    const [error, setError] = useState('')


    const { email, password, companyName } = userData
    const handleInput = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        const fetchCompanyName = async () => {
            const response = await fetch('http://localhost:3001/api/company');
            const { status, data } = await response.json();
            if (status === 'success') {
                setCompany(data);
                setUserData((prev) => ({ ...prev, companyName: data[0]?.name }));
            } else {
                console.error('Failed to fetch company name:', data.message);
            }
        }
        fetchCompanyName();
    }, []);

    useEffect(() => {
        const getToken = localStorage.getItem('token')
        if (getToken) {
            navigator('/dashboard')
            return
        } 
    }, [])

    const validationErrors = () => {
        const newErrors = {};
        if (!userData.email.includes('@')) {
            newErrors.email = 'Please provide a valid email';
        }
        if (userData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        if (!userData.companyName) {
            newErrors.companyName = 'Please select a company';
        }
        return newErrors;
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        const errors = validationErrors();
        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }
        const response = await fetch('http://localhost:3001/api/user/login', {
            method: 'POST',
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(userData)
        });
        const body = await response.json()
        if (body.status === 'success' || body.statusCode === 200) {
            localStorage.setItem('loggedInUser', body.data?.id);
            localStorage.setItem('token', body.data?.token);
            handleLoggedInUser(body.data?.id);
            navigator('/dashboard')
        } else {
            const newErrors = {};
            newErrors.message = 'Login failed. Please check your credentials.';
            setError(newErrors);
        }
    }
    return (
        <form className='si-form' onSubmit={submitHandler}>
            <div className='si-heading'>
                <h2>SIGN IN</h2>
            </div>
            <div className='si-fields'>
                <div className='si-fields-set'>
                    <p className='si-label'>Email : </p>
                    <input className='si-input' autocomplete="off" onChange={handleInput} value={email} name='email'></input>
                    <span>{error.email && <p style={{fontSize: '11px', color: 'red', maxWidth: '250px', marginLeft: '10px', marginTop: '2px'}}>{error.email}</p>}</span>
                </div>
                <div className='si-fields-set'>
                    <p className='si-label'>Password : </p>
                    <input className='si-input' autocomplete="off" onChange={handleInput} value={password} name='password'></input>
                    <span>{error.password && <p style={{fontSize: '11px', color: 'red', maxWidth: '250px', marginLeft: '10px', marginTop: '2px'}}>{error.password}</p>}</span>
                </div>
                <div className='si-fields-set'>
                    <p className='si-label'>Company Name : </p>
                    <select className='si-input' name='companyName' value={companyName} onChange={handleInput}>
                        { company?.length > 0 && company.map((comp, index) => (
                            <option key={index} value={comp.name}>{comp.name}</option>
                        ))}
                    </select>
                    <span>{error.companyName && <p style={{fontSize: '11px', color: 'red', maxWidth: '250px', marginLeft: '10px', marginTop: '2px'}}>{error.companyName}</p>}</span>
                </div>
            </div>
            <div className='si-exceptions'>
                <span>{error.message ? <p style={{fontSize: '11px', color: 'red', maxWidth: '300px', marginLeft: '10px', marginTop: '2px'}}>{error.message}</p> : null}</span>
            </div>
            <div className='si-exceptions'>
                <div className='si-new-user'>
                    <span className='si-new-user-text' onClick={() => navigator('/signup')}>New User? Sign Up</span>
                </div>
                <p style={{ paddingLeft: '5px'}}>|</p>
                <div className='si-forgot-password'>
                    <span className='si-forgot-password-text' onClick={() => navigator('/signup')}>Forgot Password? Reset</span>
                </div>
            </div>
            <div className='si-footer'>
                <button className='si-submit' type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Signin 