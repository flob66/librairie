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
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      onLogin(username);
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div>
      <h2>Se connecter</h2>
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
      <button onClick={handleLogin}>Se connecter</button>
      <p>Vous n'avez pas de compte ? <a href="#" onClick={onSwitchToSignUp}>S'inscrire</a></p>
    </div>
  );
};

export default Login;
