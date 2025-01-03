import supertest from 'supertest';
import app from '../backend/server1';

const request = supertest(app);

describe('Opérations CRUD Frontend', () => {
  let bookId: number;

  it('devrait créer un nouveau livre', async () => {
    const bookData = {
      titre: 'Le Petit Prince',
      auteur: 'Antoine de Saint-Exupéry',
      description: 'Un conte charmant sur un jeune prince.',
      maisonEdition: 'Gallimard',
      stock: 10,
      creator: 'admin',
    };

    const response = await request
      .post('/books')
      .send(bookData)
      .expect(201);
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.titre).toBe(bookData.titre);
    expect(response.body.auteur).toBe(bookData.auteur);

    bookId = response.body.id;
  });

  it('devrait mettre à jour un livre existant', async () => {
    const updatedBookData = {
      titre: 'Le Petit Prince - Révisé',
      auteur: 'Antoine de Saint-Exupéry',
      description: 'Une version révisée du conte charmant.',
      maisonEdition: 'Gallimard',
      stock: 15,
      creator: 'admin',
    };

    const response = await request
      .put(`/books/${bookId}`)
      .send(updatedBookData)
      .expect(200);
    
    expect(response.body.titre).toBe(updatedBookData.titre);
    expect(response.body.auteur).toBe(updatedBookData.auteur);
  });

  it('devrait supprimer un livre', async () => {
    const response = await request
      .delete(`/books/${bookId}`)
      .expect(204);
    
    const getResponse = await request.get('/books').expect(200);
    const deletedBook = getResponse.body.find((book: { id: number }) => book.id === bookId);
    expect(deletedBook).toBeUndefined();
  });
});
