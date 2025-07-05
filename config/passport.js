const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });

      if (!user) {
        return done(null, false, { message: 'Incorrect Username' });
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return done(null, false, { message: 'Incorrect Password' });
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
