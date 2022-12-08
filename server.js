const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes 
app.use(require('./routes'));

//mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nosql-social-backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//enable mongo
mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`Listen on ${PORT}`);
});