const express = require('express');
const path = require('node:path');
const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma');
const passport = require('./config/passport');
const errorMiddleware = require('./middleware/errorHandler');
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const fileRouter = require('./routes/fileRouter');
const folderRouter = require('./routes/folderRouter');
const methodOverride = require('./middleware/methodOverride');
const flash = require('connect-flash');
const authContext = require('./middleware/authContext');
require('dotenv').config();

const app = express();

const assetsPath = path.join(__dirname, 'public');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use(flash());

app.use(
  session({
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.session());

app.use(authContext);

// Method override middleware
app.use(methodOverride);

app.use(indexRouter);
app.use(authRouter);
app.use(folderRouter);
app.use(fileRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
