import express from 'express';

import checkNumber from './xlsx.route.js';
import profileRouter from './profiles.route.js';

const router = express.Router();

router.use('/router', checkNumber);
router.use('/profiles', profileRouter);

export default router;
