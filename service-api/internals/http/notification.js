const express = require('express');
const router = express.Router();

const controller = require('../controllers/notification');

router.post('/add', controller.createOrUpdateTopic);
router.post('/push', controller.sendNotificationByTopic);

module.exports = router;