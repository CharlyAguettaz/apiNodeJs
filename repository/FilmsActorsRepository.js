/* eslint-disable no-console */
/* eslint-disable func-names */
class FilmsActorsRepository {
    constructor(database) {
        this.database = database;
    }

    list() {
        return new Promise((resolve, reject) => {
            this.database.all('SELECT * FROM filmsActors', [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(
                        rows.map((row) => row),
                    );
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            this.database.get('SELECT * FROM filmsActors WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(
                        row,
                    );
                }
            });
        });
    }

    create(data) {
        return new Promise((resolve, reject) => {
            this.database.run(
                'INSERT INTO films_actors (film_id, actor_id) VALUES (?, ?)',
                [data.name],
                function (err) {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                },
            );
        });
    }

    update(id, data) {
        return new Promise((resolve, reject) => {
            this.database.run(
                `UPDATE films_actors
                 SET film_id = ?,
                 actor_id = ?,
                 WHERE id = ?`,
                [data.name, id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.database.run(
                `DELETE FROM films_actors
                 WHERE id = ?`,
                [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(true);
                    }
                },
            );
        });
    }

    // eslint-disable-next-line class-methods-use-this
    /*decorator(FilmsActors) {
        return {
            ...FilmsActors,
            done: FilmsActors.done === 1,
        };
    }*/
}

module.exports = FilmsActorsRepository;
