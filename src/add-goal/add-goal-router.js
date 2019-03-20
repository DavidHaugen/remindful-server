const express = require ('express');
const addGoalService = require ('./add-goal-service')
const addGoalRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')

const AuthService = require('../auth/auth-service')

addGoalRouter
  .route('/')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
      const { name } = req.body;
      const { email_address } = req.user
      if (!req.body['name'])
        return res.status(400).json({
          error: `Missing name in request body`
        });

      return addGoalService.insertGoal(req.app.get('db'), email_address, name)
      .then(goal => {
        res.status(201)
        res.json(goal)
      })
      .catch(next)
    })

  module.exports = addGoalRouter