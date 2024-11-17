import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { Client, auth } from 'twitter-api-sdk';
import authRouter from './routes/auth';
import usersRouter from './routes/users';

const app = express();

dotenv.config();

app.use(
  cors({
    origin: 'https://b93b-94-254-130-39.ngrok-free.app',
    credentials: true,
  })
);

app.use(express.json()); // Parse JSON bodies

const frontendBuildPath = path.join(__dirname, '../../frontend/build');

// Serve React static files
app.use(express.static(frontendBuildPath));

export const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID as string,
  client_secret: process.env.CLIENT_SECRET as string,
  callback: 'https://b93b-94-254-130-39.ngrok-free.app/api/callback',
  scopes: ['tweet.read', 'users.read', 'offline.access'],
});

export const client = new Client(authClient);

export const STATE = 'my-state';

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
