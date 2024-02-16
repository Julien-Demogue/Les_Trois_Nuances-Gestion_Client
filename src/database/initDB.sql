CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  secondName TEXT NOT NULL,
  birthDate DATETIME NOT NULL,
  email TEXT,
  city TEXT,
  postalCode TEXT,
  job TEXT,
  registrationDate DATETIME NOT NULL,
);