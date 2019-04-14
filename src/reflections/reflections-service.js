'use strict';

const xss = require('xss');

const reflectionService = {
  insertReflection(db, reflection, goalId){
    return db
      .insert({goal_id: goalId, content: reflection})
      .into('remindful_reflections')
      .returning('*')
      .then(([reflection]) => reflection);
  },

  getReflections(db, goalId){
    return db 
      .from('remindful_reflections')
      .join('remindful_goals', 'remindful_goals.id', '=', 'remindful_reflections.goal_id')
      .select('remindful_reflections.content', 'remindful_reflections.date_created', 'remindful_reflections.id')
      .where('remindful_goals.id', '=', goalId);
  },

  deleteReflection(db, id){
    return db
      .from('remindful_reflections')
      .where('id', id)
      .del();
  },

  serializeReflectionsList(reflections) {
    return reflections.map((reflection) => this.serializeReflection(reflection));
  },

  serializeReflection(reflection){
    return {
      id: reflection.id,
      content: xss(reflection.content),
      date_created: reflection.date_created,
      date_modified: reflection.date_modified,
      goal_id: reflection.goal_id
    };
  }
};

module.exports = reflectionService;