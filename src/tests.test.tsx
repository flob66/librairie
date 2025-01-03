import request from 'supertest';
import app from '../server';

describe('Authentication API', () => {
  it('inscription', async () => {
    const newUser = { username: 'testuser', password: 'password123' };
    
    const response = await request(app)
      .post('/signup')
      .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Utilisateur enregistré avec succès');
  });

  it('inscription si un user exsite déjà', async () => {
    const existingUser = { username: 'admin', password: 'admin1' };

    const response = await request(app)
      .post('/signup')
      .send(existingUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Ce nom d\'utilisateur existe déjà');
  });

  it('login réussi', async () => {
    const validUser = { username: 'admin', password: 'admin1' };

    const response = await request(app)
      .post('/login')
      .send(validUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Connexion réussie');
  });

  it('login et le mdp ou le username est inccorect', async () => {
    const invalidUser = { username: 'admin', password: 'wrongpassword' };

    const response = await request(app)
      .post('/login')
      .send(invalidUser);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Identifiants invalides');
  });
});

describe('Books CRUD API', () => {
  let bookId: number;

  it('devrait créer un nouveau livre', async () => {
    const newBook = {
      titre: 'Le Petit Prince',
      auteur: 'Antoine de Saint-Exupéry',
      description: 'A charming tale about a young prince',
      maisonEdition: 'Gallimard',
      stock: 10,
      creator: 'admin',
    };

    const response = await request(app)
      .post('/books')
      .send(newBook);

    expect(response.status).toBe(201);
    expect(response.body.titre).toBe('Le Petit Prince');
    bookId = response.body.id;
  });

  it('devrait récupérer la liste des livres', async () => {
    const response = await request(app)
      .get('/books');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('devrait mettre à jour un livre existant', async () => {
    const updatedBook = {
      titre: 'Le Petit Prince - Revised',
      auteur: 'Antoine de Saint-Exupéry',
      description: 'A revised version of the charming tale',
      maisonEdition: 'Gallimard',
      stock: 15,
      creator: 'admin',
    };

    const response = await request(app)
      .put(`/books/${bookId}`)
      .send(updatedBook);

    expect(response.status).toBe(200);
    expect(response.body.titre).toBe('Le Petit Prince - Revised');
    expect(response.body.stock).toBe(15);
  });

  it('devrait supprimer un livre', async () => {
    const response = await request(app)
      .delete(`/books/${bookId}`);

    expect(response.status).toBe(204);
  });

  it('ne devrait pas trouver le livre supprimé', async () => {
    const response = await request(app)
      .get('/books');

    const deletedBook = response.body.find((book: any) => book.id === bookId);
    expect(deletedBook).toBeUndefined();
  });
});

