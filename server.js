// 1. Import required modules
const express = require('express');
const app = express();
const path = require('path');

// 2. Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 3. Set view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 4. Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Cognifyz Form Validation',
    errors: null,
    formData: null 
  });
});

app.post('/submit', (req, res) => {
  const { name, email, password } = req.body;
  const errors = {};

  // Validation logic (same as your Task 2 code)
  if (!name || name.trim().length < 3) errors.name = 'Name must be at least 3 characters';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    errors.password = 'Password must contain 8+ chars with 1 letter and 1 number';
  }

  if (Object.keys(errors).length > 0) {
    return res.render('index', { 
      title: 'Fix Errors',
      errors,
      formData: req.body 
    });
  }

  res.render('success', { name, email });
});

// 5. Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});