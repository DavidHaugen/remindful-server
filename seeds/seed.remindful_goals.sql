BEGIN;

TRUNCATE
  remindful_goals
  RESTART IDENTITY CASCADE;

INSERT INTO remindful_goals (name, user_id)
VALUES 
  ('Learn to play violin', 1),
  ('Write 30,000 words by June', 1),
  ('Take Odin to the dog park twice a week', 1);

COMMIT;