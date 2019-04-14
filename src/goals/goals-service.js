'use strict';

const xss = require('xss');

const GoalsService = {
  getAllGoals(db, email) {
    return db
      .from('remindful_goals')
      .join('remindful_users', 'remindful_goals.user_id', '=', 'remindful_users.id')
      .select('remindful_goals.name','remindful_goals.complete', 'remindful_goals.id')
      .where('remindful_users.email_address', '=', email);
  },

  deleteGoal(db, id){
    return db
      .from('remindful_goals')
      .where('id', id)
      .del();
  },
  
  updateGoal(db, goal) {
    return db
      .from('remindful_goals')
      .where({id: goal.id})
      .update({
        complete: goal.complete
      })
      .returning('*');
  },
  
  serializeGoals(goals) {
    return goals.map((goal) => this.serializeGoal(goal));
  },

  serializeGoal(goal) {
    return {
      id: goal.id,
      name: xss(goal.name),
      complete: goal.complete,
      date_created: goal.date_created,
      user_id: goal.user_id
    };
  }
};

module.exports = GoalsService;