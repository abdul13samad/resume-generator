import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  const { cardNumber, expiry, cvv } = req.body;
  if (!cardNumber || !expiry || !cvv) return res.status(400).json({ success: false });
  res.json({ success: true });
});

export default router;