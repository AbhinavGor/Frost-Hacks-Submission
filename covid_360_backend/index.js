require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

//router import
const userRouter = require('./routes/userRouter');
const aptRouter = require('./routes/appointmentRouter');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	resave: true,
	cookie: { maxAge: 60000 }
}));

console.log(process.env.SESSION_SECRET);

app.use('/user', userRouter);
app.use('/apt', aptRouter);

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(() => {
	console.log("MongoDB Connected!");
}).catch((e) => console.log("Could no connect to MongoDB", e));
app.listen(PORT, () => {
	console.log(`Server up on port ${PORT}`);
});

