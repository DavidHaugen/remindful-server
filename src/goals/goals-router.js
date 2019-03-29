const express = require ('express');
const GoalsService = require ('./goals-service')
const goalsRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')

const AuthService = require('../auth/auth-service')

goalsRouter
  .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
      return GoalsService.getAllGoals(req.app.get('db'), req.user.email_address)
      .then(goals => {
        res.status(200)
        res.json(GoalsService.serializeGoals(goals))
      })
      .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
      const { name } = req.body
    })
    .delete(jsonBodyParser, (req,res,next) => {
      return GoalsService.deleteGoal(req.app.get('db'), req.body.goalId)
        .then(() => {
          res.status(200)
          res.end()
        })
        .catch(next)
    })
    .patch(jsonBodyParser, (req, res, next) => {
      return GoalsService.updateGoal(req.app.get('db'), req.body)
        .then((goal) => {
          res.status(200)
          res.json(goal)
        })
        .catch(next)
    })

  module.exports = goalsRouter