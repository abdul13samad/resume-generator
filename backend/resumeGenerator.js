// resumeGenerator.js
import express from 'express';
import OpenAI from 'openai';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'; // ✅ IMPORTANT: Load .env
dotenv.config();             // ✅ Make sure this is included

const router = express.Router();
const secret = process.env.JWT_SECRET || 'secret';

// ✅ Ensure correct path resolution
const usersPath = path.resolve('backend/data/users.json');
const loadUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

// ✅ OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Heuristic to check simplicity
const isSimple = (answers) => answers.join(' ').length < 500;

router.post('/', async (req, res) => {
  const { answers } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const { email } = jwt.verify(token, secret);
    const users = loadUsers();
    const plan = users[email]?.plan || 'free';

    const model = plan === 'free' || isSimple(answers) ? 'gpt-4o-mini' : 'gpt-4o';

    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content:
            'You are a professional resume builder AI. Use the given user answers to generate a clean, well-formatted resume.',
        },
        {
          role: 'user',
          content: `Here are my answers:\n${answers.join('\n')}\nBuild my resume.`,
        },
      ],
    });

    res.json({ resume: response.choices[0].message.content });
  } catch (error) {
    console.error('Resume generation failed:', error); // ✅ Helpful for debugging
    res.status(500).json({ message: 'Error generating resume' });
  }
});

export default router;
