import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  titre: string;
  auteur: string;
  description: string;
  maisonEdition: string;
  stock: number;
  creator: string;
}

interface UserPageProps {
  username: string | null;
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const UserPage: React.FC<UserPageProps> = ({ username }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des livres :', error));
  }, []);

  const handleBorrowBook = (book: Book) => {
    if (book.stock > 0) {
      setBorrowedBooks([...borrowedBooks, book]);
      updateStock(book.id, book.stock - 1);
    }
  };

  const handleReturnBook = (book: Book) => {
    setBorrowedBooks(borrowedBooks.filter((b) => b.id !== book.id));
    updateStock(book.id, book.stock + 1);
  };

  const updateStock = (id: number, newStock: number) => {
    axios.put(`http://localhost:5000/books/${id}`, { ...books.find((b) => b.id === id), stock: newStock })
      .then(() => fetchBooks())
      .catch((error) => console.error('Erreur lors de la mise à jour du stock :', error));
  };

  const fetchBooks = () => {
    axios.get('http://localhost:5000/books')
      .then((response) => setBooks(response.data));
  };

  return (
    <div>
      <h1>Bienvenue, {username} !</h1>
      <h2>Livres disponibles :</h2>
      {books.map((book) => (
        <div key={book.id}>
          <h4>{book.titre}</h4>
          <p><strong>Auteur :</strong> {book.auteur}</p>
          <p><strong>Stock :</strong> {book.stock}</p>
          <button onClick={() => handleBorrowBook(book)} disabled={book.stock === 0}>
            {book.stock === 0 ? 'Rupture de stock' : 'Emprunter'}
          </button>
          <hr />
        </div>
      ))}

      <h2>Vos livres empruntés :</h2>
      {borrowedBooks.map((book) => (
        <div key={book.id}>
          <h4>{book.titre}</h4>
          <button onClick={() => handleReturnBook(book)}>Retourner</button>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
