import React, { useState } from 'react';
import axios from 'axios';

import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = () => {
    // Simple email format check
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  const validatePassword = () => {
    // Simple password length check
    return password.length >= 6;
  };

  const validateConfirmPassword = () => {
    // Check if password and confirm password match
    return password === cpassword;
  };

  const handleRegister = async () => {
    setLoading(true);

    // Perform validation checks
    if (!validateEmail()) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    if (!validatePassword()) {
      setError('Password should be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (!validateConfirmPassword()) {
      setError('Password and confirm password do not match');
      setLoading(false);
      return;
    }

    const user = {
      name,
      email,
      password,
      cpassword,
    };

    try {
      const result = (await axios.post('/api/users/register', user)).data;
      console.log(result);
      setSuccess(result);
      setName('');
      setEmail('');
      setPassword('');
      setCpassword('');
    } catch (error) {
      console.log(error);
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div>
      {loading && <Loader />}
      {error.length > 0 && <Error msg={error} />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success.length > 0 && <Success msg={success} />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            {loading ? (
              <div>Registering... Please Wait...</div>
            ) : (
              <button
                className="btn btn-primary mt-3"
                onClick={handleRegister}
                disabled={
                  !validateEmail() ||
                  !validatePassword() ||
                  !validateConfirmPassword() ||
                  loading
                }
              >
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
