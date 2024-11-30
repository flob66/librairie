import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './login/login';
import SignUp from './signup/SignUp';
import AdminPage from './admin/AdminPage';
import UserPage from './user/UserPage';

interface User {
  username: string;
  password: string;
}

interface Book {
  id: number;
  titre: string;
  auteur: string;
  description: string;
  maisonEdition: string;
  stock: number;
  creator: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des livres:', error));
  }, []);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn ? (
          showSignUp ? (
            <SignUp
              onSignUp={(newUser) => {
                axios.post('http://localhost:5000/users', newUser)
                  .then(() => handleLogin(newUser.username))
                  .catch((error) => console.error('Erreur lors de l\'ajout de l\'utilisateur:', error));
              }}
              onSwitchToLogin={() => setShowSignUp(false)}
            />
          ) : (
            <Login
              onLogin={(user) => handleLogin(user)}
              onSwitchToSignUp={() => setShowSignUp(true)}
            />
          )
        ) : (
          <div>
            {currentUser === 'admin' ? (
              <AdminPage books={books} setBooks={setBooks} currentUser={currentUser} />
            ) : (
              <UserPage username={currentUser} books={books} setBooks={setBooks} />
            )}
            <button onClick={() => setIsLoggedIn(false)}>Déconnexion</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
