'use strict';

const express = require('express');

const authRouter = express.Router();
const jsonBodyParser = express.json();
const AuthService = require('./auth-service');

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { email_address, password } = req.body;
    const loginUser = { email_address, password };
  
    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });    
    AuthService.getUserWithEmail(
      req.app.get('db'),
      loginUser.email_address
    )
      .then(dbUser => {
        if (!dbUser)
          return res.status(400).json({
            error: 'Incorrect email address or password',
          });
      
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            if (!compareMatch)
              return res.status(400).json({
                error: 'Incorrect email address or password',
              });

            const sub = dbUser.email_address;
            const payload = { user_id: dbUser.id };
            res.send({
              authToken: AuthService.createJwt(sub, payload),
            });          
          });
      })
      .catch(next);
  });

  

module.exports = authRouter;