import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
  onSwitchToSignUp: () => void;
  users: { username: string; password: string }[];
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignUp, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Check for admin login
    if (username === 'admin' && password === 'admin1') {
      onLogin('admin');
      return;
    }

    // Check for other users
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      onLogin(username);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="#" onClick={onSwitchToSignUp}>Sign Up</a></p>
    </div>
  );
};

export default Login;
