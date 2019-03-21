CREATE TABLE remindful_reflections (
  id SERIAL PRIMARY KEY,
  content TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP,
  goal_id INTEGER REFERENCES remindful_goals(id) ON DELETE CASCADE
);