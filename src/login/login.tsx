import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLogin: (user: string) => void;
  onSwitchToSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:5000/login', { username, password })
      .then((response) => {
        onLogin(username); 
      })
      .catch((err) => {
        setError(err.response.data.message || 'Identifiants invalides');
      });
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Se connecter</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Pas encore de compte ? <button onClick={onSwitchToSignUp}>S'inscrire</button></p>
    </div>
  );
};

export default Login;
