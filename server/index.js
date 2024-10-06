import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import Connection from './database/db.js';
import Routes from './routes/Routes.js';

dotenv.config();
const app = express();

const PORT = 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// console.log(username , password)

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

// Use express's built-in body-parsing middleware
app.use(express.json());  // Replaces bodyParser.json()
app.use(express.urlencoded({ extended: true }));  // Replaces bodyParser.urlencoded()

app.use(cors());
app.use('/', Routes);
