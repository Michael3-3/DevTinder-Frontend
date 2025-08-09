import React, { useState } from 'react'
import axios from 'axios';
const Login = () => {
    // This component renders a simple login form
    // You can add state management and form submission logic as needed
    const [email, setEmail] = useState('mikhel@gmail.com');
    const [password, setPassword] = useState('Pass@1234');

    // Handle form submission
    const handleLogin = async ()=>{

        try{
        await axios.post("http://localhost:3001/login",{
            email: email,
            password: password
        }, { withCredentials: true })
    }
        catch(err){
            console.error("Login failed", err);
        }
        
    }

  return (
   <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
    <div className="text-3xl font-bold font-mono flex justify-center">Login</div>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div><a className="link link-hover" >  Forgot password?</a></div>
          <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
        </fieldset>
      </div>
    </div>
  </div>
</div>
  )
}

export default Login