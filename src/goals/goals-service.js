const GoalsService = {
  getAllGoals(db, email) {
    return db
    .from('remindful_goals')
    .join('remindful_users', 'remindful_goals.user_id', '=', 'remindful_users.id')
    .select('remindful_goals.name')
    .where('remindful_users.email_address', '=', email)
  }
}

module.exports = GoalsService


// select
// remindful_goals.name,remindful_goals.id
// from
// remindful_goals
// JOIN
// remindful_users
// ON
// remindful_users.id = remindful_goals.user_id 
// where remindful_users.email_address = 'haugen.dj@gmail.com'