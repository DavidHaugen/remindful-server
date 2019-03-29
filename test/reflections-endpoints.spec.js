/* eslint-disable no-undef */
'use strict';

const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Reflections Endpoints', function() {
  let db;

  const {
    testGoals,
    testUsers,
    testReflections
  } = helpers.makeGoalsFixtures();

  function makeAuthHeader(user) {
    const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64');
    return `Bearer ${token}`;
  }

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST /api/reflections', () => {
    context('When no bearer token present', () => {
      it('responds with 401 unauthorized', () => {
        return supertest(app)
            .post('/api/reflections')
            .expect(401);
      })
    });
    context('When given invalid bearer token', () => {
      it('responds with 401 unauthorized', () => {
      return supertest(app)
      .post('/api/reflections')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0], 'badToken'))
      .expect(401)
      })
    })
    context('When given valid bearer token and there are reflections present', () => {
      before('insert goals', () =>
        helpers.seedReflectionsTables(
        db,
        testUsers,
        testGoals,
        testReflections
        )
      );
      it('responds with 200 and an array of correct reflections', () => {
        return supertest(app)
        .get('/api/reflections/1')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0], process.env.JWT_SECRET))
        .expect(200, [
          {
            "content": "reflection one",
            "date_created": "2019-03-29T02:06:39.246Z",
            "id": 1
          }
        ])
      })
    })
    context('When given valid bearer token and there are no reflections present', () => {
      before('insert goals', () =>
        helpers.seedReflectionsTables(
        db,
        testUsers,
        testGoals,
        )
      );
      it('responds with 200 and an empty array', () => {
        return supertest(app)
        .get('/api/reflections/1')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0], process.env.JWT_SECRET))
        .expect(200, [])
      })
    })
  })
})