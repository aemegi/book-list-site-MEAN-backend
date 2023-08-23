import express from 'express';
import cors from 'cors';
import BooksRoute from './api/BooksRoute.js';
import dotenv from 'dotenv';
import mongodb from 'mongodb';

class Index {
  static app = express();

  static router = express.Router();

  static main() {
    dotenv.config();
    Index.setUpServer();
    Index.setUpDatabase();
  }

  static setUpServer() {
    Index.app.use(cors());
    Index.app.use(express.json());
    Index.app.use('/api/v1/books-site', BooksRoute.configRoutes(Index.router));
    Index.app.use('*', (req, res) => {
      res.status(404).json({ error: 'not found' });
    });
  }

  static async setUpDatabase() {
    const client = new mongodb.MongoClient(process.env.BOOKREVIEWS_DB_URI);
    const port = process.env.PORT || 3000;
    try {
      await client.connect();
      Index.app.listen(port, () => {
        console.log('server is running on port: ${port}');
      });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}

Index.main();
