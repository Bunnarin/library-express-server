const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const PORT = 3000;
const key = "secret";
// middleware
app.set('views', path.join(__dirname, 'views')); // Specify the views directory
app.set('view engine', 'ejs'); // Example using EJS
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: key,
  resave: true,
  saveUninitialized: false,
  store: new session.MemoryStore(),
  cookie: {
      secure: false, //set to true if use https
      httpOnly: true,
      sameSite: 'strict'
  }
}));
// mounting routers
const userRouter = require('./routes/userRouter.js');
const bookRouter = require('./routes/bookRouter.js');
app.use('/user', userRouter);
app.use('/book', bookRouter);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});


