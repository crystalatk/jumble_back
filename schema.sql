CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(20),
    password varchar (200),
    first_name varchar (100),
    last_name varchar (100),
    zip_code integer,
    phone_num text,
    picture text
);

CREATE TABLE favorites (
    id serial PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id integer REFERENCES users (id),
    job_id text
);

CREATE TABLE applied (
    id serial PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id integer REFERENCES users (id),
    job_id text
);