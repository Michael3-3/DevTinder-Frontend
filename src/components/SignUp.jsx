import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { login } from '../utils/userSlice';
import { BaseUrl } from '../utils/statics';
import { useNavigate} from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BaseUrl+"/signup",
        {firstName,lastName, email, password },
        { withCredentials: true }
      );

      if(res){
      await axios.post(BaseUrl+"/login",{email,password},{withCredentials:true});

      // ✅ Fix: Axios response data is in res.data
      dispatch(login(res.data.resUser));
      setError(null); // Clear any previous error
      console.log("Sign Up successful", res.data);
      navigate("/profile",{replace:true});
      }

    } catch (err) {
      console.log(err)
      if(err.response.data.error.code===11000){
        setError("Email already exists");

      }
      setError(err.response?.data?.error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="text-3xl font-bold font-mono flex justify-center">Sign Up</div>
            <fieldset className="fieldset">
              <label className="label">First Name</label>
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="label">Last Name</label>
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className='text-red-500 text-sm text-center mt-2'>{error}</p>}
              
              <button className="btn btn-neutral mt-4" onClick={handleSignUp}>Sign Up</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
