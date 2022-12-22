DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id INT PRIMARY_KEY, 
	username TEXT NOT NULL,
	email TEXT NOT NULL,
	group_id INT,
	created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
	updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);


DROP TABLE IF EXISTS groups;
CREATE TABLE groups (
	id INT PRIMARY_KEY, 
	groupname TEXT NOT NULL,
	created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
	updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);