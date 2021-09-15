const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const apiRoutes = require('./api.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.get('/dataa', (req, res) => {
  res.json({data: 'Hello...'})
})

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/', apiRoutes)

module.exports = router;
