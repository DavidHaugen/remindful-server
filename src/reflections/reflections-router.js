const express = require ('express');
const jsonBodyParser = express.json()
const reflectionRouter = express.Router()
const { requireAuth } = require('../middleware/jwt-auth')
const reflectionService = require('./reflections-service')

reflectionRouter
  .route('/')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
      const { reflection, goalId } = req.body;
      if(!req.body['reflection'])
        return res.status(400)
        .json({
          error: 'Missing reflection in request body'
        })

        return reflectionService.insertReflection(req.app.get('db'), reflection, goalId)
          .then( reflection => {
            res.status(201)
            res.json(reflection)
          })
          .catch(next)
    })

reflectionRouter
  .route('/:goalId')
    .all(requireAuth)
    .get(jsonBodyParser, (req, res, next) => {
      console.log(req.params.goalId)        
        return reflectionService.getReflections(req.app.get('db'), Number(req.params.goalId))
          .then( reflections => {
            res.status(200)
            res.json(reflections)
          })
          .catch(next)
    });

module.exports = reflectionRouter