const express = require ('express');
const GoalsService = require ('./goals-service')
const goalsRouter = express.Router()
const jsonBodyParser = express.json();

goalsRouter
  .route('/')
    .get((req, res, next) => {
      GoalsService.getAllGoals(req.app.get('db'))
      .then(goals => {
        res.json((goals))
      })
      .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
      const { name } = req.body
    })

  module.exports = goalsRouter