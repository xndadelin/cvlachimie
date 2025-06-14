require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gradingRoutes = require('./controllers/gradingController');
const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

const corsOptions = {
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'username'],
    credentials: true
};

console.log(allowedOrigin, corsOptions);

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Grading System Backend Running');
        return;
    }
    next();
});

// Use grading routes
app.use('/api/grading', gradingRoutes);

mongoose.connect(process.env.mongoDB)
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.error("MongoDB connection failed:", error);
}); 

app.listen(process.env.PORT, () => {
    console.log('Server listening on port', process.env.PORT);
});