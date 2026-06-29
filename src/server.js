import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts.js';

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(pinoHttp());

  // Sadece GET /contacts rotası (basit hali)
  app.get('/contacts', async (req, res) => {
    try {
      console.log('🚀 /contacts rotası çağrıldı!');
      const contacts = await getAllContacts();

      console.log(`📊 Dönen contact sayısı: ${contacts.length}`);

      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error('❌ /contacts rotasında hata:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  });

  // Tek contact getirme
  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      console.error('❌ /contacts/:contactId rotasında hata:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // 404 handler
  app.use((req, res) => {
    console.log(`❌ Bulunamayan rota: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Not found' });
  });

  return app;
}
