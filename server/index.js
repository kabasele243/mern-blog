import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config({ path: './config.env' });

import app from './app.js';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});