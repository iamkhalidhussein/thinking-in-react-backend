import express from 'express';
const router = express.Router();
import { getUserData } from '../controllers/user-controller';

router.get('/userdata', getUserData);

export default router;