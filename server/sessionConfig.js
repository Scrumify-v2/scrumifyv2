///FILE IS USED FOR SESSION COOKIES

const sessionConfig = {
  name: scrumify - v2,
  secret: 'danger noodle', // move to process.env.SECRET at production
  cookie: {
    maxAge: 1000 * 60 * 24, //cookie expires after 24 hours
    secure: false, //set to 'true' at production
    httpOnly: true, //no access from Javascript
  },
  resave: false,
  saveUnititialized: true, //set to 'false' at production //user must agree to save cookies on computer
};
