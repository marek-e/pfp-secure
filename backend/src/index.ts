import express from 'express';
import cors from 'cors';

import imageRoute from './Router/ImageRouter'

const app = express();
const port = 8000;


app.use(cors());

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use('/',imageRoute)