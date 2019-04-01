'use strict';

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL || 'postgresql://remindful@localhost/remindful',
  JWT_SECRET: process.env.JWT_SECRET || 'get-reminded'
};

// DATABASE_URL=postgres://jujgwemhaakbrj:1c5f773ab89d7f5c435889700cec5c657b568f37a2d17c866105edd0afff6331@ec2-184-73-153-64.compute-1.amazonaws.com:5432/d3aegv0kco4sgr
