/* eslint-disable no-console */
const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'db.sqlite';

const db = new sqlite3.Database(DBSOURCE, (errConnect) => {
    if (errConnect) {
        // Cannot open database
        console.error(errConnect.message);
        throw errConnect;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(
            `CREATE TABLE 'genres' (
                'id' INTEGER PRIMARY KEY AUTOINCREMENT,
                'name' varchar(255) NOT NULL
              );`,
            (errQuery) => {
                if (errQuery) {
                // Table already created
                } else {
                // Table just created, creating some rows
                  const insert = 'INSERT INTO genres (name) VALUES (?)';
                  db.run(insert, ['Fantastique']);
                }
            },
        );
        db.run(
          `CREATE TABLE 'actors' (
              'id' INTEGER PRIMARY KEY AUTOINCREMENT,
              'first_name' varchar(255) NOT NULL,
              'last_name' varchar(255) NOT NULL,
              'date_of_birth' date NOT NULL,
              'date_of_death' date
            );
            `,
          (errQuery) => {
              if (errQuery) {
              // Table already created
              } else {
              // Table just created, creating some rows
                  const insert = 'INSERT INTO actors (first_name, last_name, date_of_birth, date_of_death) VALUES (?,?,?,?)';
                  db.run(insert, ['Jean', 'Dujardin', '19/06/1972']);
                  db.run(insert, ['Jean', 'Dujardin2', '19/06/1972']);
                  db.run(insert, ['Jean', 'Dujardin3', '19/06/1972']);
              }
          },
      );
      db.run(
        `CREATE TABLE 'films' (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'name' varchar(255) NOT NULL,
            'synopsis' text NOT NULL,
            'release_year' int,
            'genre_id' int NOT NULL
          );`,
        (errQuery) => {
            if (errQuery) {
            // Table already created
            } else {
            // Table just created, creating some rows
                const insert = 'INSERT INTO films (name, synopsis, release_year, genre_id) VALUES (?,?,?,?)';
                db.run(insert, ['Harry Potter', 'Tu es un sorcier Harry', '2001', 1]);
            }
        },
    );
    db.run(
      `CREATE TABLE 'films_actors' (
          'film_id' INTEGER,
          'actor_id' INTEGER,
          FOREIGN KEY (film_id) REFERENCES films(id),
          FOREIGN KEY (actor_id) REFERENCES actors(id),
          PRIMARY KEY ('film_id', 'actor_id')
        );`,
      (errQuery) => {
          if (errQuery) {
          // Table already created
          } else {
          // Table just created, creating some rows
              /*const insert = 'INSERT INTO actors (first_name, last_name, date_of_birth, date_of_death) VALUES (?,?,?,?)';
              db.run(insert, ['Jean', 'Dujardin', '19/06/1972']);*/
          }
      },
  );
    }
});

module.exports = db;
