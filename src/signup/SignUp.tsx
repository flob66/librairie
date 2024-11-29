import React, { useState } from 'react';

interface SignUpProps {
  onSignUp: (newUser: { username: string; password: string }) => void;
  onSwitchToLogin: () => void;
  users: { username: string; password: string }[];
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSwitchToLogin, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = () => {
    if (users.some((u) => u.username === username)) {
      setMessage("Le nom d'utilisateur existe déjà");
    } else {
      onSignUp({ username, password });
    }
  };

  return (
    <div>
      <h2>S'inscrire</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
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
      <button onClick={handleSignUp}>S'inscrire</button>
      <p>Déjà un compte ? <a href="#" onClick={onSwitchToLogin}>Se connecter</a></p>
    </div>
  );
};

export default SignUp;
