exports.get404 = (err, req, res, next) => {
  res.status(err.status || 500).render('404', { pageTitle: 'Page Not Found' });
}