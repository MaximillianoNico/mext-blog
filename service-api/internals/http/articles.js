const express = require('express');
const router = express.Router();

const controller = require('../controllers/articles');

router.post('/add', controller.add);
router.get('/all', controller.get);
// router.put('/updateArticle/:id', controller.sendNotificationByTopic);
// router.delete('/delete/:id', controller.sendNotificationByTopic);

module.exports = router;