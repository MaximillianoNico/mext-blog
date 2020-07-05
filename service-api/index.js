const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

//  modules
const Notification = require('./internals/http/notification');
const Articles = require('./internals/http/articles');

const app = express();

const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URL || 'mongodb://localhost:27017/mext', {useNewUrlParser: true, useUnifiedTopology: true});


app.use('/article', Articles);
app.use('/notification', Notification);

let port = 3010;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
