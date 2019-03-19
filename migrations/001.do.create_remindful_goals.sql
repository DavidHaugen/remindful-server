CREATE TABLE remindful_goals (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  complete BOOLEAN DEFAULT FALSE,
  reflections TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);