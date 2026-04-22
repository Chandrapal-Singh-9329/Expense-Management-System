import express from 'express';
import transactionController from '../controllers/transactionCtrl.js';

const router = express.Router();
router.post('/get-transaction', transactionController.getTransaction);

router.post('/add-transaction', transactionController.addTransaction);

export default router; 