import express from 'express';
import { addWallet, getAllWallets } from '../../controllers/usersControllers';

const router = express.Router();

router.post('/add', addWallet);

router.get('/all', getAllWallets);

export default router;
