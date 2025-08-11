import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { login } from '../utils/userSlice';
import { BaseUrl } from '../utils/statics';

const Login = () => {
  const [email, setEmail] = useState('mikhel@gmail.com');
  const [password, setPassword] = useState('Pass@1234');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BaseUrl+"/login",
        { email, password },
        { withCredentials: true }

      );

      // ✅ Fix: Axios response data is in res.data
      dispatch(login(res.data.user));
      setError(null); // Clear any previous error
      console.log("Login successful", res.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="text-3xl font-bold font-mono flex justify-center">Login</div>
            <fieldset className="fieldset">
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
              {error &&     <p className='bg-error-content text-error rounded-sm p-0.5 text-center'>{error}</p>}
              <div><a className="link link-hover">Forgot password?</a></div>
              <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
