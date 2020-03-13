require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const mainRoutes = require('./routes/main');

app.use('/admin', adminRoutes);
app.use('/', mainRoutes);

app.use((req, res) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).render('404', { pageTitle: 'Page Not Found' });
  // res.redirect('/');
});

app.listen(5000, () => console.log('🚀-lift off'));