CREATE DATABASE XYGXLT;

\c XYGXLT;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE groups (
    name VARCHAR(50) PRIMARY KEY,
    points INTEGER DEFAULT 0
);

INSERT INTO groups (name, points) VALUES
    ('Obelisk Blue', 0),
    ('Ra Yellow', 0),
    ('Slifer Red', 0);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    group_name VARCHAR(50) NOT NULL,
    points INTEGER DEFAULT 0,
    tiebreaker FLOAT DEFAULT 0.0,
    CONSTRAINT valid_group CHECK (group_name IN ('Obelisk Blue', 'Ra Yellow', 'Slifer Red')),
    CONSTRAINT fk_group FOREIGN KEY (group_name) REFERENCES groups(name)
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    player1_id INTEGER NOT NULL,
    player2_id INTEGER NOT NULL,
    score1 INTEGER,
    score2 INTEGER,
    stage VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    match_date TIMESTAMP,
    CONSTRAINT fk_player1 FOREIGN KEY (player1_id) REFERENCES players(id),
    CONSTRAINT fk_player2 FOREIGN KEY (player2_id) REFERENCES players(id),
    CONSTRAINT valid_stage CHECK (stage IN ('stage1', 'playIn', 'challenge', 'playOff'))
);