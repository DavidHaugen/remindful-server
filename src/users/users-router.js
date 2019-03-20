'use strict';

const express = require('express');
const path = require('path');
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const UsersService = require('./users-service');

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password, email_address, first_name, last_name } = req.body;

    for( const field of ['first_name', 'last_name', 'email_address', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });
    const passwordError = UsersService.validatePassword(password);
    if (passwordError)
      return res.status(400).json({ error: passwordError });

    UsersService.hasUserWithEmail(
      req.app.get('db'),
      email_address
    )
      .then(hasUserWithEmail => {
        if (hasUserWithEmail)
          return res.status(400).json({ error: 'Email address already taken' });
        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              first_name,
              last_name,
              email_address,
              password: hashedPassword,
              date_created: 'now()'
            };

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              });
          });
      })
      .catch(next);
  });

module.exports = usersRouter;