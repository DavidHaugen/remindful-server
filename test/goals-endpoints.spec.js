/* eslint-disable no-undef */
'use strict';

const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Goals Endpoints', function() {
  let db;
  const {
    testGoals,
    testUsers,
  } = helpers.makeGoalsFixtures();

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

  describe('POST /api/add-goal', () => {
    context('When no bearer token present', () => {
      it('responds with 401 unauthorized', () => {
        return supertest(app)
            .post('/api/add-goal')
            .expect(401);
      })
    });
    context('When given invalid bearer token', () => {
      it('responds with 401 unauthorized', () => {
      return supertest(app)
      .post('/api/add-goal')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0], 'badToken'))
      .expect(401)
      })
    })
  })

    describe('GET /api/my-goals', () => {
      
      context('When no bearer token present', () => {
        it('responds with 401 unauthorized', () => {
          return supertest(app)
            .get('/api/my-goals')
            .expect(401);
        });
      });
      context('When given invalid bearer token', () => {
        it('responds with 401 unauthorized', () => {
        return supertest(app)
        .post('/api/my-goals')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0], 'badToken'))
        .expect(401)
        })
      })
      context('With correct bearer token and no goals present', () => {
        before('insert goals', () =>
          helpers.seedGoalsTables(
          db,
          testUsers
          )
        );
        it('responds with 200 and empty array', () => {
          return supertest(app)
          .get('/api/my-goals')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0], process.env.JWT_SECRET))
          .expect(200, [])
        })
      })
      context('With correct bearer token and goals present', () => {
        before('insert goals', () =>
          helpers.seedGoalsTables(
            db,
            testUsers,
            testGoals
            )
        );
        it('responds with 200 and an array of goals', () => {
          return supertest(app)
          .get('/api/my-goals')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0], process.env.JWT_SECRET))
          .expect(200, [{"id": 1, "name": "goal one", "complete": false}, {
            "name": 'goal two',
            "complete": false,
            "id": 2
          }])
        });
      })
    })
})