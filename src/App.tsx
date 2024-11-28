import React, { useState } from 'react';
import './App.css';
import Login from './login/login';
import SignUp from './signup/SignUp';

interface User {
  username: string;
  password: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleAddUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentUser(newUser.username);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn ? (
          showSignUp ? (
            <SignUp
              onSignUp={handleAddUser}
              onSwitchToLogin={() => setShowSignUp(false)}
              users={users}
            />
          ) : (
            <Login
              onLogin={(user) => {
                setCurrentUser(user);
                setIsLoggedIn(true);
              }}
              onSwitchToSignUp={() => setShowSignUp(true)}
              users={users}
            />
          )
        ) : (
          <div>
            <h1>Bonjour, {currentUser}!</h1>
            <button onClick={() => setIsLoggedIn(false)}>Se déconnecter</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
