import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './services/db.config.js';
import router from './routes/index.js';

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});