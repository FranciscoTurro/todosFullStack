import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { apiRouter } from './routes/api/index';

const connectToDb = async () => {
  if (!process.env.MONGO_URL) console.log('Connection string missing');
  else await mongoose.connect(process.env.MONGO_URL);
};
mongoose.set('strictQuery', false);

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

connectToDb()
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
