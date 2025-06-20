INSERT INTO Users (username, email, password_hash, role) VALUES ('alice123', 'alice@example.com', 'hashed123', 'owner');
INSERT INTO Users (username, email, password_hash, role) VALUES ('bobwalker', 'bob@example.com', 'hashed456', 'walker');
INSERT INTO Users (username, email, password_hash, role) VALUES ('carol123', 'carol@example.com', 'hashed789', 'owner');
INSERT INTO Users (username, email, password_hash, role) VALUES ('JEFF', 'JEFF@jeffdabest.org', 'hashedforalltime', 'owner');
INSERT INTO Users (username, email, password_hash, role) VALUES ('johnwalker', 'whiskey@times.com', 'hashedandsalted', 'walker');

INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium');
INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small');
INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE username = 'JEFF'), 'mrBig', 'large');
INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Supermax', 'large');
INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE username = 'JEFF'), 'Godzilla', 'small');

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open');
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES ((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted');
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES ((SELECT dog_id FROM Dogs WHERE name = 'mrBig'), '2025-06-10 10:30:00', 60, 'The park', 'accepted');
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES ((SELECT dog_id FROM Dogs WHERE name = 'Supermax'), '2025-06-01 10:30:00', 60, 'Space', 'cancelled');
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES ((SELECT dog_id FROM Dogs WHERE name = 'Godzilla'), '2025-06-01 12:30:00', 180, 'The Beach', 'completed');