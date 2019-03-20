const GoalsService = {
  getAllGoals(db, email) {
    return db
    .from('remindful_goals')
    .join('remindful_users', 'remindful_goals.user_id', '=', 'remindful_users.id')
    .select('remindful_goals.name','remindful_goals.reflections','remindful_goals.complete', 'remindful_goals.id')
    .where('remindful_users.email_address', '=', email)
  }
}

module.exports = GoalsService