const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController');
const authMiddleware = require('../middlewares/auth');

router.post('/users', UserController.store);
router.post('/users/authenticate', UserController.authenticate);

router.use(authMiddleware);

router.get('/user/:id', UserController.show);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);

module.exports = router;
