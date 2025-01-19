import React, { useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';

function Login() {

    const [logIn, setLogIn] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setLogIn(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        console.log(logIn)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        if (logIn.email && logIn.password) {

            try {
                const res = await axios.post('http://localhost:3000/api/auth/loginUser', logIn)
                toast.success(res.data.message)
                console.log(res.data)
                setLogIn({
                    email: "",
                    password: ""
                })
            } catch (err) {
                toast.error("user not registered")
            }
        } else {
            setError(true)
        }
    }
    return (
        <>
            <div className='max-w-screen-2xl container m-auto px-6 mt-10'>
                <div className="card bg-blue-300 w-full sm:w-96 mx-auto">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xl sm:text-2xl md:text-3xl">Login!</h2>
                        <input
                            type="email"
                            name='email'
                            value={logIn.email}
                            placeholder="Email..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error && logIn.email === "" ? "border border-red-500" : "border border-green-500"}`}
                        />
                        {error && logIn.email === "" ? <span className='text-red-500 text-start'>Email is required</span> : ""}
                        <input
                            type="password"
                            name='password'
                            value={logIn.password}
                            placeholder="Password..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error && logIn.password === "" ? "border border-red-500" : "border border-green-500"}`}
                        />
                        {error && logIn.password === "" ? <span className='text-red-500 text-start'>Password is required</span> : ""}
                        <div className="card-actions justify-center">
                            <button onClick={handleSubmit} className="btn w-full sm:w-80 glass bg-blue-200 hover:bg-pink-500">Login</button>
                        </div>
                        <div>Don't have an account?<span> Sign up</span></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

