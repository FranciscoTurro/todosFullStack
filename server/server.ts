import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { apiRouter } from './routes/api/index';

mongoose.set('strictQuery', false);
dotenv.config();

const connectToDb = async () => {
  if (!process.env.MONGO_URL) console.log('Connection string missing');
  else await mongoose.connect(process.env.MONGO_URL);
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

connectToDb()
  .then(() => {
    console.log('Connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
