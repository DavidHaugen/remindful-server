'use strict';

require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.TZ = 'UTC';


global.expect = expect;
global.supertest = supertest;