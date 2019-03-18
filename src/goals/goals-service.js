const GoalsService = {
  getAllGoals(db) {
    return db
    .from('remindful_goals')
    .select('*')
  }
}

module.exports = GoalsService