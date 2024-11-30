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

interface AdminPageProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  currentUser: string;
}

const AdminPage: React.FC<AdminPageProps> = ({ currentUser }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    titre: '',
    auteur: '',
    description: '',
    maisonEdition: '',
    stock: 0,
    creator: currentUser,
  });
  const [editingBookId, setEditingBookId] = useState<number | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des livres :', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSaveBook = () => {
    if (editingBookId !== null) {
      axios.put(`http://localhost:5000/books/${editingBookId}`, { ...newBook, id: editingBookId })
        .then(() => {
          setEditingBookId(null);
          fetchBooks();
        })
        .catch((error) => console.error('Erreur lors de la mise à jour du livre :', error));
    } else {
      axios.post('http://localhost:5000/books', { ...newBook, id: Date.now() })
        .then(() => fetchBooks())
        .catch((error) => console.error('Erreur lors de l\'ajout du livre :', error));
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

  const fetchBooks = () => {
    axios.get('http://localhost:5000/books')
      .then((response) => setBooks(response.data));
  };

  const handleDeleteBook = (id: number) => {
    axios.delete(`http://localhost:5000/books/${id}`)
      .then(() => fetchBooks())
      .catch((error) => console.error('Erreur lors de la suppression du livre :', error));
  };

  const handleEditBook = (book: Book) => {
    setNewBook(book);
    setEditingBookId(book.id);
  };

  return (
    <div>
      <h1>Panneau d'administration</h1>
      <h2>Gérer les livres</h2>

      <div>
        <input type="text" name="titre" placeholder="Titre" value={newBook.titre} onChange={handleChange} /><br />
        <input type="text" name="auteur" placeholder="Auteur" value={newBook.auteur} onChange={handleChange} /><br />
        <textarea name="description" placeholder="Description" value={newBook.description} onChange={handleChange} /><br />
        <input type="text" name="maisonEdition" placeholder="Maison d'édition" value={newBook.maisonEdition} onChange={handleChange} /><br />
        <input type="number" name="stock" placeholder="Stock" value={newBook.stock} onChange={handleChange} /><br />
        <button onClick={handleSaveBook}>{editingBookId !== null ? 'Mettre à jour le livre' : 'Ajouter le livre'}</button>
      </div>

      <h3>Liste des livres :</h3>
      {books.map((book) => (
        <div key={book.id}>
          <h4>{book.titre}</h4>
          <p><strong>Auteur :</strong> {book.auteur}</p>
          <p><strong>Description :</strong> {book.description}</p>
          <p><strong>Maison d'édition :</strong> {book.maisonEdition}</p>
          <p><strong>Stock :</strong> {book.stock}</p>
          <p><strong>Créé par :</strong> {book.creator}</p>
          <button onClick={() => handleEditBook(book)}>Modifier</button>
          <button onClick={() => handleDeleteBook(book.id)}>Supprimer</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
