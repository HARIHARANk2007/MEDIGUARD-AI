const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Import models
const User = require('./models/User');
const Message = require('./models/Message');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Initialize Express app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Session configuration
app.use(session({
  secret: 'your-secret-key', // Change this to a secure secret in production
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/chatapp'
  })
}));

// Middleware to check authentication
function requireAuth(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Routes

// Root route - redirect to login or users based on session
app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/users');
  } else {
    res.redirect('/login');
  }
});

// Signup page
app.get('/signup', (req, res) => {
  // Get list of available avatars
  const avatarsDir = path.join(__dirname, 'public', 'avatars');
  const avatars = fs.readdirSync(avatarsDir).filter(file => file.endsWith('.png') || file.endsWith('.jpg'));
  res.render('signup', { avatars, error: null });
});

// Handle signup
app.post('/signup', async (req, res) => {
  const { username, email, password, avatar } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, avatar });
    await user.save();
    req.session.userId = user._id;
    await User.findByIdAndUpdate(user._id, { isOnline: true });
    res.redirect('/users');
  } catch (err) {
    let error = 'An error occurred during signup';
    if (err.code === 11000) {
      error = 'Username or email already exists';
    }
    const avatarsDir = path.join(__dirname, 'public', 'avatars');
    const avatars = fs.readdirSync(avatarsDir).filter(file => file.endsWith('.png') || file.endsWith('.jpg'));
    res.render('signup', { avatars, error });
  }
});

// Login page
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id;
      await User.findByIdAndUpdate(user._id, { isOnline: true });
      res.redirect('/users');
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (err) {
    res.render('login', { error: 'An error occurred during login' });
  }
});

// Logout
app.get('/logout', requireAuth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.session.userId, { isOnline: false });
    req.session.destroy();
    res.redirect('/login');
  } catch (err) {
    res.redirect('/users');
  }
});

// Online users list
app.get('/users', requireAuth, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.session.userId }, isOnline: true });
    res.render('index', { users });
  } catch (err) {
    res.render('index', { users: [], error: 'Failed to load users' });
  }
});

// Chat page with a specific user
app.get('/chat/:userId', requireAuth, async (req, res) => {
  try {
    const otherUser = await User.findById(req.params.userId);
    if (!otherUser) {
      return res.redirect('/users');
    }
    const messages = await Message.find({
      $or: [
        { from: req.session.userId, to: req.params.userId },
        { from: req.params.userId, to: req.session.userId }
      ]
    }).sort({ timestamp: 1 }).populate('from').populate('to');
    res.render('chat', { otherUser, messages });
  } catch (err) {
    res.redirect('/users');
  }
});

// Send message
app.post('/chat/:userId', requireAuth, async (req, res) => {
  const { message } = req.body;
  try {
    const newMessage = new Message({
      from: req.session.userId,
      to: req.params.userId,
      content: message
    });
    await newMessage.save();
    res.redirect(`/chat/${req.params.userId}`);
  } catch (err) {
    res.redirect(`/chat/${req.params.userId}`);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});