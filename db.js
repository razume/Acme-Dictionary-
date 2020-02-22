const pg = require("pg");
const uuid = require("uuid");
const { Client } = pg;

const client = new Client("postgres://localhost/dictionary_db");

client.connect();

const sync = async () => {
  const SQL = `
  DROP TABLE IF EXISTS nouns;
    CREATE TABLE nouns(
      id uuid PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
);
INSERT INTO nouns(id, name) VALUES("a863174e-57ed-4616-9d92-237b3ef7595a", "Table");

    `;
  const response = await client.query(SQL);
  return response;
};

sync();

module.exports = {
  sync
};
