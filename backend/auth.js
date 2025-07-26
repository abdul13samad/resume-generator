// auth.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const router = express.Router();
const usersPath = path.join('./backend/data/users.json');
const secret = process.env.JWT_SECRET || 'secret';

const loadUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const saveUsers = (users) => fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  if (users[email]) return res.status(400).json({ message: 'User exists' });
  users[email] = { password, plan: 'free' };
  saveUsers(users);
  const token = jwt.sign({ email }, secret);
  res.json({ token });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  if (!users[email] || users[email].password !== password)
    return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ email }, secret);
  res.json({ token });
});

router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });
  try {
    const decoded = jwt.verify(token, secret);
    res.json({ email: decoded.email });
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
});

export default router;