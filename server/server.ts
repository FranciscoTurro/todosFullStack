import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const connectToDb = async () => {
  if (!process.env.MONGO_URL) console.log('Connection string missing');
  else await mongoose.connect(process.env.MONGO_URL);
};

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
