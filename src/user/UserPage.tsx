import React, { useState } from 'react';

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

const UserPage: React.FC<UserPageProps> = ({ username, books, setBooks }) => {
  const [userBooks, setUserBooks] = useState<Book[]>([]);

  const handleTakeBook = (book: Book) => {
    if (book.stock > 0) {
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === book.id ? { ...b, stock: b.stock - 1 } : b
        )
      );

      setUserBooks((prevUserBooks) => [...prevUserBooks, book]);
    } else {
      alert("Ce livre n'es plus disponible !");
    }
  };

 
  const handleReturnBook = (book: Book) => {

    setUserBooks((prevUserBooks) => prevUserBooks.filter((b) => b.id !== book.id));

    setBooks((prevBooks) =>
      prevBooks.map((b) =>
        b.id === book.id ? { ...b, stock: b.stock + 1 } : b
      )
    );
  };

  return (
    <div>
      <h1>Bonjour, {username}!</h1>

      <h2>Livres disponibles:</h2>
      {books.length === 0 ? (
        <p>Aucun livre disponible.</p>
      ) : (
        books.map((book) => (
          <div key={book.id}>
            <h4>{book.titre}</h4>
            <p><strong>Auteur:</strong> {book.auteur}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Maison d'édition:</strong> {book.maisonEdition}</p>
            <p><strong>Stock:</strong> {book.stock}</p>
            <button onClick={() => handleTakeBook(book)} disabled={book.stock === 0}>
              Emprunter le livre
            </button>
            <hr />
          </div>
        ))
      )}

      <h2>Tes livres empruntés:</h2>
      {userBooks.length === 0 ? (
        <p>Tu n'as emprunter aucun livre</p>
      ) : (
        userBooks.map((book) => (
          <div key={book.id}>
            <h4>{book.titre}</h4>
            <p><strong>Auteur:</strong> {book.auteur}</p>
            <button onClick={() => handleReturnBook(book)}>Retourner le livre</button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default UserPage;
