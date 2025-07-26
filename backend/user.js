// user.js
import fs from 'fs';
import path from 'path';

const usersPath = path.join('./backend/data/users.json');

export const loadUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
export const saveUsers = (users) => fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));