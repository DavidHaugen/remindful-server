CREATE TABLE remindful_users (
  id SERIAL PRIMARY KEY,
  email_address TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT,
  password TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);

ALTER TABLE remindful_goals
  ADD COLUMN
    user_id INTEGER REFERENCES remindful_users(id) ON DELETE CASCADE;