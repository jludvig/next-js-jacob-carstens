DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS user_favourite_job;

CREATE TABLE user (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  salt TEXT NOT NULL
);

CREATE TABLE user_favourite_job (
  user_id INTEGER NOT NULL,
  job_id  user_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id)
);