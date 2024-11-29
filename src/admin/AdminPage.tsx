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

interface AdminPageProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  currentUser: string;
}

const AdminPage: React.FC<AdminPageProps> = ({ books, setBooks, currentUser }) => {
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    titre: '',
    auteur: '',
    description: '',
    maisonEdition: '',
    stock: 0,
    creator: currentUser,
  });
  const [editingBookId, setEditingBookId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSaveBook = () => {
    if (editingBookId !== null) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingBookId ? { ...newBook, id: editingBookId } : book
        )
      );
      setEditingBookId(null);
    } else {
      const newBookWithId = { ...newBook, id: Date.now() };
      setBooks((prevBooks) => [...prevBooks, newBookWithId]);
    }
    setNewBook({
      titre: '',
      auteur: '',
      description: '',
      maisonEdition: '',
      stock: 0,
      creator: currentUser,
    });
  };

  const handleDeleteBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleEditBook = (book: Book) => {
    setNewBook({ ...book });
    setEditingBookId(book.id);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Gérer les stocks de livres</h2>

      {}
      <div>
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          value={newBook.titre}
          onChange={handleChange}
        /><br />
        <input
          type="text"
          name="auteur"
          placeholder="Auteur"
          value={newBook.auteur}
          onChange={handleChange}
        /><br />
        <textarea
          name="description"
          placeholder="Description"
          value={newBook.description}
          onChange={handleChange}
        /><br />
        <input
          type="text"
          name="maisonEdition"
          placeholder="Maison d'édition"
          value={newBook.maisonEdition}
          onChange={handleChange}
        /><br />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newBook.stock}
          onChange={handleChange}
        /><br />
        <button onClick={handleSaveBook}>
          {editingBookId !== null ? 'Modifier le livre' : 'Ajouter un livre'}
        </button>
      </div>

      {}
      <h3>Liste de livres:</h3>
      {books.length === 0 ? (
        <p>Aucun livre disponible</p>
      ) : (
        books.map((book) => (
          <div key={book.id}>
            <h4>{book.titre}</h4>
            <p><strong>Auteur:</strong> {book.auteur}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Maison d'édition:</strong> {book.maisonEdition}</p>
            <p><strong>Stock:</strong> {book.stock}</p>
            <p><strong>Créé par:</strong> {book.creator}</p>
            <button onClick={() => handleEditBook(book)}>Modifier</button>
            <button onClick={() => handleDeleteBook(book.id)}>Supprimer</button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
