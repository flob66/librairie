const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let users = [{ username: 'admin', password: 'admin1' }];
let books = [];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const newBook = req.body;
  newBook.id = Date.now();
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  books = books.map((book) => (book.id === parseInt(id) ? { ...updatedBook, id: parseInt(id) } : book));
  res.json(updatedBook);
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter((book) => book.id !== parseInt(id));
  res.status(204).send();
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find((user) => user.username === username);
  
    if (existingUser) {
      return res.status(400).json({ message: 'Ce nom d\'utilisateur existe déjà' });
    }
  
    users.push({ username, password });
    res.status(200).json({ message: 'Utilisateur enregistré avec succès' });
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
  
    res.status(200).json({ message: 'Connexion réussie' });
  });

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
