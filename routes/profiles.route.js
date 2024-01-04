import express from 'express';
import { createProfile } from '../controllers/Profiles.controller.js';

const profileRouter = express.Router();

profileRouter.post('/createProfile', createProfile)

export default profileRouter;

