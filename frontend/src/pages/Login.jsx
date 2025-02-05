import React, { useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [logIn, setLogIn] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setLogIn(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        console.log(logIn)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newErrors = {};
        //EMAIL ERRORS
        if (!logIn.email) {
            newErrors.email = ("Email is required!")
        };

        //PASSWORD ERRORS
        if (!logIn.password) {
            newErrors.password = ("Password is required!")
        } else if (logIn.password.length < 8) {
            newErrors.password = ("Password must be at least 8 characters!")
        } else if (logIn.password.length > 12) {
            newErrors.password = ("Password must be less than 12 characters!")
        } else if (!/[@#$%^&*()<>,."]/.test(logIn.password)) {
            newErrors.password = ("Password must contain at least one special character!")
        } else if (!/[A-Z]/.test(logIn.password)) {
            newErrors.password = ("Password must contain one capital letter!")
        }

        if (Object.keys(newErrors).length) {
            return setError(newErrors);
        }
        try {
            setError({
                email: "",
                password: ""
            })
            const res = await axios.post('http://localhost:3000/api/auth/loginUser', logIn)
            toast.success(res.data.message)
            navigate("/")
            console.log(res.data)
            localStorage.setItem('token', JSON.stringify(res.data.token))
            setLogIn({
                email: "",
                password: ""
            })
        } catch (err) {
            toast.error("user not registered")
        }

    }

    return (
        <>
            <div className='max-w-screen-2xl container m-auto px-6 mt-10 h-screen'>
                <div className="card bg-blue-300 w-full sm:w-96 mx-auto">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xl sm:text-2xl md:text-3xl">Login!</h2>
                        <input
                            type="email"
                            name='email'
                            value={logIn.email}
                            placeholder="Email..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error.email? "border border-2 border-red-500" : "border border-2 border-green-500"}`}
                        />
                        {error.email && <span className='text-red-500 text-sm'>{error.email}</span>}
                        <input
                            type="password"
                            name='password'
                            value={logIn.password}
                            placeholder="Password..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error.password? "border border-2 border-red-500" : "border border-2 border-green-500"}`}
                        />
                        {error.password && <span className='text-red-500 text-sm'>{error.password}</span>}
                        <div className="card-actions justify-center">
                            <button onClick={handleSubmit} className="btn w-full sm:w-80 glass bg-blue-200 hover:bg-pink-500">Login</button>
                        </div>
                        <div>Don't have an account?<Link to="/signup"><span> Sign up</span></Link></div>
                        <Link to="/otp-reset"><h1 className='border rounded p-1 hover:bg-green-200'>Otp reset</h1></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

