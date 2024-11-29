import React, { useState } from 'react';
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
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

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
            {currentUser === 'admin' ? (
              <AdminPage books={books} setBooks={setBooks} currentUser={currentUser} />
            ) : (
              <UserPage username={currentUser} books={books} setBooks={setBooks} />
            )}
            <button onClick={() => setIsLoggedIn(false)}>Se déconnecter</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
