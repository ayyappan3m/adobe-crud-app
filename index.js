const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Fake users DB
const users = [];
const items = [];

// Middleware: JWT authentication
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash });
  res.json({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
  const user = users.find(u => u.username === req.body.username);
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
  res.json({ token });
});

app.get('/items', authenticateToken, (req, res) => res.json(items));
app.post('/items', authenticateToken, (req, res) => {
  items.push(req.body);
  res.status(201).json({ message: 'Item created' });
});
app.put('/items/:id', authenticateToken, (req, res) => {
  items[req.params.id] = req.body;
  res.json({ message: 'Item updated' });
});
app.delete('/items/:id', authenticateToken, (req, res) => {
  items.splice(req.params.id, 1);
  res.json({ message: 'Item deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
