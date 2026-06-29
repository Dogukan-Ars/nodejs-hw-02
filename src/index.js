import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  // Önce veritabanına bağlan
  await initMongoConnection();

  const app = setupServer();
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap().catch(console.error);
