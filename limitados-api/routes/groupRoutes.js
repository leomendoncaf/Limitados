const express = require('express');
const router = express.Router();
const groupController = require('../controller/GroupController');
const authController = require('../controller/AuthController');

// Proteger todas as rotas abaixo com autenticação
router.use(authController.protect);

router
    .route('/')
    .get(groupController.getAllGroups)
    .post(groupController.createGroup);

router
    .route('/:id')
    .get(groupController.getGroup)
    .patch(groupController.updateGroup)
    .delete(groupController.deleteGroup);

module.exports = router;
