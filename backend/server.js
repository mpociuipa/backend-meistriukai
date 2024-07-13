const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5555

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/service', require('./routes/serviceRoutes'))
app.use('/api/repairman', require('./routes/repairmanRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on port ${port}`))