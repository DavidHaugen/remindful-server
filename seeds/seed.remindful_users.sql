BEGIN;

TRUNCATE
  remindful_users
  RESTART IDENTITY CASCADE;

INSERT INTO remindful_users (email_address, first_name, last_name, password)
VALUES 
  ('haugen.dj@gmail.com', 'David', 'Haugen', '$2a$12$aSBCWFZFS3R4LAeNPLMO8.qCzbfWhrOuHiz52GrlyWSTUWIU8k7RK');

COMMIT;