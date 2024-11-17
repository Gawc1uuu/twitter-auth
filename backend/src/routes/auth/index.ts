import express from 'express';
import {
  callbackTwitterAuth,
  login,
  revoke,
} from '../../controllers/authControllers';

const router = express.Router();

router.get('/callback', callbackTwitterAuth);

router.get('/login', login);

router.get('/revoke', revoke);

export default router;
