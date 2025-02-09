import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Signup() {

    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",
        confPassword: "",
        tc: false
    })
    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        confPassword: "",
        tc: false
    })

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setSignup(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        console.log(signup)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newErrors = {};
        //NAME ERRORS
        if (!signup.name) {
            newErrors.name = "Name is required!"
        }
        //EMAIL ERRORS
        if (!signup.email) {
            newErrors.email = "Email is required!"
        }
        //PASSWORD ERRORS
        if (!signup.password) {
            newErrors.password = "Password is required!"
        } else if (signup.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters!"
        } else if (signup.password.length > 12) {
            newErrors.password = "Password must be less than 12 characters!"
        } else if (!/[!@#$%^&*()<>,.]/.test(signup.password)) {
            newErrors.password = "Password must contain at least one special character!"
        } else if (!/[A-Z]/.test(signup.password)) {
            newErrors.password = "Password must contain one capital letter!"
        } 
        //CONF PASSWORD ERRORS
        if (!signup.confPassword) {
            newErrors.confPassword = "Confirm Password is required!"
        }
        //TC ERRORS
        if (signup.tc !== true) {
            newErrors.tc = "Terms & Conditions must be accepted!"
        }

        if (Object.keys(newErrors).length) {
            return setError(newErrors);
        }

        try {
            const res = await axios.post('http://localhost:3000/api/auth/createUser', signup)
            toast.success(res.data.message)
            console.log(res.data)

            setError({
                name: "",
                email: "",
                password: "",
                confPassword: "",
                tc: false
            })
            setSignup({
                name: "",
                email: "",
                password: "",
                confPassword: "",
                tc: false
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

                        <input
                            type="text"
                            name='name'
                            value={signup.name}
                            placeholder="Name..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error.name ? "border border-2 border-red-500" : "border border-2 border-green-500"}`}
                        />
                        {error.name && <span className='text-red-500 text-start'>{error.name}</span>}  <input
                            type="email"
                            name='email'
                            value={signup.email}
                            placeholder="Email..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error.email ? "border border-2 border-red-500" : "border border-2 border-green-500"}`}
                        />
                        {error.email && <span className='text-red-500 text-start'>{error.email}</span>}
                        <input
                            type="password"
                            name='password'
                            value={signup.password}
                            placeholder="Password..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error.password ? "border border-2 border-red-500" : "border border-2 border-green-500"}`}
                        />
                        {error.password && <span className='text-red-500 text-start'>{error.password}</span>}
                        <input
                            type="password"
                            name='confPassword'
                            value={signup.confPassword}
                            placeholder="confPassword..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error.confPassword ? "border border-2 border-red-500" : "border border-2 border-green-500"}`}
                        />
                        {error.confPassword && <span className='text-red-500 text-start'>{error.confPassword}</span>}
                        <input type='checkbox' name='tc' checked={signup.tc} onChange={handleChange} />
                        {error.tc && <span className='text-red-500 text-start'>{error.tc}</span>}
                        <div className="card-actions justify-center">
                            <button onClick={handleSubmit} className="btn w-full sm:w-80 glass bg-blue-200 hover:bg-pink-500">Sign up</button>
                        </div>
                        <div>Don't have an account?<Link to="/login"><span> Log in</span></Link></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Signup;