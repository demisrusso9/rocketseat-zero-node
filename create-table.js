import { client } from './db.js'

const remove = 'DROP TABLE IF EXISTS videos'

const query = `
  CREATE TABLE videos (
    ID          TEXT PRIMARY KEY,
    title       TEXT,
    description TEXT,
    duration    INTEGER
  );
`;

client.query(remove, (err, res) => {
  console.log('Table Deleted');
});

client.query(query, (err, res) => {
  console.log('Table Created');
});