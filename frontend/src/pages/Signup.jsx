import React, {useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

function Signup() {
    
    const [signup, setSignup] = useState({
        name:"",
        email: "",
        password: "",
        confPassword:"",
        tc:false
    })
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        const{name,value,checked,type} = e.target;
        setSignup(prev => ({
            ...prev,
            [name]: type==='checkbox'? checked: value
        }))
        console.log(signup)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        if (signup.name && signup.email && signup.password && signup.confPassword && signup.tc) {

            try {
                const res = await axios.post('http://localhost:3000/api/auth/createUser', signup)
                toast.success(res.data.message)
                console.log(res.data)
                setSignup({
                    name:"",
                    email: "",
                    password: "",
                    confPassword:"",
                    tc:false
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
      <main>
        <section>
            <h1>Sign up page</h1>
            <div className='max-w-screen-2xl container m-auto px-6 mt-10'>
                <div className="card bg-blue-300 w-full sm:w-96 mx-auto">
                    <div className="card-body items-center text-center">

                    <input
                            type="text"
                            name='name'
                            value={signup.name}
                            placeholder="Name..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error && signup.email === "" ? "border border-red-500" : "border border-green-500"}`}
                        />
                        {error && signup.name === "" ? <span className='text-red-500 text-start'>Nmae is required</span> : ""}                        <input
                            type="email"
                            name='email'
                            value={signup.email}
                            placeholder="Email..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error && signup.email === "" ? "border border-red-500" : "border border-green-500"}`}
                        />
                        {error && signup.email === "" ? <span className='text-red-500 text-start'>Email is required</span> : ""}
                        <input
                            type="password"
                            name='password'
                            value={signup.password}
                            placeholder="Password..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error && signup.password === "" ? "border border-red-500" : "border border-green-500"}`}
                        />
                        {error && signup.password === "" ? <span className='text-red-500 text-start'>Password is required</span> : ""}
                        <input
                            type="password"
                            name='confPassword'
                            value={signup.confPassword}
                            placeholder="confPassword..."
                            onChange={handleChange}
                            className={`input w-full max-w-xs mb-4${error && signup.confPassword === "" ? "border border-red-500" : "border border-green-500"}`}
                        />
                        {error && signup.confPassword === "" ? <span className='text-red-500 text-start'>confPassword is required</span> : ""}
                        <input type='checkbox' name='tc' checked={signup.tc}  onChange={handleChange}/>
                        <div className="card-actions justify-center">
                            <button onClick={handleSubmit} className="btn w-full sm:w-80 glass bg-blue-200 hover:bg-pink-500">Sign up</button>
                        </div>
                        <div>Don't have an account?<span> Log in</span></div>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </>
  )
}

export default Signup;