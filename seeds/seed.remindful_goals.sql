BEGIN;

TRUNCATE
  remindful_goals
  RESTART IDENTITY CASCADE;

INSERT INTO remindful_goals (name)
VALUES 
  ('Learn to play violin'),
  ('Write 30,000 words by June'),
  ('Take Odin to the dog park twice a week'),
  ('Finish my capstone');

COMMIT;