import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import './Dashboard.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await Auth.currentUserInfo();
        setUser(userInfo);

        const storedAvatar = localStorage.getItem('avatar');
        if (storedAvatar) {
          setAvatar(storedAvatar);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  const handleAvatarSubmit = () => {
    if (avatarFile) {
      // Save avatar URL to local storage
      localStorage.setItem('avatar', avatar);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('New password and confirmation do not match');
      return;
    }

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(currentUser, currentPassword, newPassword);
      alert('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password. Please check your current password and try again.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-container">
      <h1>User Account</h1>
      <div className="account-details">
        {avatar && (
          <div className="avatar-preview">
            <img src={avatar} alt="User avatar" />
          </div>
        )}
        <div className="text-holder">
          <label>Username:</label>
          <input type="text" readOnly value={user.username} />
        </div>
        <div className="text-holder">
          <label>Email:</label>
          <input type="text" readOnly value={user.attributes.email} />
        </div>
        <div className="avatar-section">
          <label>Avatar:</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
        <button onClick={handleAvatarSubmit}>Submit Avatar</button>
        <div className="text-holder">
          <label>Current Password:</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className="text-holder">
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="text-holder">
          <label>Confirm New Password:</label>
          <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
        </div>
        <button onClick={handleChangePassword}>Update Password</button>
      </div>
    </div>
  );
};

export default Account;

       
