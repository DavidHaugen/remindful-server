'use strict';

const AuthService = require('../auth/auth-service');
const xss = require('xss');

const addGoalService = {
  insertGoal(db, email, name){
    return AuthService.getUserWithEmail(db,email)
      .then(user => {
        return db
          .insert({user_id: user.id, name})
          .into('remindful_goals')
          .returning('*')
          .then(([goal]) => goal);
      });
  },

  serializeGoal(goal){
    return {
      id: goal.id,
      name: xss(goal.name),
      complete: goal.complete,
      date_created: goal.date_created,
      user_id: goal.user_id
    };
  }
};

module.exports = addGoalService;
// AuthService.getUserWithEmail(req.app.get('db'),req.user.email_address)
// .then(res => (res.first_name));