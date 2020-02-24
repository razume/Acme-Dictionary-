const pg = require('pg');
const { Client } = pg;

const client = new Client('postgres://localhost/dictionary_db');

client.connect();

const sync = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS nouns;
  DROP TABLE IF EXISTS verbs;
  DROP TABLE IF EXISTS adjectives;
  CREATE TABLE nouns
  (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL UNIQUE,
    CHECK (char_length(name) > 0)
  );
  CREATE TABLE verbs
  (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL UNIQUE,
    CHECK (char_length(name) > 0)
  );
  CREATE TABLE adjectives
  (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL UNIQUE,
    CHECK (char_length(name) > 0)
  );

  INSERT INTO nouns (name) VALUES ('table');
  INSERT INTO verbs (name) VALUES ('run');
  INSERT INTO adjectives (name) VALUES ('fast');


  `;
  await client.query(SQL);
};

const readNouns = async () => {
  const SQL = 'SELECT * FROM nouns';
  const response = await client.query(SQL);
  return response.rows;
};

const createNoun = async noun => {
  const SQL = 'INSERT INTO nouns (name) VALUES ($1) returning *';
  const response = await client.query(SQL, [noun]);
  return response.rows[0];
};

const readVerbs = async () => {
  const SQL = 'SELECT * FROM verbs';
  const response = await client.query(SQL);
  return response.rows;
};

const createVerb = async noun => {
  const SQL = 'INSERT INTO verbs (name) VALUES ($1) returning *';
  const response = await client.query(SQL, [noun]);
  return response.rows[0];
};

const readAdjectives = async () => {
  const SQL = 'SELECT * FROM adjectives';
  const response = await client.query(SQL);
  return response.rows;
};

const createAdjective = async noun => {
  const SQL = 'INSERT INTO adjectives (name) VALUES ($1) returning *';
  const response = await client.query(SQL, [noun]);
  return response.rows[0];
};

const deleteNoun = async id => {
  const SQL = 'DELETE FROM nouns WHERE id = $1';
  await client.query(SQL, [id]);
};

const deleteVerb = async id => {
  const SQL = 'DELETE FROM verbs WHERE id = $1';
  await client.query(SQL, [id]);
};

const deleteAdjective = async id => {
  const SQL = 'DELETE FROM adjectives WHERE id = $1';
  await client.query(SQL, [id]);
};

sync();

module.exports = {
  sync,
  readNouns,
  createNoun,
  readVerbs,
  createVerb,
  readAdjectives,
  createAdjective,
  deleteNoun,
  deleteVerb,
  deleteAdjective
};
