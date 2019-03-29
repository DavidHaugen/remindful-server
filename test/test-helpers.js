const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      email_address: 'testone@gmail.com',
      first_name: 'test',
      last_name: 'one',
      password: 'password',
    },
    {
      id: 2,
      email_address: 'testtwo@gmail.com',
      first_name: 'test',
      last_name: 'two',
      password: 'password',
    },
    {
      id: 3,
      email_address: 'testthree@gmail.com',
      first_name: 'test',
      last_name: 'three',
      password: 'password',
    }
  ]
}

function makeGoalsArray(users) {
  return [
    {
      name: 'goal one',
      complete: false,
      user_id: users[0].id
    },
    {
      name: 'goal two',
      complete: false,
      user_id: users[0].id
    },
    {
      name: 'goal three',
      complete: false,
      user_id: users[2].id
    }
  ]
}

function makeReflectionsArray() {
  return [
    {
      content: 'reflection one',
      goal_id: 1,
      date_created: "2019-03-29T02:06:39.246Z"
    }
  ];
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.email_address,
    algorithm: 'HS256',
  })
    return `Bearer ${token}`
  }

function makeExpectedGoal(users, goal) {
  const user = users
    .find(user => user.id === goal.user_id)

  return {
    id: goal.id,
    name: goal.name,
    complete: goal.complete,
    // date_created: goal.date_created,
    user_id: goal.user_id,

    user: {
      id: user.id,
      email_address: user.email_address,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      // date_created: user.date_created
    },
  }
}

function makeGoalsFixtures() {
  const testUsers = makeUsersArray()
  const testGoals = makeGoalsArray(testUsers)
  const testReflections = makeReflectionsArray()
  return { testUsers, testGoals, testReflections }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      remindful_goals,
      remindful_users,
      remindful_reflections
      RESTART IDENTITY CASCADE`
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db
    .into('remindful_users')
    .insert(preppedUsers)
}

function seedGoalsTables(db, users, goals=[]) {
  return seedUsers(db, users)
    .then(() =>
      db
        .into('remindful_goals')
        .insert(goals)
    )
    .then(() =>{}
    )
}

function seedReflectionsTables(db, users, goals, reflections=[]) {
  return seedGoalsTables(db, users, goals)
    .then(() =>
      db
        .into('remindful_reflections')
        .insert(reflections)
    )
    .then(() =>{}
    )
}


module.exports = {
  makeUsersArray,
  makeGoalsArray,
  makeExpectedGoal,

  makeGoalsFixtures,
  cleanTables,
  seedGoalsTables,
  makeAuthHeader,
  seedUsers,
  seedReflectionsTables
}
