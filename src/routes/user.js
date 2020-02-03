import { Router } from 'express';

const router = Router();

router.get('/activity', (req, res) => {
  res.render('user-dash', { transNav: false, path: "/user" });
});

router.get('/*', (req, res) => {
  res.redirect('/account/activity');
});

export default router;