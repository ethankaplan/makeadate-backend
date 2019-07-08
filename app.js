const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

require('./db/db')

const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');
const yelp = require('yelp-fusion')
const app = express();
const session =require("express-session")
headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
headers.append('Access-Control-Allow-Origin', 'https://secure-savannah-81040.herokuapp.com');
app.use(cors({
  origin: ['https://secure-savannah-81040.herokuapp.com', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: true,
  maxAge: 600,
  optionSuccessStatus:200
}));
//test
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({
//   resave:false,
//   secret:"shh",
//   saveUninitialized:false
// }))
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', apiRouter);
app.use('/users', usersRouter);

// app.listen(process.env.PORT, () => {
//   console.log(`listening on port ${process.env.PORT}`);
// })

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
