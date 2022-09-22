const mongoose = require('mongoose');
require('dotenv').config();

const dbURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}`;
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', (e) => {
    console.log('DB connected');
})

mongoose.connection.on('error', (err) => {
    console.log('Error occurred!', err);
});

require('./dbSchema');