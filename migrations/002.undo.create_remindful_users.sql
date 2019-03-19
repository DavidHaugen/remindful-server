ALTER TABLE remindful_goals
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS remindful_users;
