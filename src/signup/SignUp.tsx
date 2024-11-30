import React, { useState } from 'react';
import axios from 'axios';

interface SignUpProps {
  onSignUp: (newUser: { username: string; password: string }) => void;
  onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (username && password) {
      onSignUp({ username, password });
    } else {
      setError('Les deux champs sont requis');
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
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
      <button onClick={handleSignUp}>S'inscrire</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Déjà un compte ? <button onClick={onSwitchToLogin}>Connectez-vous</button></p>
    </div>
  );
};

export default SignUp;
