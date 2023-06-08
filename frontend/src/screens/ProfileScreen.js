import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function UpdateProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const updateProfileHandler = async () => {
    try {
      const updatedUser = await axios.post(
        'http://localhost:5000/updateprofile',
        {
          name,
          email,
          userId: user._id,
        }
      );
      localStorage.setItem('currentUser', JSON.stringify(updatedUser.data));
      window.location.href = '/profile';
    } catch (error) {
      console.log(error);
      alert('Error updating profile');
    }
  };

  return (
    <div className="ml-3 mt-3">
      <h1>Update Profile</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={updateProfileHandler}>Update</button>
    </div>
  );
}

export default UpdateProfileScreen;
