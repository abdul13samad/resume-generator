// subscription.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const router = express.Router();
const usersPath = path.join('./backend/data/users.json');
const secret = process.env.JWT_SECRET || 'secret';

const loadUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const saveUsers = (users) => fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

router.post('/select', (req, res) => {
  const { plan } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });
  try {
    const { email } = jwt.verify(token, secret);
    const users = loadUsers();
    if (!users[email]) return res.status(404).json({ message: 'User not found' });
    users[email].plan = plan;
    saveUsers(users);
    res.json({ success: true });
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
});

router.get('/plan', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });
  try {
    const { email } = jwt.verify(token, secret);
    const users = loadUsers();
    const plan = users[email]?.plan || 'free';
    res.json({ plan });
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
});

export default router;